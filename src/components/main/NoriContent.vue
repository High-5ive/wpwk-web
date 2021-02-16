<template lang="">
   <!-- 전체 한 덩어리 -->
   <div class="content-wrapper rotate-in-2-bl-ccw">
      <!-- 이미지썸네일과 뱃지들 -->
      <div class="img-wrapper">
         <img :src="thumbnail" alt="" @click="contentsClick(sendNori)" />
         <!-- 이미지 위에 표시되는 뱃지들이 위치합니다 -->
         <div class="badge-cate">
            <!-- 1 : 접근성 -->
            <span v-if="eval_result != 0 && eval_result == 1" class="badge-eval acs">
               <v-icon>mdi-home-search-outline</v-icon>
               접근성</span
            >
            <!-- 2 : 흥미성 -->
            <span v-else-if="eval_result != 0 && eval_result == 2" class="badge-eval fun">
               <v-icon>mdi-heart-circle</v-icon>
               흥미성</span
            >
            <!-- 3 : 교육성 -->
            <span v-else-if="eval_result != 0 && eval_result == 3" class="badge-eval edu">
               <v-icon>mdi-head-lightbulb-outline</v-icon>
               교육성</span
            >
            <span v-for="(ability, idx) in sendNori.abilities" :key="idx" @click="categorySearch(ability)">
               {{ ability }}
            </span>
         </div>
         <div class="badge-time">{{ time }}</div>
      </div>

      <!-- 하단 설명글 -->
      <div class="desc-wrapper">
         <h1 @click="contentsClick(sendNori)">{{ sendNori.title }}</h1>
         <span v-for="(tag, idx) in sendNori.tagList" :key="'tag' + idx" @click="tagSearch(tag.name)"> #{{ tag.name }} </span>
         <h6 @click="$router.push({ name: 'mypage', params: { userId: sendNori.userId } })">{{ sendNori.nickname }}</h6>
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
         eval_result: 0,
         time: '',
         thumbnail: '',
         categories: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
      };
   },

   methods: {
      contentsClick: function(target) {
         router.push({ name: 'ContentsView', params: { id: target.id } });
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

      // 카테고리 정보와 시간값의 필터링이 적용됨
      calcEvalResult: function() {
         this.time = this.sendNori.spendTime.substr(0, 5);

         var acs = this.sendNori.evalAcs; // 1
         var fun = this.sendNori.evalFun; // 2
         var edu = this.sendNori.evalEdu; // 3

         if (acs + fun + edu == 0) {
            return;
         }

         if (acs >= fun) {
            if (acs >= edu) {
               // acs > fun, edu
               this.eval_result = 1;
            } else {
               // edu > acs > fun
               this.eval_result = 3;
            }
         } else {
            if (fun >= edu) {
               // fun > edu, acs
               this.eval_result = 2;
            } else {
               // edu > fun > acs
               this.eval_result = 3;
            }
         }
      },

      // 뱃지 이펙트는 포기
      //https://codepen.io/ChrisJohnson/pen/ZJXzgZ
      // badgeAnima: function() {
      //    var elem = document.querySelectorAll('.flip-container');
      //    console.log(elem);
      //    elem.forEach((item) => {
      //       item.addEventListener('click', () => {
      //          console.log('flip');
      //          document.querySelector('#flip-toggle').classList.toggle('flip');
      //       });
      //    });
      // },
   },

   mounted() {
      this.calcEvalResult();
      // this.badgeAnima();

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
