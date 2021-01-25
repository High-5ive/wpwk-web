<template>
   <div class="container">
      여긴 메인 페이지 입니다! Nori 들이 이곳에 있습니다.
      <div v-for="(ctt, idx) in cttList" :key="idx">
         <nori-content></nori-content>
         <br />
      </div>
   </div>
</template>

<script>
import NoriContent from '@/components/main/Content.vue';
export default {
   components: {
      NoriContent,
   },
   data() {
      return {
         cttList: [
            {
               index: '3',
               title: 'sample',
            },
            {
               index: '3',
               title: 'sample',
            },
            {
               index: '3',
               title: 'sample',
            },
            {
               index: '3',
               title: 'sample',
            },
         ],
      };
   },
};
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
