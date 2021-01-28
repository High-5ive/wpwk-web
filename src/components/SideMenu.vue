<template>
   <div class="container">
      <div class="user-wrapper">
         <p>
            <span>{{ userInfo.nickname }}</span
            >님 환영합니다
         </p>
         <span class="mypage" @click="$router.push('mypage').catch(() => {})">내 정보 보기</span>
         <span class="logout" @click="$store.dispatch('doLogout')">로그아웃</span>
      </div>
      <div class="link-wrapper">
         <router-link to="/">Nori</router-link>
         <router-link to="/cmmu">Community</router-link>
         <router-link to="/landingTest">[임시] 랜딩페이지</router-link>
         <router-link to="/view">[임시] 콘텐츠 뷰</router-link>
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

.container {
   .user-wrapper {
      // display: flex;
      // flex-direction: column;
      text-align: center;
      margin-bottom: 50px;

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
      height: 100%;

      a {
         color: black;
         text-decoration: none;
         font-size: 1.2em;
         font-weight: 400;

         margin-top: 20px;
      }
   }
}
</style>
