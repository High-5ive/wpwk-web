<template>
   <div class="sm-container">
      <div class="user-wrapper">
         <p>
            <span>{{ userInfo.nickname }}</span
            >님 환영합니다
         </p>
         <span class="mypage" @click="$router.push('mypage').catch(() => {})">내 정보 보기</span>
         <span class="logout" @click="$store.dispatch('doLogout')">로그아웃</span>
      </div>
      <div class="link-wrapper">
         <div class="img-btn" @click="$router.push('/')">
            Nori
         </div>
         <div class="img-btn" @click="$router.push('cmmu')">
            Community
         </div>
      </div>
      <div class="ad-wrapper">
         <div class="ad1">AD Banner</div>
         <div class="ad2">AD Banner</div>
         <div class="ad3">AD Banner</div>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
   computed: {
      ...mapState(['userInfo']),
   },
};
</script>
<style lang="scss" scoped>
@import 'src/css/vars';

.sm-container {
   position: relative;
   height: 100%;
   background-color: transparent !important;

   .user-wrapper {
      // display: flex;
      // flex-direction: column;
      text-align: center;
      margin-bottom: 50px;
      padding-top: 56px;

      p {
         font-size: 20px;
         color: $pink;
         margin-bottom: 0px;

         span {
            font-weight: 600;
         }
      }

      .mypage {
         text-decoration: underline;
         font-size: 14px;
         margin-top: 0px;
         margin-right: 12px;
      }

      .logout {
         text-decoration: underline;
         font-size: 13px;
         color: grey;
      }
   }

   .link-wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;

      .img-btn {
         width: 70%;
         height: 120px;
         border: 1px solid rgb(208, 208, 208);
         text-align: center;
         margin: 10px auto;
      }
   }

   .ad-wrapper {
      position: absolute;
      bottom: 0;
      height: 300px;
      width: 100%;

      div {
         width: 70%;
         height: 70px;
         border: 1px solid rgb(208, 208, 208);
         margin: 10px auto;

         text-align: center;
         color: rgb(208, 208, 208);
      }
   }
}
</style>
