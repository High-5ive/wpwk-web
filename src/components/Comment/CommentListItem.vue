<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <p>{{ comment.user }} ( {{ comment.created_at }} )</p>
      <p>{{ comment.content }}</p>
    </div>
    <div>
      <v-icon @click="deleteComment" color="error">
          mdi-delete-forever
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentListItem',
  props: {
    comment: Object
  },
  methods: {
    deleteComment: function () {
      this.$emit('deleteComment', this.comment)
    }
  }
}
</script>

<style scoped>
.commentjumbo {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>