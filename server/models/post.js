var mongoose  = require('mongoose')
    Schema    = mongoose.Schema

var PostSchema = new Schema({
  url       : String,
  res_time  : String,
  status    : String
})

var Post = mongoose.model('Post', PostSchema)

module.exports = Post