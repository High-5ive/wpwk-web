<template>
   <div class="cv-container">
      <!-- evaluation값에 따라 페이지 변환 -->
      <!-- 평가페이지 -->
      <div v-if="evaluationValue">
         <Evaluations @evaluationPage="evaluation" :contentsInfo="contents" />
      </div>

      <!-- 카드페이지 -->
      <div v-else class="cv-card-wrapper">
         <div class="card-top-wrapper">
            <p class="title nf">{{ this.title }}</p>
            <!-- <button @click="deleteContent">삭제</button> -->
            <p class="writer nf" @click="$router.push({ name: 'mypage', params: { userId: writerId } })">{{ this.writer }}</p>
         </div>

         <CardList :cards="cards" @evaluationPage="evaluation" />
      </div>

      <!-- 댓글창 전체 모달 -->
      <div class="comment-modal" style="position: absolute;">
         <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" style="position: absolute;">
               <!-- 댓글 모달창을 여는 댓글 버튼 -->
               <template v-slot:activator="{ on, attrs }">
                  <v-icon id="btn-comment" v-bind="attrs" v-on="on">
                     mdi-comment-text-multiple-outline
                  </v-icon>
               </template>

               <!-- 화면 전체를 뒤덮는 모달 -->
               <v-card id="comment-box">
                  <img class="wp-face" src="@/assets/img/characters/comment_wp1.png" />
                  <img class="wp-hand" src="@/assets/img/characters/comment_wp2.png" />

                  <div class="cm-wrapper">
                     <CommentList :comments="this.comments" @deleteComment="deleteComment" @updateComment="updateComment" />
                  </div>
                  <comment-form-view :contents="contents" @createComment="createComment" @emit-close="closeModal" />
               </v-card>
            </v-dialog>
         </v-row>
      </div>
      <!-- 댓글창 끝 -->
   </div>
</template>

<script>
import CardList from '@/components/ContentsView/CardList';
import Evaluations from '@/components/ContentsView/Evaluations';
import CommentList from '@/components/Comment/CommentList';
import CommentFormView from '../components/Comment/CommentForm_view.vue';
import { findContentsItemById } from '@/api/contents.js';
import { findContentsComment } from '@/api/contents.js';
import { deleteContentsComment } from '@/api/contents.js';
import { updateContentsComment } from '@/api/contents.js';
import { createContentsComment } from '@/api/contents.js';
import { deleteContents } from '@/api/contents.js';
import { mapState } from 'vuex'

export default {
   name: 'ContentsView',
   components: {
      CardList,
      Evaluations,
      CommentList,
      CommentFormView,
   },
   data: function() {
      return {
         contentsId: 0,
         cards: Array,
         title: '',
         writer: '',
         writerId: 0,
         evaluationValue: false,
         dialog: false,
         comments: [],
         time: {
            hour: 0,
            minute: 0,
         },
         selectedCategories: [],
         hashtags: [],
         contents: Object,
      };

   },
   computed: {
      ...mapState(['userInfo'])
   },
   created() {
      this.getContentsItems();
      //컨텐츠 ID 에 맞는 ItemList axios 호출
   },

   methods: {

      evaluation(value) {
         this.evaluationValue = value;
      },
      back: function() {
         this.evaluationValue = false;
         this.$router.go(this.$router.currentRoute);
      },
      deleteComment: function(comment) {
         const deleteId = this.comments.indexOf(comment);
         this.comments.splice(deleteId, 1);
         console.log('deleteComment', deleteId);

         deleteContentsComment(
            comment.id,
            (success) => {
               alert('댓글을 삭제 했습니다.');
               console.log('댓글을 삭제 succ.', success);
            },
            (fail) => {
               console.log('댓글을 삭제 fail.', fail);
            }
         );
      },
      updateComment: function(comment) {
         // console.log(comment);

         var data = {
            commentId: comment.id,
            comment: comment.comment,
         };

         updateContentsComment(
            data,
            (success) => {
               console.log(success);
               alert('댓글 수정을 완료 했습니다.');
            },
            (fail) => {
               console.log(fail);
               alert('댓글을 수정하는데 실패 했습니다.');
            }
         );
      },

      createComment: function(comment) {
         console.log(comment);

         this.comments.push(comment);
         createContentsComment(
            comment,
            (success) => {
               console.log(success);
            },
            (fail) => {
               console.log(fail);
            }
         );
      },

      getContentsItems: function() {
         var contents = this.$route.params.nori;
         this.contents = contents;
         this.writerId = contents.userId;
         this.writer = contents.nickname;
         this.title = contents.title;
         this.contentsId = contents.id;

         findContentsItemById(
            this.contentsId,
            (success) => {
               console.log('get ContentsItem suc ', success.data);
               this.cards = success.data;
            },
            (fail) => {
               console.log('get ContentsItem fail ', fail);
            }
         );

         findContentsComment(
            this.contentsId,
            (success) => {
               console.log('get Contents Comments success', success.data);
               this.comments = success.data;
            },
            (fail) => {
               console.log('get Contents Comment fail', fail);
            }
         );
      },

      // 현재 떠있는 댓글창을 닫기
      closeModal() {
         this.dialog = false;
      },
      deleteContent: function () {
         if (this.userInfo.userId === this.writerId) {
            deleteContents(
               this.contentsId,
               () => {
                  alert('노리 삭제가 완료되었습니다.')
                  this.$router.push('/main')
               },
               (fail) => {
                  console.log(fail)
               }
            )
         } else {
            this.$router.push('/main')
         }
      }
   },

   watch: {
      evaluationValue: function() {
         this.cards = [];
         this.getContentsItems();
      },
   },
};
</script>

<style lang="scss">
@import 'src/css/contentsView.scss';
</style>
