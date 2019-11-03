<template>
  <div class="posts">
    <h1>Edit Post</h1>
      <div class="form">
        <div>
          <input type="url" name="url" placeholder="URL" v-model="url">
        </div>
        <div>
          <button class="app_post_btn" @click="updatePost">Update</button>
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
  name: 'editpost',
  data () {
    return {
      url: '',
      res_time: '',
      status: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.url = response.data.url
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        url: this.url
      })
      this.$swal(
        'Great!',
        `Your post has been updated!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
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
a {
  color: #4d7ef7;
  text-decoration: none;
}
</style>

