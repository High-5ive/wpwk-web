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

const dummyInsert = (list) => {
   const nori = {
      idx: 0,
      title: '아빠와 함께하는 레고 블럭 놀이!',
      itemList: [1, 2],
      time: {
         hour: 2,
         minute: 0,
      },
      selectedCategories: ['공간지능', '수리지능'],
      hashtags: ['아이가참_좋아해', '간단간단'],
   };

   var i = 1;
   while (i++ < 4) {
      list.push(nori);
   }
};

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
      dummyInsert(this.NoriList);
   },
   methods: {
      goCreate: function() {
         this.$router.push({ name: 'ContentsCreate' });
      },
   },
};
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
