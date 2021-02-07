<template>
  <div class="d-flex align-items-center justify-content-center mt-5 font">
    <input @keypress.enter="createComment" class="form-control input" type="text" v-model="content" placeholder="댓글을 작성해주세요.">
    <button @click="createComment" class="btn btn-primary ml-3">댓글등록</button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CommentForm',
  data: function () {
    return {
      content: '',
    }
  },
  methods: {
    createComment: function () {
        // 임의의 사용자 이름 설정
        const username = "abc"
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const comment = {
            content: this.content,
            user: username,
            created_at: now
        }
        this.$emit('createComment', comment)
        this.content = ''
    }
  }
}
</script>

<style scoped>

</style>