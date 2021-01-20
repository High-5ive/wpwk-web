/* 1. 기본 셋팅
 - npm으로 라우터 설치(모듈 시스템 이용)시, 임포트 후 명시적으로 추가
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// ==============================

/* 2. 컴포넌트 및 views 임포트
 - 컴포넌트 : 모든 사이트에 공통으로 들어가는 놈
 - 뷰 : 화면 바뀌는 녀석들
 */

//사이드 바 import
import SideMenu from '@/components/SideMenu.vue'

//아래 바뀌는 모든 화면단을 import
import Main from '../views/Main.vue'
import Community from '../views/Community.vue'
import Mypage from '../views/Mypage.vue'
import ContentsCreate from '../views/ContentsCreate.vue'
import ContentsView from '../views/ContentsView.vue'

// ==============================

// 여러개 태울 때, routes 변수 생성
const routes = [
    {
        path: '/',
        name: 'Main',
        components: {
            side : SideMenu,
            default: Main,
        },
    },
    {
        path: '/cmmu',
        name: 'Main',
        components: {
            side : SideMenu,
            default: Community,
        },
    },
    {
        path: '/mypage',
        name: 'Main',
        components: {
            side : SideMenu,
            default: Mypage,
        },
    },
    {
        path: '/contentscreate',
        name: 'ContentsCreate',
        components: {
            default: ContentsCreate,
        },
    },
    {
        path: '/view',
        name: 'Main',
        components: {
            default: ContentsView,
        },
    },
];

const router = new VueRouter({
    mode: 'history',        //뒤에 # 을 없애줌
    // base: process.env.BASE_URL,
    routes,
});


export default router;