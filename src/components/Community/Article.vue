<template>
   <div class="article-wrapper">
      <div class="content-wrapper" @click="articleDetail">
         <div v-if="this.article.itemList.length">
            <img @click="articleDetail" :src="img" />
         </div>
         <div class="category">
            {{ category }}
         </div>
         <div class="nickname nf nf-600">
            {{ nickname }}
         </div>
         <div class="content nf">{{ content }}</div>
      </div>

      <div class="feature-wrapper">
         <div class="likes-btn">
            <v-icon v-if="this.like" color="red" @click="getLike"> mdi-heart-multiple </v-icon>
            <v-icon v-else color="red" @click="getLike"> mdi-heart-multiple-outline </v-icon>
            <span @click="getLike" class="nf"> 좋아요! </span>
         </div>
         <div class="info-btn">
            <v-icon @click="articleDetail" style="color:rgb(171, 171, 171) "> mdi-comment-multiple-outline </v-icon>
            <div class="comment">
               <div v-if="this.comments.length" @click="articleDetail" class="nf">댓글 {{ this.comments.length }}</div>
               <div v-else @click="articleDetail" class="nf">
                  댓글쓰기
               </div>
            </div>
            <v-icon style="color:rgb(255, 101, 101)"> mdi-account-heart </v-icon> <span>{{ this.likeList.length }} </span>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Article',
   props: {
      article: Object,
      subject_select: String,
   },
   data: function() {
      return {
         category: '',
         img: '',
         content: '',
         // 임의의 articleId값 부여
         articleId: 0,
         like: 0,
         likeList: [],
         comments: [],
      };
   },
   methods: {
      getCard: function() {
         // 변수 수정 필요
         this.category = this.article.subject;
         this.nickname = '테스트명';
         if (this.article.itemList.length) {
            this.img = this.article.itemList[0].photo.preview;
         }
         this.content = this.article.content;
         this.likeList = this.article.likeList;
         this.comments = this.article.comments;
         // 좋아요 목록에 있는 지 체크
         for (var i = 0; i < this.likeList.length; i++) {
            if (this.likeList[i] === '수진맘') {
               this.like = 1;
            }
         }
      },
      articleDetail: function() {
         // 실제로는 id값만 보내서 article정보를 받지만 일단 모두 전달
         // this.$router.push({ name: 'articleDetail', params: { articleId: this.articleId }})
         this.articleId = 1;
         this.$router.push({ name: 'ArticleDetail', params: { articleId: this.articleId, article: this.article } });
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
   },
   created: function() {
      this.getCard();
   },
   watch: {
      subject_select: function() {
         this.getCard();
      },
   },
};
</script>

<style lang="scss"></style>
