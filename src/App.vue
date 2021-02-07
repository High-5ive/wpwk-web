<template>
   <v-app id="inspire">
      <!-- side menu -->
      <v-navigation-drawer v-model="drawer" app style="z-index: 1000">
         <router-view name="side" class="sidemenu" />
      </v-navigation-drawer>

      <v-app-bar app class="root-header">
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

#inspire {
   /* background-color: blue; */
   font-family: 'Poor Story' sans-serif !important;

   padding-right: 0px !important;

   .v-toolbar__title {
      margin: 0 auto;
      padding-left: 0px !important;
      padding-right: 30px !important;
   }

   .root-header {
      z-index: 200;

      img {
         height: 40px;
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

   .v-navigation-drawer__content {
      .sidemenu {
         margin-top: 56px;
         /* background-color: red; */
      }
   }
}
</style>
