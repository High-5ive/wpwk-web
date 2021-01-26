<template>
   <div class="container">
      <ArticleList :articles="articles"/>

      <div>
    <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary"  fab dark v-bind="attrs" v-on="on">
           <v-icon> mdi-pencil </v-icon>
         </v-btn>
      </template>

      <v-card>
        <v-toolbar dark color="success">
        <!-- 닫기 버튼 -->
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>새 글 작성</v-toolbar-title>
        </v-toolbar>
        <ArticleForm @createArticle="createArticle" />
      </v-card>
    </v-dialog>
    </v-row>
  </div>

   </div>
</template>

<script>
import ArticleList from '@/components/Community/ArticleList'
import ArticleForm from '@/components/Community/ArticleForm'

export default {
   name: "community",
   components: {
      ArticleList,
      ArticleForm
   },
   data: function () {
      return {
         dialog: false,
         articles: [],
      }
   },
   methods: {
      createArticle: function (article) {
         this.dialog = false
         this.articles.push(article)
      }
   }
}
</script>

<style scoped>
</style>
