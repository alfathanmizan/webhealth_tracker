<template>
  <div class="posts">
    <h1>Add Site</h1>
      <div class="form">
        <div>
          <input type="url" name="url" placeholder="e.g. https://www.google.com" v-model="url">
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Add</button>
        </div>
        <div>
          <a href="#" @click="$router.go(-1)" class="">Back</a>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'addpost',
  data () {
    return {
      url: ''
    }
  },
  methods: {
    async addPost () {
      var str = this.url
      var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'
      var url = new RegExp(urlRegex, 'i')
      if (str.length < 2083 && url.test(str)) {
        await PostsService.addPost({
          url: this.url
        })
        this.$swal(
          'Success!',
          `Your site has been added!`,
          'success'
        )
        this.$router.push({ name: 'Posts' })
      } else {
        this.$swal(
          'Error!',
          `Invalid URL or LINK`,
          'error'
        )
      }
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

