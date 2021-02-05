<template>
   <div class="container">
      <div class="nori-wrapper" v-for="(nori, idx) in NoriList" :key="idx">
         <nori-content :sendNori="nori"></nori-content>
         <br />
      </div>
      <speed-dial></speed-dial>
   </div>
</template>

<script>
import NoriContent from '@/components/main/NoriContent.vue';
import SpeedDial from '@/components/main/SpeedDial.vue';

export default {
   components: {
      NoriContent,
      SpeedDial,
   },
   data() {
      return {
         NoriList: [],
      };
   },
   created() {
      this.dummyInsert();
   },
   methods: {
      goCreate: function() {
         this.$router.push({ name: 'ContentsCreate' });
      },

      dummyInsert: function() {
         const nori = [
            {
               idx: 0,
               img: require('@/assets/img/test2.jpg'),
               title: '아빠와 함께하는 레고 블럭 놀이!',
               writer: '돈암동슈퍼대디',
               itemList: [1, 2],
               time: {
                  hour: 2,
                  minute: 0,
               },
               selectedCategories: ['공간지능', '수리지능'],
               hashtags: ['아이가참_좋아해', '간단간단'],
            },
            {
               idx: 1,
               img: require('@/assets/img/test3.jpg'),
               title: '아이 창의력 키우는, 손바닥 물감 놀이! FUN!',
               writer: '도곡동슈퍼맘',
               itemList: [1, 2],
               time: {
                  hour: 2,
                  minute: 0,
               },
               selectedCategories: ['개인내지능', '활동지능'],
               hashtags: ['엄마가_더_좋아해', '영유아_추천', '간단해요'],
            },
            {
               idx: 2,
               img: require('@/assets/img/test1.jpg'),
               title: '노는게 제일좋아! 뽀로로 추천 에피소드!',
               writer: '알파카사랑해',
               itemList: [1, 2],
               time: {
                  hour: 2,
                  minute: 0,
               },
               selectedCategories: ['놀이지능'],
               hashtags: ['4시간_뚝딱', '즐거운_뽀로로'],
            },
         ];

         this.NoriList = nori;
      },
   },
};
</script>

<style lang="scss"></style>
