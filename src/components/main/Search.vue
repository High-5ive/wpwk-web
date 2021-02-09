<template>
   <div class="search-container">
      <div class="search">
         <v-text-field v-model="searchValue" @keypress.enter="search" class="search" label="검색어를 입력해주세요." hint="ex) 종이접기, 놀이"></v-text-field>
         <v-btn outlined rounded color="blue" @click="search"> 검색 </v-btn>
      </div>
      <div> 카테고리 검색 </div>
      <div class="category-wrapper">
         <SearchItem v-for="(category, idx) in categories" :key="idx" :category="category" @categorySearchShow="categorySearchShow"/>
      </div>
   </div>
</template>

<script>
import SearchItem from "./SearchItem.vue";

export default {
   name: 'Search',
   components: {
      SearchItem
   },
   data: function () {
      return {
         searchValue: '',
         searchShow: false,
         categories: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능']
      }
   },
   methods: {
      search: function () {
         this.$router.push({name:'main', query: {search: this.searchValue}})
         this.$emit('searchShow', this.searchShow)
      },
      categorySearchShow(search) {
         this.$emit('searchShow', search)
      }
   },
};
</script>

<style lang="scss">
@import 'src/css/search.scss';
</style>
