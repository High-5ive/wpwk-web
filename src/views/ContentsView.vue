<template>
   <div class="cv-container">
      <!-- evaluation값에 따라 페이지 변환 -->
      <!-- 평가페이지 -->
      <div v-if="evaluationValue">
         <v-icon @click="back">
            mdi-backup-restore
         </v-icon>
         <Evaluations />
      </div>

      <!-- 카드페이지 -->
      <div v-else class="cv-card-wrapper">
         <div class="card-top-wrapper">
            <p class="title">{{ this.title }}</p>
            <p class="writer">관악구최강대디</p>
         </div>

         <CardList :cards="cards" @evaluationPage="evaluation" />
      </div>
      <br />

      <!-- 댓글창 전체 모달 -->
      <div class="comment-modal">
         <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
               <template v-slot:activator="{ on, attrs }">
                  <v-icon id="btn-comment" color="success" dark v-bind="attrs" v-on="on"> mdi-comment-text-multiple-outline </v-icon>
               </template>

               <v-card>
                  <v-toolbar dark color="success">
                     <!-- 닫기 버튼 -->
                     <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                     </v-btn>

                     <v-toolbar-title>댓글</v-toolbar-title>
                  </v-toolbar>

                  <CommentList :comments="this.comments" @deleteComment="deleteComment" />
                  <CommentForm @createComment="createComment" />
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
import CommentList from '@/components/ContentsView/CommentList';
import CommentForm from '@/components/ContentsView/CommentForm';

// img, photo, description은 제공받는 데이터에서 가져옴(임의의 값 설정)
const noriContent = {
   title: '노리 컨텐츠입니다.',
   itemList: [
      {
         type: 'youtube',
         youtube: {
            thumbnaeilSrc: '',
            title: '',
            videoId: 'y315L6tkNxQ',
         },
         photo: {},
         video: '',
         description: '유튜브입니다.',
      },

      {
         type: 'photo',
         youtube: {
            thumbnaeilSrc: '',
            title: '',
            videoId: '',
         },
         photo: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
         video: '',
         description: '사진입니다.',
      },

      {
         type: 'text',
         youtube: {
            thumbnaeilSrc: '',
            title: '',
            videoId: '',
         },
         photo: {},
         video: '',
         description: '글입니다.',
      },
   ],
   time: {
      hour: 0,
      minute: 0,
   },
   selectedCategories: [],
   hashtags: [],
};

export default {
   name: 'ContentsView',
   components: {
      CardList,
      Evaluations,
      CommentList,
      CommentForm,
   },
   data: function() {
      return {
         cards: [],
         title: '',
         evaluationValue: false,
         dialog: false,
         comments: [],
      };
   },
   methods: {
      //card, comment 임의의 값 입력
      // getCards: function () {
      //     this.cards = data
      // },
      getCards: function() {
         this.cards = noriContent.itemList;
         this.title = noriContent.title;
      },
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
   },
   created: function() {
      this.getCards();
   },
};
</script>

<style lang="scss">
@import 'src/css/contentsView.scss';
</style>
