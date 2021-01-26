<template>
   <div class="container">
      <div v-for="(nori, idx) in NoriList" :key="idx">
         <nori-content :sendNori="nori"></nori-content>
         <br />
      </div>
   </div>
</template>

<script>
import NoriContent from '@/components/main/NoriContent.vue';

const dummyInsert = (list) => {
   const nori = {
      title: '테스트입니당',
      itemList: [1, 2],
      time: {
         hour: 2,
         minute: 0,
      },
      selectedCategories: ['공간지능', '수리지능'],
      hashtags: ['아이가참_좋아해', '간단간단'],
   };

   var i = 1;
   while (i++ < 5) {
      list.push(nori);
   }

   console.log(nori);
};

export default {
   components: {
      NoriContent,
   },
   data() {
      return {
         NoriList: [],
      };
   },
   created() {
      dummyInsert(this.NoriList);
   },
};
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
