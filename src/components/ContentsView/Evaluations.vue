<template>
   <div class="ev-container">
      <p>참여한 컨텐츠가 어땠는지 평가해주세요!</p>
      <div>
         <v-btn class="ma-2" outlined color="indigo"> 아이집중만땅! </v-btn>
      </div>
      <div class="">
         <v-btn class="ma-3" color="warning" dark @click="goHome"> 홈으로 가기 </v-btn>
         <v-btn class="ma-3" color="success" dark> 제작자의 다른 컨텐츠 보러가기 </v-btn>
      </div>

      <div class="ev-footer">
         <div class="footer-eval">
            <div class="left-button"><v-icon>mdi-backup-restore</v-icon> 다시보기</div>
            <div class="middle-button">
               <v-icon>
                  mdi-chevron-right
               </v-icon>
            </div>
            <div class="right-button">
               <v-icon>
                  mdi-chevron-right
               </v-icon>
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
export default {
   name: 'Evaluations',
   data: function() {
      return {
         evaluation1: 0,
         dialog: false,
      };
   },
   methods: {
      click1: function() {
         this.evaluation1 += 1;
      },
      goHome: function() {
         this.$router.push({ name: 'Main' });
         this.$router.go(this.$router.currentRoute);
      },
   },
};
</script>
