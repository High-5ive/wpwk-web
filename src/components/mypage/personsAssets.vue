<template>
  <div class="article-wrapper">
    <div v-for="(article, idx) in personsAssets" :key="idx" class="item-wrapper">
      <span class="d-inline-block text-truncate">{{ article.content }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personsAssets',
  props: {
    personsAssets: Array,
  }
}
</script>
<style lang="">
  
</style>