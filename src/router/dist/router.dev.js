'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _vue = _interopRequireDefault(require('vue'));

var _vueRouter = _interopRequireDefault(require('vue-router'));

var _SideMenu = _interopRequireDefault(require('@/components/SideMenu.vue'));

var _Main = _interopRequireDefault(require('../views/Main.vue'));

var _Community = _interopRequireDefault(require('../views/Community.vue'));

var _ArticleDetail = _interopRequireDefault(
  require('../views/ArticleDetail.vue')
);

var _Mypage = _interopRequireDefault(require('../views/Mypage.vue'));

var _ContentsCreate = _interopRequireDefault(
  require('../views/ContentsCreate.vue')
);

var _ContentsView = _interopRequireDefault(
  require('../views/ContentsView.vue')
);

var _LandingPage = _interopRequireDefault(
  require('@/views/user/LandingPage.vue')
);

var _Login = _interopRequireDefault(require('@/views/user/Login.vue'));

var _Join = _interopRequireDefault(require('@/views/user/Join.vue'));

var _Auth = _interopRequireDefault(require('@/views/user/Auth.vue'));

var _KakaoLoginProcess = _interopRequireDefault(
  require('@/views/user/KakaoLoginProcess.vue')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* 1. 기본 셋팅
 - npm으로 라우터 설치(모듈 시스템 이용)시, 임포트 후 명시적으로 추가
*/
_vue['default'].use(_vueRouter['default']); // ==============================

/* 2. 컴포넌트 및 views 임포트
 - 컴포넌트 : 모든 사이트에 공통으로 들어가는 놈
 - 뷰 : 화면 바뀌는 녀석들
 */
//사이드 바 import

// ==============================
// 여러개 태울 때, routes 변수 생성
var routes = [
  {
    path: '/',
    name: 'Main',
    components: {
      side: _SideMenu['default'],
      default: _Main['default'],
    },
  },
  {
    path: '/cmmu',
    name: 'communiny',
    components: {
      side: _SideMenu['default'],
      default: _Community['default'],
    },
  },
  {
    path: '/cmmu/:articleId',
    name: 'articledetail',
    components: {
      side: _SideMenu['default'],
      default: _ArticleDetail['default'],
    },
  },
  {
    path: '/mypage',
    name: 'mypage',
    components: {
      side: _SideMenu['default'],
      default: _Mypage['default'],
    },
  },
  {
    path: '/contentscreate',
    name: 'ContentsCreate',
    components: {
      side: _SideMenu['default'],
      default: _ContentsCreate['default'],
    },
  },
  {
    path: '/view',
    name: 'ContentsView',
    components: {
      default: _ContentsView['default'],
    },
  },
  {
    path: '/landingTest',
    components: {
      default: _LandingPage['default'],
    },
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      default: _Login['default'],
    },
  },
  {
    path: '/join',
    name: 'Join',
    components: {
      default: _Join['default'],
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    components: {
      default: _Auth['default'],
    },
  },
  {
    path: '/login/oauth2/code/kakao',
    name: 'KakaoLoginProcess',
    components: {
      default: _KakaoLoginProcess['default'],
    },
  },
];
var router = new _vueRouter['default']({
  mode: 'history',
  //뒤에 # 을 없애줌
  // base: process.env.BASE_URL,
  routes: routes,
});
var _default = router;
exports['default'] = _default;
