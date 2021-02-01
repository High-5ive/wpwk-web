<template>
  <div>
    <Article
      v-for="(article, idx) in selected_articles"
      :key="idx"
      :article="article"
      :subject_select="subject_select"
    />
  </div>
</template>

<script>
import Article from './Article'

export default {
  name: 'ArticleList',
  props: {
    articles: Array,
    subject_select: String,
  },
  data: function () {
    return {
      selected_articles: this.articles,
    }
  },
  components: {
    Article
  },
  methods: {
    getArticles: function () {
      for(var i=0; i<this.articles.length; i++) {
        if(this.articles[i].subject === this.subject_select) {
          this.selected_articles = []
          this.selected_articles.push(this.articles[i])
        }
      }
    },
  },
  created: function () {
    this.getArticles()
  },
  watch: {
    subject_select: function () {
      this.selected_articles = []
      this.getArticles()
    }
  }
}
</script>

<style>
</style>