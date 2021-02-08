<template>
   <div class="ad-container">
      <div class="article-wrapper">
         <div class="content-wrapper">
            <div class="category">
               {{ subject }}
            </div>
            <div class="nickname nf nf-600">
               {{ user }}
            </div>
            <div class="content nf">{{ content }}</div>
         </div>

         <div v-if="this.itemList.length">
            <div v-for="(item, idx) in itemList" :key="idx">
               <ArticleDetailPhoto :item="item" :idx="idx" class="photo" />
            </div>
         </div>

         <div class="feature-wrapper">
            <div class="likes-btn">
               <v-icon v-if="this.like" color="red" @click="getLike"> mdi-heart-multiple </v-icon>
               <v-icon v-else color="red" @click="getLike"> mdi-heart-multiple-outline </v-icon>
               <span @click="getLike" class="nf"> 좋아요! </span>
            </div>
            <div class="info-btn">
               <v-icon style="color:rgb(171, 171, 171) "> mdi-comment-multiple-outline </v-icon>
               <div class="comment">
                  <div v-if="this.comments.length" class="nf">댓글 {{ this.comments.length }}</div>
                  <div v-else class="nf">
                     댓글쓰기
                  </div>
               </div>
               <v-icon style="color:rgb(255, 101, 101)"> mdi-account-heart </v-icon> <span>{{ this.likeList.length }} </span>
            </div>
         </div>
      </div>

      <CommentList :comments="this.comments" @deleteComment="deleteComment" />
      <CommentForm @createComment="createComment" />
   </div>
</template>

<script>
import ArticleDetailPhoto from '@/components/Community/ArticleDetailPhoto';
import CommentList from '@/components/Comment/CommentList';
import CommentForm from '@/components/Comment/CommentForm';

export default {
   name: 'ArticleDetail',
   props: {
      // article의 모든 값 받아오기(추후에는 articleId값만 받아오면 됨)
      // articleId: Number,
      article: Object,
   },
   components: {
      ArticleDetailPhoto,
      CommentList,
      CommentForm,
   },
   data: function() {
      return {
         user: '',
         subject: '',
         itemList: [],
         content: '',
         comments: [],
         like: 0,
         likeList: [],
      };
   },
   methods: {
      getArticle: function() {
         this.user = this.$route.params.article.user;
         this.subject = this.$route.params.article.subject;
         this.content = this.$route.params.article.content;
         if (this.$route.params.article.itemList.length) {
            for (var i = 0; i < this.$route.params.article.itemList.length; i++) {
               this.itemList.push(this.$route.params.article.itemList[i]);
            }
         }
         this.likeList = this.$route.params.article.likeList;
         this.comments = this.$route.params.article.comments;
         // 좋아요 목록에 있는 지 체크
         for (var j = 0; j < this.likeList.length; j++) {
            if (this.likeList[j] === '수진맘') {
               this.like = 1;
            }
         }
      },
      getLike: function() {
         if (this.like) {
            this.like = 0;
            // 좋아요 눌렀던 user 삭제
            // const deleteId = this.likeList.indexOf(user)
            const deleteId = this.likeList.indexOf('수진맘');
            this.likeList.splice(deleteId, 1);
         } else {
            this.like = 1;
            // 좋아요 누른 user 추가
            // this.likeList.push(user)
            this.likeList.push('수진맘');
         }
      },
      deleteComment: function(comment) {
         const deleteId = this.comments.indexOf(comment);
         this.comments.splice(deleteId, 1);
      },
      createComment: function(comment) {
         this.comments.push(comment);
      },
   },
   created: function() {
      this.getArticle();
   },
};
</script>

<style lang="scss" scoped>
@import 'src/css/articleDetail.scss';
</style>
