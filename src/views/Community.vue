<template>
   <div class="container">
      <ArticleList />
   </div>
</template>

<script>
import ArticleList from '@/components/Community/ArticleList'

export default {
   name: "community",
   components: {
      ArticleList
   }
}
</script>

<style scoped>
.container {
   background-color: orange;
}
</style>
