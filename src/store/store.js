import Vue from "vue";
import Vuex from "vuex";
import router from "../router/router";
import { login, getMemberInfo } from "@/api/user.js";

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

    //로그아웃 시
    logout(state) {
      localStorage.removeItem("accessToken");
      state.isLogin = false;
      state.userInfo = null;
    },

    setUserInfo(state, userInfo) {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 비즈니스 로직 : state 반영 전 데이터 조회 및 가공
    //로그인 처리
    doLogin({ dispatch }, loginObj) {
      // 전체 유저에서 해당 이메일로 유저를 찾는다.
      localStorage.setItem("access-token", "");
      login(
        loginObj,
        (res) => {
          // 로그인에 성공한 경우
          if (res.status === 201) {
            let token = res.data["access-token"];
            localStorage.setItem("access-token", token);
            dispatch("getMemberInfo", true);
            // this.$router.push("/");
          } else {
            this.isLoginError = true;
          }
        },
        (err) => {
          console.log("err : " + err);
          // 401 -> 인증되지 않은 경우
          if (err.status === 401) {
            alert("인증되지 않은 이메일입니다.");
            // router.push({ name: "home" })
          }

          if (err.status === 404) {
            alert("이메일 또는 비밀번호를 확인하세요.");
          }
        }
      );
    },

    getMemberInfo({ commit }, isFirst) {
        getUserInfo(
            (res) => {
                commit("loginSuccess", userInfo);
                if (isFirst === true) {
                    //  router.push({ name: "home" });
                }
            },
            (err) => {
                alert("유저정보를 가져올 수 없습니다.");
                console.log(error);
            }
        )
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

    doLogout() {
      this.commit("logout");
      alert("로그아웃 완료");

      router.push({
        path: "/landingTest",
      });
    },

    getUserInfo() {
      let log = localStorage.getItem("log");
      let social = localStorage.getItem("com.naver.nid.oauth.state_token");

      if (log != null || social != null) {
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
