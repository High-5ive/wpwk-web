<template lang="">
   <!-- 전체 한 덩어리 -->
   <div class="content-wrapper">
      <!-- 이미지썸네일과 뱃지들 -->
      <div class="img-wrapper">
         <img :src="thumbnail" alt="" @click="contentsClick(sendNori)" />
         <!-- 이미지 위에 표시되는 뱃지들이 위치합니다 -->
         <!-- <div class="itemLength">{{ sendNori.itemList.length }}</div> -->
         <div class="badge-cate">
            <span v-for="(ability, idx) in sendNori.abilities" :key="idx">
               {{ ability }}
            </span>
         </div>
      </div>

      <!-- 하단 설명글 -->
      <div class="desc-wrapper">
         <h1>{{ sendNori.title }}</h1>
         <span v-for="(tag, idx) in sendNori.tagList" :key="'tag' + idx" @click="tagSearch(tag.name)"> #{{ tag.name }} </span>
         <h6>{{ sendNori.nickname }}</h6>
         <div class="btn-like">
            <v-icon>
               mdi-heart
            </v-icon>
         </div>
      </div>
   </div>
</template>

<script>
import router from '../../router/router';

export default {
   name: 'NoriContent',
   props: ['sendNori'],
   data() {
      return {
         thumbnail: '',
      };
   },
   methods: {
      contentsClick: function(target) {
         router.push({ name: 'ContentsView', params: { nori: target } });
      },
      tagSearch: function(tagName) {
         router.push({ name: 'SearchResult', params: { searchValue: tagName, type: 'tag' } });
         // this.$emit('tagEvent');
      },
   },
   mounted() {
      //이미지 없을 경우, 기본 이미지
      if (this.sendNori.thumb == null) {
         this.thumbnail = require('@/assets/cv-bg.png');
      } else {
         this.thumbnail = this.sendNori.thumb;
      }
   },
};
</script>

<style lang="scss">
@import '@/css/main/noriContent.scss';
</style>
