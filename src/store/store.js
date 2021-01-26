import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router'
// import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // 컴포넌트 간에 공유할 data
        isLogin: false,
        userInfo: {
            email: '',
            nickname: '',
        }
    },
    mutations: { // state의 변화를 일으키는 곳, state 조작은 여기서만 하길 권장

        //로그인 성공 시
        loginSuccess(state, payload) {
            state.isLogin = true;
            state.userInfo = payload;
        },

        //로그아웃 시 
        logout(state) {
            // localStorage.removeItem("log");
            localStorage.clear();

            console.log('1', state);
            state.isLogin = false;
            // state.userInfo = null;
            console.log('2', state);
        }
    },
    actions: { // 비즈니스 로직 : state 반영 전 데이터 조회 및 가공
        //로그인 처리
        doLogin(state, payload) {
            if (payload.email == "a@a.com" && payload.password == "aaa123") {
                alert('로그인 성공!');

                let sample = {
                    email: 'a@a.com',
                    nickname: '위파',
                };

                this.commit("loginSuccess", sample);
                localStorage.setItem("log", '로그인중');

                router.push({
                    name: 'Main'
                });
            } else {
                alert('로그인 실패!');
            }
        },

        //비동기로 받은 데이터에 닉네임이 있는지 판별
        //있다면 메인으로, 없다면 최초 별명 설정 페이지로 이동 
        checkNickName(param) {
            if (param.nickname !== '') {
                router.push({
                    name: 'Main'
                });
            } else {
                // 별명 설정 페이지로 이동
            }
        },

        doLogout() {
            this.commit("logout");
            alert('로그아웃 완료');

            router.push({
                path: '/landingTest'
            });
        },

        getUserInfo() {
            let log = localStorage.getItem("log");
            let social = localStorage.getItem("com.naver.nid.oauth.state_token");

            if (log != null || social != null) {
                let sample = {
                    email: 'a@a.com',
                    nickname: '위파',
                };

                this.commit("loginSuccess", sample);
            } else {
                alert("로그인을 먼저 해주세요!");
                router.push('/landingTest');
            }
        },
    }
})