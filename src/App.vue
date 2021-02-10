<template>
   <v-app id="inspire">
      <!-- side menu -->
      <v-navigation-drawer v-model="drawer" app style="z-index: 1000" absolute>
         <router-view name="side" class="sidemenu" />
      </v-navigation-drawer>

      <v-app-bar app class="root-header" absolute>
         <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title
            ><router-link to="/"><img src="@/assets/wpwk_logo.png"/></router-link
         ></v-toolbar-title>
         <div class="btn-search" @click="showSearch = !showSearch"><i class="fas fa-search"></i></div>
         <search v-if="showSearch"></search>
      </v-app-bar>

      <v-main>
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
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

#root {
   background-color: rgb(55, 117, 125) !important;
   // width: 100px;
}

#inspire {
   font-family: 'Poor Story' sans-serif !important;

   max-height: 800px;
   border: 2px solid orange;

   padding-right: 0px !important;

   .v-application--wrap {
      max-height: inherit;

      .v-main {
         max-height: inherit !important;
         border: 2px solid green;
         overflow: scroll;
         padding-bottom: 100px;
      }

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
         .v-navigation-drawer__content {
            .sidemenu {
               // padding-top: 56px;
               // background-color: red;
               overflow: hidden;
            }
         }
      }
   }
}
</style>
