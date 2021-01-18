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

      <v-app-bar app>
         <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title>LOGO</v-toolbar-title>
         검색 버튼
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
