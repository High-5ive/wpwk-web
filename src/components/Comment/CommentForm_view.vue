<template>
   <!-- 콘텐츠 뷰 안에 들어가는 댓글창 -->
   <div class="comment-view-footer">
      <div class="close-btn" @click="closeModal">
         <v-icon>mdi-close</v-icon>
      </div>
      <input @keypress.enter="createComment" class="input-box nf" type="text" v-model="content" placeholder="댓글을 작성해주세요." />
      <button @click="createComment" class="btn-send"><v-icon>mdi-send</v-icon></button>
   </div>
</template>

<script>
import moment from 'moment';

export default {
   name: 'CommentFormView',
   data: function() {
      return {
         content: '',
      };
   },
   methods: {
      createComment: function() {
         if (this.content == '') {
            alert('내용을 입력해주세요');
            return;
         }

         // 임의의 사용자 이름 설정
         const username = 'abc';
         const now = moment().format('YYYY-MM-DD HH:mm:ss');
         const comment = {
            content: this.content,
            user: username,
            created_at: now,
         };
         this.$emit('createComment', comment);
         this.content = '';
      },
      // 현재 댓글 창을 닫기
      closeModal() {
         this.$emit('emit-close');
      },
   },
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

.comment-view-footer {
   position: fixed;
   z-index: 100;
   // left: 0;
   bottom: 0;
   // transform: translateX(-50%);

   height: 50px;
   width: 100%;

   @include desktop {
      // margin-left: 400px;
      width: calc(100% - 400px);
   }

   background-color: white;

   display: flex;

   .close-btn {
      border-radius: 0px;
      // position: fixed;
      // z-index: 110;
      // bottom: 0px;

      text-align: center;
      line-height: 45px;

      width: 60px;
      height: 50px;

      background-color: rgb(247, 179, 179);
      // border-right: 1px solid $main-green;

      i {
         color: white;
      }

      &:focus {
         outline: none;
      }
   }

   .input-box {
      width: 100%;
      // background-color: blue;
      padding: 20px;
      border: 1px solid $main-green;

      &:focus {
         outline: none;
      }
   }

   .btn-send {
      width: 60px;
      background-color: $main-green;

      i {
         color: white;
      }

      &:focus {
         outline: none;
      }
   }
}
</style>
