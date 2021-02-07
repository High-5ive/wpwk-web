<template>
   <div class="ev-container">
      <p>참여한 컨텐츠가 어땠는지 평가해주세요!</p>

      <eval-buttons></eval-buttons>

      <div class="ev-footer">
         <div class="footer-eval">
            <div class="left-button" @click="goReView"><v-icon>mdi-backup-restore</v-icon> 다시보기</div>
            <div class="middle-button" @click="goHome">
               <!-- <v-icon>
                  mdi-chevron-right
               </v-icon> -->
               홈으로 가기
            </div>
            <div class="right-button">
               <!-- <v-icon>
                  mdi-chevron-right
               </v-icon> -->
               제작자의 다른 콘텐츠 보러 가기
            </div>
         </div>
      </div>

      <!-- 신고하기 모달 -->
      <div>
         <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="330">
               <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-3" color="error" dark v-bind="attrs" v-on="on"> 신고하기 </v-btn>
               </template>
               <v-card>
                  <v-card-title> 해당 컨텐츠를 신고하시겠습니까? </v-card-title>
                  <v-card-text>신고 내용은 운영진에게 전달됩니다.</v-card-text>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="green darken-1" text @click="dialog = false"> 아니요 </v-btn>
                     <v-btn color="error" text @click="dialog = false"> 신고하기 </v-btn>
                  </v-card-actions>
               </v-card>
            </v-dialog>
         </v-row>
      </div>
      <!-- 신고하기 모달 -->
   </div>
</template>

<script>
import EvalButtons from './EvalButtons.vue';

export default {
   name: 'Evaluations',
   components: {
      EvalButtons,
   },
   data: function() {
      return {
         evaluation: false,
         dialog: false,
      };
   },
   methods: {
      goHome: function() {
         this.$router.push({ name: 'Main' });
         this.$router.go(this.$router.currentRoute);
      },
      goReView: function() {
         alert('초기화면으로 돌아갑니다');
         this.evaluation = false;
         console.log(this.evaluation);
         this.$emit('evaluationPage', this.evaluation);
      },
   },
};
</script>
