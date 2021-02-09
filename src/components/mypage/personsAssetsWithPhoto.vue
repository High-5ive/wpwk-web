<template>
  <div class="nori-wrapper">
    <div class="item-box" v-for="(nori, idx) in personsAssetsWithPhoto" :key="idx">
      <div class="left">
        <img src="@/assets/img/test1.jpg" alt="">
      </div>
      <div class="middle">
        <div>{{ nori.title | truncate(15, '...') }}</div>
        <div>{{ nori.createdAt }} 조회수{{ nori.views }}</div>
      </div>
      <div class="right">
        {{ nori.comments.length}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personsAssetsWithPhoto',
  props: {
    personsAssetsWithPhoto: Array
  }
}
</script>
<style lang="">
  
</style>