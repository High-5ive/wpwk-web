<template>
  <div class="nori-wrapper">
    <div :class="{'for-stripe': !isEven(idx)}" class="item-box" v-for="(nori, idx) in personsAssetsWithPhoto" :key="idx">
      <div class="asp-left">
        <img src="@/assets/img/test1.jpg" alt="">
      </div>
      <div class="asp-middle">
        <div>{{ nori.title | truncate( 12, '...') }}</div>
        <span v-if="showValue===4" class="asp-info">{{ nori.user }}</span>
        <div class="asp-info">{{ nori.createdAt }} 조회 {{ nori.views }}</div>
      </div>
      <div class="asp-right">
        {{ nori.comments.length}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personsAssetsWithPhoto',
  props: {
    personsAssetsWithPhoto: Array,
    showValue: Number
  },
  methods: {
    // 짝수인지(스트라이프 스타일링)
    isEven: function (idx) {
      if (idx % 2) {
        return false
      } else {
        return true
      }
    },
  }
}
</script>
<style lang="">
  
</style>