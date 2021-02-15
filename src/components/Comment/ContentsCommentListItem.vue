<template>
  <div class="comment-item">
    <!-- 작성자, 생성일 등 맨 위 -->
    <div class="top-wrapper">
      <span class="nickname nf">{{ comment.nickname }}</span>
      <span class="created nf">{{ comment.createdAt }}</span>
    </div>

    <!-- 댓글 내용 -->
    <div>
      <p v-if="!isEditMode" class="content nf">{{ comment.comment }}</p>
      <div>
        <input
          v-if="isEditMode"
          type="text"
          id="editComment"
          class="content nf edit"
          v-model="comment.comment"
          @keyup.enter="updateComment"
          @keyup.esc="isEditMode = false"
        />
      </div>
      <span v-if="isEditMode" class="hint">취소하려면 ESC를 누르세요.</span>
    </div>

    <!-- 삭제버튼이 들어감. fixed로 우측 고정 -->

    <div v-if="userInfo.userId == comment.userId" class="btn-wrapper">
      <v-icon @click="deleteComment">
        mdi-delete-forever
      </v-icon>
      <!-- 수정버튼 Icon 이벤트 수정-->
      <v-icon @click="changeMode">
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
      // commentItem: this.comment,
      isEditMode: false,
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
        return;
      }
    },
    updateComment: function() {
      this.$emit('updateComment', this.comment);
      this.isEditMode = false;
    },
    changeMode: function() {
      this.isEditMode = this.isEditMode === false ? true : false;
      if (this.isEditMode === true) {
        setTimeout(() => {
          document.getElementById('editComment').focus();
        }, 100);
      } else {
        this.updateComment();
      }
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>

<style scoped>
input {
  width: 80%;
  border-radius: 20px;
  padding: 5px 20px;
}

input:focus {
  outline: none;
  background: #f8d899;
}

.hint {
  color: #a9a9a9;
  font-size: 8px;
}
</style>
