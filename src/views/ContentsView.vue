<template>
   <div class="cv-container">
      <!-- evaluation값에 따라 페이지 변환 -->
      <!-- 평가페이지 -->
      <div v-if="evaluationValue">
         <Evaluations @evaluationPage="evaluation" />
      </div>

      <!-- 카드페이지 -->
      <div v-else class="cv-card-wrapper">
         <div class="card-top-wrapper">
            <p class="title nf">{{ this.title }}</p>
            <p class="writer nf">{{ this.writer }}</p>
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
                     <CommentList :comments="this.comments" @deleteComment="deleteComment" />
                  </div>
                  <comment-form-view @createComment="createComment" @emit-close="closeModal" />
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

// img, photo, description은 제공받는 데이터에서 가져옴(임의의 값 설정)

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
         cards: Array,
         title: '',
         writer: '',
         evaluationValue: false,
         dialog: false,
         comments: [],
         time: {
            hour: 0,
            minute: 0,
         },
         selectedCategories: [],
         hashtags: [],
      };
   },
   created() {
      //컨텐츠 ID 에 맞는 ItemList axios 호출
      this.getContentsItems();
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
      },
      createComment: function(comment) {
         this.comments.push(comment);
      },
      getContentsItems: function() {
         var contents = this.$route.params.nori;
         //console.log(contents);
         this.writer = contents.nickname;
         this.title = contents.title;

         var contentsId = contents.id;

         findContentsItemById(
            contentsId,
            (success) => {
               console.log('get ContentsItem suc ', success.data);
               this.cards = success.data;
            },
            (fail) => {
               console.log('get ContentsItem fail ', fail);
            }
         );
      },

      // 현재 떠있는 댓글창을 닫기
      closeModal() {
         this.dialog = false;
      },
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
