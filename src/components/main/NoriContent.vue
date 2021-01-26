<template lang="">
   <div class="content-wrapper">
      <div class="img-wrapper">
         <img src="@/assets/img/test1.png" alt="" />
      </div>
      <div class="desc-wrapper">
         <p class="title">{{ sendNori.title }}</p>
         아이템 갯수 : {{ sendNori.itemList.length }}
         <p>{{ sendNori.time }}</p>
         <span v-for="(cate, idx) in sendNori.selectedCategories" :key="idx">
            {{ cate }}
         </span>
         <br />
         <span v-for="(tag, idx) in sendNori.hashtags" :key="'tag' + idx">
            {{ tag }}
         </span>
      </div>
   </div>
</template>

<script>
export default {
   name: 'NoriContent',
   props: ['sendNori'],
};
</script>

<style lang="scss">
@import '@/css/main/noriContent.scss';
</style>
