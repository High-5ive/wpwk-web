<template>
   <div class="contanier">
      <div class="link-wrapper">
         <p style="color:red">{{ userInfo.nickname }}님 헬로!</p>
         <span @click="$store.dispatch('doLogout')">로그아웃</span>
         <router-link to="/">Nori</router-link>
         <router-link to="/cmmu">Community</router-link>
         <router-link to="/mypage">My Page</router-link>
         <router-link to="/ContentsCreate">[임시] 콘텐츠 제작</router-link>
         <router-link to="/landingTest">[임시] 랜딩페이지</router-link>
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
<style scoped>
.link-wrapper {
   display: flex;
   flex-direction: column;
   height: 100%;
}

.link-wrapper a {
   color: black;
   text-decoration: none;
   font-size: 1.2em;

   text-align: center;
   margin-top: 20px;
}
</style>
