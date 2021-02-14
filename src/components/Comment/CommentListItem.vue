<template>
  <div class="comment-item">
    <!-- 작성자, 생성일 등 맨 위 -->
    <div class="top-wrapper">
      <span class="nickname nf">{{ commentItem.nickname }}</span>
      <span class="created nf">{{ commentItem.createdAt }}</span>
    </div>

    <!-- 댓글 내용 -->
    <p class="content nf">{{ commentItem.comment }}</p>

    <!-- 삭제버튼이 들어감. fixed로 우측 고정 -->

    <div v-if="userInfo.userId == this.commentItem.userId" class="btn-wrapper">
      <v-icon @click="deleteComment">
        mdi-delete-forever
      </v-icon>
      <!-- 수정버튼 Icon 이벤트 수정-->
      <v-icon @click="updateComment">
        mdi-tooltip-edit-outline
      </v-icon>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: function() {
    return {
      commentItem: this.comment,
    };
  },
  name: 'CommentListItem',
  props: {
    comment: Object,
  },
  methods: {
    deleteComment: function() {
      if (confirm('댓글을 삭제 하시겠습니까?') == true) {
        this.$emit('deleteComment', this.comment);
      } else {
        return false;
      }
    },
    updateComment: function() {
      var inputString = prompt(
        '댓글 수정할 내용을 적어주세요',
        '기본 값 문자열'
      );

      if (inputString) {
        this.comment.comment = inputString;
        this.$emit('updateComment', this.comment);
      }
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>

<style scoped></style>
