<template>
   <div class="article-wrapper">
      <div class="content-wrapper" @click="articleDetail">
         <div v-if="this.article.itemList.length">
            <img
               @click="articleDetail"
               src="data:image/png;base64,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"
            />
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
