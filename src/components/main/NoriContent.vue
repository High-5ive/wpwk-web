<template lang="">
   <!-- 전체 한 덩어리 -->
   <div class="content-wrapper">
      <!-- 이미지썸네일과 뱃지들 -->
      <div class="img-wrapper">
         <img src="@/assets/img/test2.jpg" alt="" />
         <!-- 이미지 위에 표시되는 뱃지들이 위치합니다 -->
         <!-- <div class="itemLength">{{ sendNori.itemList.length }}</div> -->
         <div class="badge-cate">
            <span v-for="(cate, idx) in sendNori.selectedCategories" :key="idx">
               {{ cate }}
            </span>
         </div>
      </div>

      <!-- 하단 설명글 -->
      <div class="desc-wrapper">
         <h1>{{ sendNori.title }}</h1>
         <span v-for="(tag, idx) in sendNori.hashtags" :key="'tag' + idx"> #{{ tag }} </span>
         <h6>Writer</h6>
         <div class="btn-like">
            <v-icon>
               mdi-heart
            </v-icon>
         </div>
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
