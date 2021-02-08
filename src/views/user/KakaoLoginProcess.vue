<template>
  <div>
    <div v-if="loading">
      <p>로그인중입니다</p>
    </div>
    <div v-if="!loading">
      <p>로그인 완료</p>
      <p>jwt token : {{ jwtToken }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import router from '../../router/router';

export default {
  data() {
    return {
      kakaoToken: '',
      jwtToken: '',
      loading: true,
    };
  },

  created() {
    this.kakaoToken = this.getToken();
    this.dokakaoLogin();
  },

  methods: {
    dokakaoLogin() {
      axios
        .get('http://localhost:9004/kakao/' + this.kakaoToken)
        .then((response) => {
          this.loading = false;
          this.jwtToken = response.data;
          localStorage.setItem('accessToken', this.jwtToken);
          this.$store.dispatch('getUserInfo');
          router.push({ name: 'Main' });
        })
        .catch((error) => {
          console.log('error : ' + error);
        });
    },

    getToken() {
      var url = this.$route.query.code;
      console.log('url ', url);
      return url;
    },
  },
};
</script>
