<template>
  <div class="ad-container">
    <div class="article-wrapper">
      <div class="content-wrapper">
        <div class="category">
          {{ article.category }}
        </div>
        <div class="nickname nf nf-600">
          {{ article.writer }}
        </div>
        <div class="content nf">{{ article.content }}</div>
      </div>

      <div v-if="itemList.length">
        <div v-for="(item, idx) in itemList" :key="idx">
          <article-detail-photo :item="item" :idx="idx" class="photo" />
        </div>
      </div>

      <div class="feature-wrapper">
        <div class="likes-btn">
          <v-icon v-if="article.liked" color="red" @click="getLike">
            mdi-heart-multiple
          </v-icon>
          <v-icon v-else color="red" @click="getLike">
            mdi-heart-multiple-outline
          </v-icon>
          <span @click="getLike" class="nf"> 좋아요! </span>
        </div>
        <div class="info-btn">
          <v-icon style="color:rgb(171, 171, 171) ">
            mdi-comment-multiple-outline
          </v-icon>
          <div class="comment">
            <div v-if="comments" class="nf">댓글 {{ comments.length }}</div>
            <div v-else class="nf">
              댓글쓰기
            </div>
          </div>
          <v-icon style="color:rgb(255, 101, 101)"> mdi-account-heart </v-icon>
          <span>{{ article.likes }} </span>
        </div>
      </div>
    </div>

    <div class="comment-box">
      <comment-list :comments="comments" @deleteComment="deleteComment" />
    </div>
    <comment-form-cmmu @createComment="createComment" />
  </div>
</template>

<script>
import ArticleDetailPhoto from "@/components/Community/ArticleDetailPhoto";
import CommentFormCmmu from "@/components/Comment/CommentForm_cmmu.vue";
import CommentList from "@/components/Comment/CommentList.vue";
import { findBoardsById } from "@/api/community.js";
import {
  findBoardCommentsByBoardId,
  createBoardComment,
  removeBoardComment,
} from "@/api/communityComment.js";

export default {
  name: "ArticleDetail",
  components: {
    ArticleDetailPhoto,
    CommentList,
    CommentFormCmmu,
  },
  data: function() {
    return {
      itemList: [],
      comments: [],
      likeList: [],
      article: "",
      page: 1,
    };
  },
  methods: {
    getArticle: function() {
      findBoardsById(
        this.$route.params.articleId,
        (res) => {
          console.log(res.data);
          this.article = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getArticleComments: function() {
      this.comments = [];
      findBoardCommentsByBoardId(
        this.$route.params.articleId,
        this.page,
        (res) => {
          console.log(res.data);
          this.comments = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getLike: function() {
      if (this.like) {
        this.like = 0;
        // 좋아요 눌렀던 user 삭제
        // const deleteId = this.likeList.indexOf(user)
        const deleteId = this.likeList.indexOf("수진맘");
        this.likeList.splice(deleteId, 1);
      } else {
        this.like = 1;
        // 좋아요 누른 user 추가
        // this.likeList.push(user)
        this.likeList.push("수진맘");
      }
    },
    deleteComment: function(comment) {
      console.log(comment);
      removeBoardComment(
        comment.id,
        this.$route.params.articleId,        
        () => {
          alert("댓글이 삭제되었습니다.");
          this.getArticleComments();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    createComment: function(comment) {
      createBoardComment(
        this.$route.params.articleId,
        comment,
        () => {
          alert("댓글이 등록되었습니다.");
          this.getArticleComments();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  created: function() {
    this.getArticle();
    this.getArticleComments();
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/articleDetail.scss";
</style>
