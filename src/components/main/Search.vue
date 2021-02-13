<template>
   <div class="search-container">
      <div class="search">
         <v-text-field v-model="searchValue" @keypress.enter="search" label="검색어를 입력해주세요." hint="ex) 종이접기, 놀이"></v-text-field>
         <v-btn outlined rounded color="blue" @click="search"> 검색 </v-btn>
      </div>
      <div class="nf"> 카테고리 검색 </div>
      <div class="category-wrapper">
         <div class="category">
            <SearchItem v-for="(selectValue, idx) in categories1" :key="idx" :selectValue="selectValue" @categorySearchShow="categorySearchShow"/>
         </div>
         <div class="category">
            <SearchItem v-for="(selectValue, idx) in categories2" :key="idx" :selectValue="selectValue" @categorySearchShow="categorySearchShow"/>
         </div>
      </div>
      <div class="nf"> 인기 컨텐츠 </div>
      <div class="popularity-wrapper">
         <div class="popularity nf">
            <SearchItem v-for="(selectValue, idx) in popularityContents" :key="idx" :selectValue="selectValue" @categorySearchShow="categorySearchShow"/>
         </div>
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
         categories1: ['언어지능', '논리수학지능', '공간지능', '개인내지능'],
         categories2: ['음악지능', '신체운동지능', '자연지능', '대인지능'],
         popularityContents: ['뽀로로와 함께', '과자로 집을 만들어봐요!', '재밌는 물감 놀이']
      }
   },
   methods: {
      search: function () {
         this.$router.push({name: 'SearchResult', params: { searchValue: this.searchValue , type: "keyword"}})
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
