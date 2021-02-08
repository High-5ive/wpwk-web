<template>
   <div class="ev-container">
      <div class="top-wrapper">
         <img class="ev-bubble" src="@/assets/img/characters/eval_bubble2.png" />
         <img class="ev-wk" src="@/assets/img/characters/eval_wk1.png" />
         <span class="ev-title nf">이번 콘텐츠는 어떻게 보셨나요?</span>
      </div>

      <span class="sub nf">*어떠셨는지 마음껏 선택해주세요</span>
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
