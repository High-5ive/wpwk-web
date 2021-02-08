<template>
  <div>
    <!-- <div v-if="loading">
      <p>로그인중입니다</p>
    </div> -->
  </div>
</template>
<script>
import axios from "axios";
import router from "../../router/router"

export default {
  data() {
    return {
      naverToken: "",
      jwtToken: "",
    };
  },

  created() {
    this.naverToken = this.getToken()    
    this.doNaverLogin()
  },

  methods: {
    doNaverLogin() {
      axios
        .get("http://localhost:9004/login/process/naver/" + this.naverToken)
        .then((response) => {
          this.loading = false;
          this.jwtToken = response.data;
          localStorage.removeItem("com.naver.nid.oauth.state_token");
          localStorage.setItem("accessToken", this.jwtToken);
          this.$store.dispatch("getUserInfo"); // 토큰을 이용한 유저정보 가져오기
          alert('로그인이 완료되었습니다')
          router.push({name:'Main'});
        })
        .catch((error) => {        
          console.log("error : " + error);
        });
    },

    getToken() {
      var url = this.$route.hash;
      var tokenInfo = url.replace("#", "");
      var strArray = tokenInfo.split("=");
      var token = strArray[1].split("&");      

      return token[0];
    },
  },
};
</script>
