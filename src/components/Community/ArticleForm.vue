<template>
  <div class="d-flex align-items-center justify-content-center mt-5 font">
    <input @keypress.enter="createArticle" class="form-control input" type="text" v-model="content" placeholder="글을 작성해주세요.">
    <button @click="createArticle" class="btn btn-primary ml-3">글 등록</button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ArticleForm',
  data: function () {
    return {
      content: '',
    }
  },
  methods: {
    createArticle: function () {
        // 임의의 사용자 이름 설정
        const username = "abc"
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const article = {
            content: this.content,
            user: username,
            created_at: now
        }
        this.$emit('createArticle', article)
    }
  }
}
</script>

<style scoped>

</style>