<template>
   <div class="container">
      <v-select
        v-model="subject"
        :items="subjects"
        dense
        outlined
        hide-details
        class="ma-2 subject"
        label="subject"
        @change ="getSubject"
      ></v-select>
      <ArticleList :articles="articles" :subject_select="subject_select"/>
      <div>
    <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="write" color="primary"  fab dark v-bind="attrs" v-on="on">
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
         subjects: ['동네맛집', '동네카페', '아이교육/학원', '살림/청소/정리'],
         subject_select: '',
         subject: ''
      }
   },
   methods: {
      createArticle: function (article) {
         this.dialog = false
         this.articles.push(article)
      },
      getSubject: function () {
         this.subject_select = this.subject
      },
   }
}
</script>

<style scoped>
.write {
   position: fixed;
   top: 500px;
   right: 100px;
}
.subject {
  position: fixed;
  top: 70px;
}
</style>
