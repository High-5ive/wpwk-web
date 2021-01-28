<template>
  <div>
    <Article
      v-for="(article, idx) in articles"
      :key="idx"
      :article="article"
    />
  </div>
</template>

<script>
import Article from './Article'

export default {
  name: 'ArticleList',
  props: {
    articles: Array,
  },
  components: {
    Article
  },
  methods: {
    getSubject: function () {
      this.subject_final = this.subject
    }
  }
}
</script>

<style>
</style>