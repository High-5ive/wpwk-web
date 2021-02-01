<template>
   <div class="container d-flex flex-column align-center">
      <div class="top">
         <span>{{ userInfo.nickname }}</span>
         
      </div>
      <div class="middle d-flex justify-space-around">
         <div class="left">
            작성 글
         </div>
         <div class="center">
            작성 노리
         </div>
         <div class="right">
            관심 노리
         </div>
      </div>
      <div class="bottom">
         <chart />
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex'
import Chart from '@/components/mypage/Chart.vue'

export default {
   name: "Mypage",
   components: {
      Chart,
   },
   computed: {
      ...mapState(['userInfo']),
   },
  
}
</script>
<style lang="scss" scoped>
.container {
   width: 100%;
   .middle {
      width: 100%;
   }
}
</style>