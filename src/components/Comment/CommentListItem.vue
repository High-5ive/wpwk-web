<template>
   <div class="comment-item">
      <!-- 작성자, 생성일 등 맨 위 -->
      <div class="top-wrapper">
         <span class="nickname nf">{{ comment.user }}</span>
         <span class="created nf">{{ comment.created_at }}</span>
      </div>

      <!-- 댓글 내용 -->
      <p class="content nf">{{ comment.content }}</p>

      <!-- 삭제버튼이 들어감. fixed로 우측 고정 -->
      <div class="btn-wrapper" @click="deleteComment">
         <v-icon>
            mdi-delete-forever
         </v-icon>
      </div>
   </div>
</template>

<script>
export default {
   name: 'CommentListItem',
   props: {
      comment: Object,
   },
   methods: {
      deleteComment: function() {
         this.$emit('deleteComment', this.comment);
      },
   },
};
</script>

<style scoped></style>
