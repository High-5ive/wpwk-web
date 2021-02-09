<template>
   <div class="search-container">
      <div class="search">
         <v-text-field v-model="searchValue" @keypress.enter="search" class="search" label="검색어를 입력해주세요." hint="ex) 종이접기, 놀이"></v-text-field>
         <v-btn outlined rounded color="blue" @click="search"> 검색 </v-btn>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Search',
   data: function () {
      return {
         searchValue: '',
      }
   },
   methods: {
      search: function () {
         this.$router.push({name:'main', query: {search: this.searchValue}})
      }
   },
};
</script>

<style lang="scss">
@import 'src/css/search.scss';
</style>
