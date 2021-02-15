<template>
  <div class="article-wrapper">
    <div class="content-wrapper" @click="articleDetail">
      <!-- 사진 표시 임시 제외 -->
      <!-- <div v-if="this.article.itemList.length">
            <img @click="articleDetail" :src="img" />
         </div> -->
      <div class="category">
        {{ article.category }}
      </div>
      <div class="nickname nf nf-600">
        {{ article.writer }}
      </div>
      <div class="content nf">{{ article.content }}</div>
    </div>

    <div class="feature-wrapper">
      <!-- 좋아요 버튼 -->
      <div class="likes-btn" @click="setLike">
        <v-icon v-if="article.liked" color="red"> mdi-heart-multiple </v-icon>
        <v-icon v-else color="red"> mdi-heart-multiple-outline </v-icon>
        <span class="nf"> 좋아요! </span>
      </div>
      <!-- 게시글 상세보기 -->
      <div class="info-btn">
        <v-icon @click="articleDetail" color="#a2d646">
          mdi-comment-multiple-outline
        </v-icon>
        <div class="comment">
          <div v-if="article.comments != 0" @click="articleDetail" class="nf">
            댓글 {{ article.comments }}
          </div>
          <div v-else @click="articleDetail" class="nf">
            댓글쓰기
          </div>
        </div>
        <v-icon style="color:rgb(255, 101, 101)"> mdi-account-heart </v-icon>
        <span>{{ article.likes }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { updateLikes, cancelLikes } from "@/api/community.js";

export default {
  name: "Article",
  props: {
    article: Object,
    subject_select: String,
  },
  data: function() {
    return {
    };
  },
  methods: {
   //  getCard: function() {
   //    // console.log(this.article);
   //    this.articleId = this.article.id;
   //    this.category = this.article.category;
   //    this.writer = this.article.writer;
   //    this.content = this.article.content;
   //    this.likes = this.article.likes;
   //    this.comments = this.article.comments;
   //    // if (this.article.itemList.length) {
   //    //    this.img = this.article.itemList[0].photo.preview;
   //    // }

   //    // 좋아요 목록에 있는 지 체크
   //    // [err] 좋아요 목록 데이터 수정
   //    // for (var i = 0; i < this.likeList.length; i++) {
   //    //    if (this.likeList[i] === '수진맘') {
   //    //       this.like = 1;
   //    //    }
   //    // }
   //  },
    articleDetail: function() {
      // 실제로는 id값만 보내서 article정보를 받지만 일단 모두 전달
      // this.$router.push({ name: 'articleDetail', params: { articleId: this.articleId }})
      this.$router.push({
        name: "ArticleDetail",
        params: { articleId: this.article.id },
      });
    },

    //============= axios =============
    // 좋아요 수 수정
    setLike: function() {
      if (!this.article.liked) {
        updateLikes(
          { id: this.article.id },
          () => {
            this.article.liked = true;
            this.article.likes += 1;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.article.liked = true;
        cancelLikes(
          this.article.id,
          () => {
            this.article.liked = false;
            this.article.likes -= 1;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },

    //====================================
  },
  created: function() {
    // this.getCard();
  },
//   watch: {
//     subject_select: function() {
//       this.getCard();
//     },
//   },
};
</script>

<style lang="scss"></style>
