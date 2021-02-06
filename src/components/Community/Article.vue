<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <div v-if="this.article.itemList.length">
        <v-img @click="articleDetail" class="white--text align-end" height="200px" :src="img"> </v-img>
      </div>
      <v-card-subtitle @click="articleDetail" class="pb-0">
        {{ subject }}
      </v-card-subtitle>

      <v-card-text @click="articleDetail" class="text--primary">
          <div> {{ content }} </div>
      </v-card-text>

      <v-card-actions>
        <v-icon v-if="this.like" color="red" @click="getLike"> mdi-heart-multiple </v-icon>
        <v-icon v-else color="red" @click="getLike"> mdi-heart-multiple-outline </v-icon>
        {{ this.likeList.length }}
        <v-icon color="grey" @click="articleDetail"> mdi-comment-multiple-outline </v-icon> 댓글 {{ this.comments.length }}
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
            // 임의의 articleId값 부여
            articleId: 0,
            like: 0,
            likeList : [],
            comments: []
        }
    },
    methods: {
        getCard: function () {
          this.subject = this.article.subject
          if(this.article.itemList.length) {
            this.img = this.article.itemList[0].photo.preview
          }
          this.content = this.article.content
          this.likeList = this.article.likeList
          this.comments = this.article.comments
          // 좋아요 목록에 있는 지 체크
          for(var i=0; i<this.likeList.length; i++) {
            if(this.likeList[i] === "수진맘") {
              this.like = 1
            }
          }
        },
        articleDetail: function () {
          // 실제로는 id값만 보내서 article정보를 받지만 일단 모두 전달
          // this.$router.push({ name: 'articleDetail', params: { articleId: this.articleId }})
          this.articleId = 1
          this.$router.push({ name: 'ArticleDetail', params: { articleId: this.articleId, article: this.article }})
        },
        getLike: function () {
            if(this.like) {
                this.like = 0
                // 좋아요 눌렀던 user 삭제
                // const deleteId = this.likeList.indexOf(user)
                const deleteId = this.likeList.indexOf("수진맘")
                this.likeList.splice(deleteId, 1)
            }
            else {
                this.like = 1
                // 좋아요 누른 user 추가
                // this.likeList.push(user)
                this.likeList.push("수진맘")
            }
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