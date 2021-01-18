<template>
   <v-app id="inspire">
      <!-- side menu -->
      <v-navigation-drawer v-model="drawer" app>
         <router-link to="/">Nori</router-link>
         <br />
         <router-link to="/cmmu">Community</router-link>
         <br />
         <router-link to="/mypage">My Page</router-link>
      </v-navigation-drawer>

      <v-app-bar app class="root-header">
         <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title
            ><router-link to="/"><img src="@/assets/wpwk_logo.png"/></router-link
         ></v-toolbar-title>
         <div class="btn-search"><i class="fas fa-search"></i></div>
      </v-app-bar>

      <v-main>
         <router-view />
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: 'App',

   data: () => ({ drawer: null }),
};
</script>

<style>
* {
   /* border: 1px dashed green; */
}
</style>

<style scoped>
#inspire {
   /* background-color: blue; */
   font-family: 'Noto Sans KR', sans-serif;
}

.v-toolbar__title {
   margin: 0 auto;
   padding-left: 0px !important;
   padding-right: 30px !important;
}

.root-header img {
   height: 40px;
}

.root-header .btn-search {
   height: 48px;
   width: 48px;
   /* margin-right: -12px; */
   /* background-color: red; */

   position: absolute;
   /* top: -10px; */
   right: 12px;
}

.btn-search i {
   height: 24px;
   width: 24px;
   color: rgba(255, 180, 0);
   font-size: 18px;

   margin: 14px 0 0 14px;
}

.v-btn__content i {
   color: rgba(147, 217, 20) !important;
}
</style>
