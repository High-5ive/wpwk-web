/* 1. 기본 셋팅
 - npm으로 라우터 설치(모듈 시스템 이용)시, 임포트 후 명시적으로 추가
*/
<<<<<<< HEAD
import Vue from 'vue';
import VueRouter from 'vue-router';
=======
import Vue from "vue";
import VueRouter from "vue-router";
>>>>>>> origin/feature-sendEmailPage

Vue.use(VueRouter);

// ==============================

/* 2. 컴포넌트 및 views 임포트
 - 컴포넌트 : 모든 사이트에 공통으로 들어가는 놈
 - 뷰 : 화면 바뀌는 녀석들
 */

//사이드 바 import
<<<<<<< HEAD
import SideMenu from '@/components/SideMenu.vue';

//아래 바뀌는 모든 화면단을 import
import Main from '../views/Main.vue';
import Community from '../views/Community.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import Mypage from '../views/Mypage.vue';
import ContentsCreate from '../views/ContentsCreate.vue';
import ContentsView from '../views/ContentsView.vue';
import LandingPage from '@/views/user/LandingPage.vue';
import Login from '@/views/user/Login.vue';
import Join from '@/views/user/Join.vue';
import NaverLoginProcess from '@/components/user/NaverLoginProcess.vue';
import KakaoLoginProcess from '@/views/user/KakaoLoginProcess.vue';

const onlyAuthUser = (to, from, next) => {
  if (localStorage.getItem('accessToken') !== null) {
    next();
  } else {
    alert('로그인이 필요한 페이지입니다. ');
    // alert(store.state.userInfo)
    next('/login');
  }
};
=======
import SideMenu from "@/components/SideMenu.vue";

//아래 바뀌는 모든 화면단을 import
import Main from "../views/Main.vue";
import Community from "../views/Community.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import Mypage from "../views/Mypage.vue";
import ContentsCreate from "../views/ContentsCreate.vue";
import ContentsView from "../views/ContentsView.vue";
import LandingPage from "@/views/user/LandingPage.vue";
import Login from "@/views/user/Login.vue";
import Join from "@/views/user/Join.vue";
import Auth from "@/views/user/Auth.vue";
import JoinSuccess from "@/views/user/JoinSuccess.vue";
import JoinConfirm from "@/views/user/JoinConfirm.vue";
>>>>>>> origin/feature-sendEmailPage

// ==============================

// 여러개 태울 때, routes 변수 생성
<<<<<<< HEAD
const routes = [
  {
    path: '/',
    name: 'Main',
=======
const onlyAuthUser = (to, from, next) => {
  if (localStorage.getItem("accessToken") !== null) {
    next();
  } else {
    alert("로그인이 필요한 페이지입니다. ");
    // alert(store.state.userInfo)
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Main",
>>>>>>> origin/feature-sendEmailPage
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: Main,
    },
  },
  {
<<<<<<< HEAD
    path: '/cmmu',
    name: 'community',
    beforeEnter: onlyAuthUser,
=======
    path: "/cmmu",
    name: "communiny",
>>>>>>> origin/feature-sendEmailPage
    components: {
      side: SideMenu,
      default: Community,
    },
  },
  {
<<<<<<< HEAD
    path: '/cmmu/:articleId',
    name: 'ArticleDetail',
    beforeEnter: onlyAuthUser,
=======
    path: "/cmmu/:articleId",
    name: "ArticleDetail",
>>>>>>> origin/feature-sendEmailPage
    components: {
      side: SideMenu,
      default: ArticleDetail,
    },
    props: true,
  },
  {
<<<<<<< HEAD
    path: '/mypage',
    name: 'mypage',
    beforeEnter: onlyAuthUser,
=======
    path: "/mypage",
    name: "mypage",
>>>>>>> origin/feature-sendEmailPage
    components: {
      side: SideMenu,
      default: Mypage,
    },
  },
  {
<<<<<<< HEAD
    path: '/contentscreate',
    name: 'ContentsCreate',
    beforeEnter: onlyAuthUser,
=======
    path: "/contentscreate",
    name: "ContentsCreate",
>>>>>>> origin/feature-sendEmailPage
    components: {
      side: SideMenu,
      default: ContentsCreate,
    },
  },
  {
<<<<<<< HEAD
    path: '/view',
    name: 'ContentsView',
    beforeEnter: onlyAuthUser,
=======
    path: "/view",
    name: "ContentsView",
>>>>>>> origin/feature-sendEmailPage
    components: {
      side: SideMenu,
      default: ContentsView,
    },
  },
<<<<<<< HEAD
  {
    path: '/landingTest',
=======

  {
    path: "/landingTest",
>>>>>>> origin/feature-sendEmailPage
    components: {
      default: LandingPage,
    },
  },
  {
<<<<<<< HEAD
    path: '/login',
    name: 'Login',
=======
    path: "/login",
    name: "Login",
>>>>>>> origin/feature-sendEmailPage
    components: {
      default: Login,
    },
  },
  {
<<<<<<< HEAD
    path: '/join',
    name: 'Join',
=======
    path: "/join",
    name: "Join",
>>>>>>> origin/feature-sendEmailPage
    components: {
      default: Join,
    },
  },
  {
<<<<<<< HEAD
    path: '/login/oauth2/code/naver',
    name: 'NaverLoginProcess',
    component: NaverLoginProcess,
  },
  {
    path: '/kakao',
    name: 'KakaoLoginProcess',
    components: {
      default: KakaoLoginProcess,
    },
  },
];

const router = new VueRouter({
  mode: 'history', //뒤에 # 을 없애줌
=======
    path: "/auth",
    name: "Auth",
    components: {
      default: Auth,
    },
  },
  {
    path: "/joinSuccess",
    name: "JoinSuccess",
    components: {
      default: JoinSuccess,
    },
  },
  {
    path: "/users/confirm",
    name: "JoinConfirm",
    components: {
      default: JoinConfirm,
    },
  },
];

const router = new VueRouter({
  mode: "history", //뒤에 # 을 없애줌
>>>>>>> origin/feature-sendEmailPage
  // base: process.env.BASE_URL,
  routes,
});

export default router;
