<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <div v-if="this.article.itemList.length">
        <v-img class="white--text align-end" height="200px" :src="img"> </v-img>
      </div>
      <v-card-subtitle class="pb-0">
        {{ subject }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
          <div> {{ content }} </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text> 좋아요 </v-btn>
        <v-btn color="orange" text> 댓글 </v-btn>
      </v-card-actions>
    </v-card>
    <br>
  </div>
</template>

<script>
export default {
    name: "Article",
    props: {
        article: Object,
        subject_select: String,
    },
    data: function () {
        return {
            subject: '',
            img : '' ,
            content : '',
        }
    },
    methods: {
        getCard: function () {
          if(this.article.itemList.length) {
            this.img = this.article.itemList[0].photo.preview
          }
            this.content = this.article.content
            this.subject = this.article.subject
        },
    },
    created: function () {
        this.getCard()
    },
    watch: {
      subject_select: function () {
        this.getCard()
      }
    }
}
</script>

<style scoped>
</style>