import Vue from "vue";
import Vuex from "vuex";
import router from "../router/router";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 컴포넌트 간에 공유할 data
    isLogin: false, // 로그인 여부
    userInfo: null,
  },
  mutations: {
    // state의 변화를 일으키는 곳, state 조작은 여기서만 하길 권장

    //로그인 성공 시
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.userInfo = payload;
    },

    // 로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },

    //로그아웃 시
    logout(state) {
      localStorage.removeItem("accessToken");
      state.isLogin = false;
      state.userInfo = null;
    },
  },
  actions: {
    doLogout({ commit }) {
      commit("logout");
      localStorage.removeItem("accessToken");
      // axios.defaults.headers.common["auth-token"] = undefined;
    },

    //비동기로 받은 데이터에 닉네임이 있는지 판별
    //있다면 메인으로, 없다면 최초 별명 설정 페이지로 이동
    checkNickName(param) {
      if (param.nickname !== "") {
        router.push({
          name: "Main",
        });
      } else {
        // 별명 설정 페이지로 이동
      }
    },

    getUserInfo({commit}) {
      let log = localStorage.getItem("accessToken");
      let social = localStorage.getItem("com.naver.nid.oauth.state_token");

      if (log != null) {
        let token = localStorage.getItem("accessToken");
        let decode = jwt_decode(token);
        let userInfo = {
          userId: decode.userId,
          nickname: decode.nickname,
        };
        commit("loginSuccess", userInfo);
      } else if (social != null) {
        let sample = {
          email: "a@a.com",
          nickname: "위파",
        };

        this.commit("loginSuccess", sample);
      } else {
        alert("로그인을 먼저 해주세요!");
        router.push("/landingTest");
      }
    },
  },
});
