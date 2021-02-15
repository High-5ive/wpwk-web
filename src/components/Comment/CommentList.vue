w<template>
   <div class="comment-wrapper">
      <CommentListItem v-for="(comment, idx) in comments" :key="idx" :comment="comment" @deleteComment="deleteComment" @updateComment="updateComment" />
   </div>
</template>

<script>
import CommentListItem from './CommentListItem';

export default {
   name: 'CommentList',
   props: {
      comments: Array,
   },
   components: {
      CommentListItem,
   },
   methods: {
      deleteComment: function(comment) {
         this.$emit('deleteComment', comment);
      },
      updateComment: function(comment) {
         this.$emit('updateComment', comment);
      },
   },
};
</script>

<style lang="scss">
@import 'src/css/comment.scss';
</style>
