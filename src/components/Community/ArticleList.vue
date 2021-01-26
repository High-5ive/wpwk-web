<template>
  <div>
      {{ articles }}
    <!-- <Article
      v-for="(article, idx) in articles"
      :key="idx"
      :article="article"
    /> -->
  </div>
</template>

<script>
// import Article from './Article'

export default {
  name: 'ArticleList',
  props: {
    articles: Array,
  },
//   components: {
//     Article
//   },
  methods: {
    getArticles: function () {
    }
  },
  created: function () {
    this.getArticles()
  }
}
</script>

<style>

</style>