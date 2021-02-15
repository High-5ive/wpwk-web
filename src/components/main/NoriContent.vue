<template lang="">
   <!-- 전체 한 덩어리 -->
   <div class="content-wrapper">
      <!-- 이미지썸네일과 뱃지들 -->
      <div class="img-wrapper">
         <img :src="thumbnail" alt="" @click="contentsClick(sendNori)" />
         <!-- 이미지 위에 표시되는 뱃지들이 위치합니다 -->
         <!-- <div class="itemLength">{{ sendNori.itemList.length }}</div> -->
         <div class="badge-cate">
            <span class="badge-eval">{{ sendNori.evalAcs }}</span>
            <span v-for="(ability, idx) in sendNori.abilities" :key="idx" @click="categorySearch(ability)">
               {{ ability }}
            </span>
         </div>
      </div>

      <!-- 하단 설명글 -->
      <div class="desc-wrapper">
         <h1>{{ sendNori.title }}</h1>
         <span v-for="(tag, idx) in sendNori.tagList" :key="'tag' + idx" @click="tagSearch(tag.name)"> #{{ tag.name }} </span>
         <h6>{{ sendNori.nickname }}</h6>
         <div v-if="sendNori.favorite" class="btn-like" @click="doUnLike">
            <v-icon>
               mdi-heart
            </v-icon>
         </div>
         <div v-if="!sendNori.favorite" class="btn-unlike" @click="doLike">
            <v-icon>
               mdi-heart
            </v-icon>
         </div>
      </div>
   </div>
</template>

<script>
import router from '../../router/router';
import { favoriteContents, unFavoriteContents } from '@/api/contents.js';

export default {
   name: 'NoriContent',
   props: ['sendNori'],
   data() {
      return {
         eval: ['쉽게 할 수 있어요', '아이들이 좋아해요', '교육적이에요'],
         thumbnail: '',
         categories: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
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
      categorySearch: function(category) {
         for (var i = 0; i < this.categories.length; i++) {
            if (category === this.categories[i]) {
               this.$router.push({ name: 'SearchResult', params: { searchValue: i + 1, type: 'category' } });
            }
         }
      },
      doLike: function() {
         var id = {
            id: this.sendNori.id,
         };

         favoriteContents(
            id,
            () => {
               this.sendNori.favorite = true;
            },
            (err) => {
               console.log(err);
            }
         );
      },
      doUnLike: function() {
         unFavoriteContents(
            this.sendNori.id,
            () => {
               this.sendNori.favorite = false;
            },
            (err) => {
               console.log(err);
            }
         );
      },
   },

   mounted() {
      console.log(this.sendNori);

      //이미지 없을 경우, 기본 이미지
      if (this.sendNori.thumb == null) {
         this.thumbnail = require('@/assets/img/characters/wpwk-default.png');
      } else {
         this.thumbnail = this.sendNori.thumb;
      }
   },

   watch: {
      sendNori: function() {
         if (this.sendNori.thumb == null) {
            this.thumbnail = require('@/assets/cv-bg.png');
         } else {
            this.thumbnail = this.sendNori.thumb;
         }
      },
   },
};
</script>

<style lang="scss">
@import '@/css/main/noriContent.scss';
</style>
