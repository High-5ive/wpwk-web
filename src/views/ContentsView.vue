<template>
   <div class="cv-container">
      <!-- evaluation값에 따라 페이지 변환 -->
      <!-- 평가페이지 -->
      <div v-if="evaluationValue">
         <!-- <v-icon @click="back">
            mdi-backup-restore
         </v-icon> -->
         <Evaluations @evaluationPage="evaluation" />
      </div>

      <!-- 카드페이지 -->
      <div v-else class="cv-card-wrapper">
         <div class="card-top-wrapper">
            <p class="title nf">{{ this.title }}</p>
            <p class="writer">도곡동슈퍼맘</p>
         </div>

         <CardList :cards="cards" @evaluationPage="evaluation" />
      </div>

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
import CommentList from '@/components/Comment/CommentList';
import CommentForm from '@/components/Comment/CommentForm';

// img, photo, description은 제공받는 데이터에서 가져옴(임의의 값 설정)
const noriContent = {
   title: '아이 창의력 키우는, 손바닥 물감 놀이! 재밌어요!',
   writer: '도곡동슈퍼맘',
   itemList: [
      {
         type: 'youtube',
         youtube: {
            thumbnaeilSrc: '',
            title: '',
            videoId: 'I83Y3B_C1A0',
         },
         photo: {},
         video: '',
         description: '물감은 문구점에서 3000원 정도면 살 수 있어요! 로켓배송으로 시켰더니 바로 오네요ㅎㅎㅎ 바쁘시면 영상 4분 부터 보시면 돼요!',
      },

      {
         type: 'photo',
         youtube: {
            thumbnaeilSrc: '',
            title: '',
            videoId: '',
         },
         photo: 'http://img.wemep.co.kr/deal/9/093/3840939/1d62167fc9bea5886e20bbbe134153d20dd388bf.jpg',
         video: '',
         description: '아이들이 시간 가는 줄 몰라하네요 ㅎㅎㅎ',
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
         description: '물감 많이 튀니, 비닐 깔고 하시는거 추천드려요. 김장 비닐 다이소에서 천원이래요~',
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
