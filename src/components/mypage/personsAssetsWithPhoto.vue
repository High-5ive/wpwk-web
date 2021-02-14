<template>
  <div class="nori-wrapper">
    <span>
      {{ this.personsAssetsWithPhoto.length }} 개의 데이터를 찾았습니다.</span
    >
    <div
      :class="{ 'for-stripe': !isEven(idx) }"
      class="item-box"
      v-for="(nori, idx) in personsAssetsWithPhoto"
      :key="idx"
      @click="moveContents(idx)"
    >
      <div class="asp-left">
        <img :src="nori.thumb" alt="" />
      </div>
      <div class="asp-middle">
        <div>{{ nori.title | truncate(12, '...') }}</div>
        <span v-if="showValue === 4" class="asp-info">{{ nori.nickname }}</span>
        <div class="asp-info">{{ nori.createdAt }} 조회 {{ nori.views }}</div>
      </div>
      <div class="asp-right">
        <v-icon>mdi-arrow-right</v-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personsAssetsWithPhoto',
  props: {
    personsAssetsWithPhoto: Array,
    showValue: Number,
  },
  methods: {
    // 짝수인지(스트라이프 스타일링)
    isEven: function(idx) {
      if (idx % 2) {
        return false;
      } else {
        return true;
      }
    },
    moveContents: function(idx) {
      this.$router.push({
        name: 'ContentsView',
        params: {
          nori: this.personsAssetsWithPhoto[idx],
        },
      });
    },
  },
};
</script>
<style lang=""></style>
