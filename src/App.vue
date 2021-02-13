<template>
   <v-app id="inspire">
      <!-- side menu -->
      <v-navigation-drawer v-model="drawer" app disable-resize-watcher style="z-index: 1000">
         <router-view name="side" class="sidemenu" />
      </v-navigation-drawer>

      <v-app-bar app class="root-header" absolute :class="{ openSide: drawer }">
         <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title>
            <img @click="goMain" src="@/assets/wpwk_logo.png"/>
         </v-toolbar-title>
         <div class="btn-search" @click="showSearch = !showSearch"><i class="fas fa-search"></i></div>
         <search v-if="showSearch" @searchShow="searchShow"></search>
      </v-app-bar>

      <v-main :class="{ openSide: drawer }">
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
   }),
   methods: {
      searchShow(search) {
         this.showSearch = search;
      },
      goMain: function () {
         this.$router.push('/')
      }
   }
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

#root {
   background-color: rgb(55, 117, 125) im !important;
   // width: 100px;
}

#inspire {
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

   .btn-search i {
      height: 24px;
      width: 24px;
      color: rgba(255, 180, 0);
      font-size: 18px;

      margin: 14px 0 0 14px;
   }

   // 사이드 메뉴
   .v-navigation-drawer.v-navigation-drawer--fixed {
      width: 70% !important;

      //각 디바이스 크기별 동작
      @include mobile {
         width: 70% !important;
      }

      @include tablet {
         width: 50% !important;
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
}

// 사이드 메뉴가 켜졌을 때, v-main, root-header를 우측으로 밀어줌
.openSide {
   // border: 2px solid red !important;

   @include desktop {
      margin-left: 140px !important;
   }
}
</style>
