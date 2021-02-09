<template>
  <div class="article-wrapper">
    <div class="item-box" v-for="(article, idx) in personsAssets" :key="idx" >
      <div class="left">
        <div>{{ article.content | truncate(15, '...') }}</div>  
        <div>{{ article.created_at }} 조회수{{ article.views }}</div>
      </div>
      <div class="right">{{ article.comments.length }}</div>
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