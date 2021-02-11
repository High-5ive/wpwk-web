<template>
  <div class="article-wrapper">
    <div class="as-item-box" :class="{'for-stripe':!isEven(idx)}" v-for="(article, idx) in personsAssets" :key="idx" >
      <div class="as-left">
        <div class="as-content">{{ article.content | truncate(15, '...') }}</div>  
        <div class="as-info"><span v-if="showValue === 2">{{ article.user }}</span> {{ article.created_at | truncate(10, ' ') }} 조회 {{ article.views }}</div>
      </div>
      <div class="as-right">{{ article.comments.length }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personsAssets',
  props: {
    personsAssets: Array,
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