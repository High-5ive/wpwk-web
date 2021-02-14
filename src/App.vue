<template>
   <v-app id="inspire">
      <!-- side menu -->
      <v-navigation-drawer v-model="drawer" app disable-resize-watcher style="z-index: 1000">
         <router-view name="side" class="sidemenu" />
      </v-navigation-drawer>

      <v-app-bar app class="root-header" :class="{ openSide: drawer }">
         <div class="btn-menu" v-if="!isDesk" @click="drawer = !drawer">
            <v-icon>mdi-hamburger</v-icon>
         </div>
         <v-toolbar-title
            ><router-link to="/main"><img src="@/assets/wpwk_logo.png"/></router-link
         ></v-toolbar-title>
         <div class="btn-search" @click="showSearch = !showSearch"><i class="fas fa-search"></i></div>
         <search v-if="showSearch" @searchShow="searchShow"></search>
      </v-app-bar>

      <v-main id="main-wrapper" :class="{ openSide: drawer }">
         <!-- {{ width }}, {{ height }} -->
         <router-view />
      </v-main>
   </v-app>
</template>

<script>
import Search from '@/components/main/Search.vue';

export default {
   name: 'App',
   components: { Search },
   data: () => ({
      drawer: false,
      showSearch: false,
      isDesk: false,

      width: 0,
      height: 0,
   }),
   mounted() {
      window.addEventListener('load', this.handleResize);
      window.addEventListener('resize', this.handleResize);
   },
   beforeDestroy() {
      window.addEventListener('load', this.handleResize);
      window.removeEventListener('resize', this.handleResize);
   },
   updated() {
      window.addEventListener('load', this.handleResize);
   },
   methods: {
      searchShow(search) {
         this.showSearch = search;
      },
      goMain: function() {
         this.$router.push('/main');
      },
      handleResize() {
         // $breakpoint-mobile: 411px;
         // $breakpoint-tablet: 600px;
         // $breakpoint-desktop: 1264px;

         this.width = window.innerWidth;

         // 1264px 이상일 경우, 햄버거 버튼 삭제 및 사이드 메뉴 고정
         if (this.width >= 1264) {
            this.isDesk = true;
            this.drawer = true;
         } else {
            this.isDesk = false; //햄버거 버튼 보일지 말지
         }
      },
   },
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

#inspire {
   // position: relative !important;
   // background-color: blue;
   font-family: 'Poor Story' sans-serif !important;

   padding-right: 0px !important;

   .v-toolbar__title {
      margin: 0 auto;
      padding-left: 0px !important;
      padding-right: 30px !important;
   }

   .root-header {
      background-color: rgb(250, 250, 250) !important;
      z-index: 200;

      img {
         height: 30px;
      }

      .btn-search {
         height: 48px;
         width: 48px;
         /* margin-right: -12px; */
         /* background-color: red; */

         position: absolute;
         /* top: -10px; */
         right: 12px;
      }
   }

   .btn-menu i {
      color: #89ba17;
   }

   .btn-search i {
      height: 24px;
      width: 24px;
      color: rgba(255, 180, 0);
      font-size: 18px;

      margin: 14px 0 0 14px;
   }

   // 사이드 메뉴
   .v-navigation-drawer.v-navigation-drawer--fixed {
      width: 400px !important;

      //각 디바이스 크기별 동작
      @include mobile {
         width: 70% !important;
         min-width: 300px !important;
      }

      @include tablet {
         // width: 50% !important;
         max-width: 420px;
      }

      @include desktop {
         width: 400px !important;
      }

      .v-navigation-drawer__content {
         .sidemenu {
            overflow: hidden;
         }
      }
   }

   // @responsive 데스크탑일 때, 본문 좌우 여백으로 사이즈 조절
   #main-wrapper {
      position: relative;

      .v-main__wrap .cv-container,
      .v-main__wrap .cc-container {
         @include desktop {
            padding: 0 20% !important;
         }
      }

      // 반응형에 해당하는 푸터들도 적용
      .cl-footer,
      .ev-footer,
      .af-footer,
      .comment-modal {
         @include desktop {
            padding: 0 20% !important;
         }
      }
   }

   // @responsive 댓글창 모달 부분 absolute로 변경
   .v-dialog__content--active,
   .v-dialog__content,
   .cc-footer,
   .cc-dialog-footer {
      @include desktop {
         margin-left: 400px;
         width: calc(100% - 400px);
         // padding: 0 20% !important;
      }

      .v-dialog--fullscreen {
         overflow: hidden;
         position: absolute !important;
      }
   }
}

// @responsive 사이드 메뉴가 켜졌을 때, v-main, root-header를 우측으로 밀어줌
.openSide {
   // border: 2px solid red !important;

   @include desktop {
      margin-left: 140px !important;
   }
}
</style>
