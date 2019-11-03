const express 	= require('express')
	bodyParser 	= require('body-parser')
	cors 		= require('cors')
	morgan 		= require('morgan')
	mongodb 	= require('./mongooseModule')
	request 	= require('request')
	moment 		= require('moment')
	app 		= express()

var Post = require("../models/post")

mongodb.connect()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  Post.find({}, 'url res_time status', (error, posts) => {
	  if (error) console.error(error)
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
	var url 		= req.body.url
		res_time 	= req.body.res_time
		status 		= req.body.status
		insert 		= new Post({
			url: url,
			res_time: res_time,
			status: status,
		})

	insert.save((error) => {
		if (error) console.error(error)
		res.send({
			success: true
		})
	})
})

app.put('/posts/:id', (req, res) => {
	Post.findById(req.params.id, 'url res_time status', (error, post) => {
	  if (error) console.error(error)
	  post.url 			= req.body.url
	  post.res_time 	= ''
	  post.status 		= '0'
	  post.save((error) => {
			if (error) console.error(error)
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	Post.findById(req.params.id, 'url res_time status', (error, post) => {
	  if (error) console.error(error)
	  res.send(post)
	})
})

var minutes 	= 5
	interval 	= minutes * 60 * 1000

setInterval(() => {

	Post.find({}, (err, urls) => {
		if(err) console.error(err)
		urls.forEach((data) => {
		
			var opt = {url : data.url, time : true, timeout : 5000}
			request.get(opt, async (err, response) => {
				try {
					var responseTime = await response.elapsedTime

					console.log('Response status 200 :', data.url, 'in', responseTime, 'ms');

					Post.findById(data._id, 'url res_time status', (error, post) => {
						if (error) console.error(error)
						var status = responseTime <= 800 ? 1 : 0
						post.url 			= data.url
						post.res_time 		= responseTime
						post.status 		= status
						post.save((error) => { if (error) console.error(error) })
					})
				}
				catch(e) {
					console.log('Response timeout :', data.url);

					var responseTime = 5000
					Post.findById(data._id, 'url res_time status', (error, post) => {
						if (error) console.error(error)
						var status = responseTime <= 800 ? 1 : 0
						post.url 			= data.url
						post.res_time 		= responseTime
						post.status 		= status
						post.save((error) => { if (error) console.error(error) })
					})
				}
			})
		})
	})
}, interval)

app.listen(process.env.PORT || 8081)