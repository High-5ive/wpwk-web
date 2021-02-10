<template>
   <div class="container">
      <!-- <p>{{ articleFromMain }}</p> -->
      <v-select v-model="subject" :items="subjects" dense outlined hide-details class="ma-2 subject" label="주제" @change="getSubject"></v-select>
      <ArticleList :articles="articles" :subject_select="subject_select" />
      <speed-dial @emit-create="createArticle"></speed-dial>
   </div>
</template>

<script>
import ArticleList from '@/components/Community/ArticleList';
import SpeedDial from '@/components/main/SpeedDial.vue';
import { findAllBoards } from '@/api/community.js';

// 임의의 articleList
// const articleList = [
//    {
//       user: '한솔맘',
//       subject: '동네맛집',
//       itemList: [],
//       content: '아이들과 가기 좋은 연남동 맛집 추천해주세요~*^^*',
//       created_at: '2021-02-01 11:15:23',
//       likeList: ['주상맘', '태성맘'],
//       comments: [{ user: '태성맘', content: '해피치즈스마일이라고 떡볶이 안맵고 맛있더라구요~', created_at: '2021-02-05 11:00:32' }],
//    },
//    {
//       user: '주상맘',
//       subject: '아이교육/학원',
//       itemList: [],
//       content: '아이 예절 교육은 어떻게 시키시나요? 아이가 계속 유튜브만 보려고 하네요...',
//       created_at: '2021-02-01 11:15:23',
//       likeList: [],
//       comments: [],
//    },
// ];

export default {
   name: 'community',
   components: {
      ArticleList,
      SpeedDial,
   },
   props: {
      createdArticle: Object,
   },
   data: function() {
      return {
         dialog: false,
         articles: [], //게시글들이 모여있는 리스트
         subjects: ['All', '동네정보', '육아정보', '잡담'],
         subject_select: '',
         subject: '',

         articleFromMain: '',
      };
   },
   watch: {
      // articleFromMain: function() {
      //    if (this.articleFromMain !== '') {
      //       this.createArticle(this.articleFromMain);
      //    }
      // },
   },
   methods: {
      //============= axios =============
      getAllBoards() {
         console.log('커뮤니티 게시글 전체 조회');

         findAllBoards(
            (res) => {
               // console.log(res);
               for (let i = 0; i < res.data.length; i++) {
                  const data = res.data[i];

                  const article = {
                     id: data.id,
                     content: data.content,
                     user: data.writer,
                     likes: data.likes,
                     subject: data.category, // 변수명 변경
                     comments: data.comments,
                     created_at: data.createdAt,
                  };

                  // console.log('생성된 데이터 : ', article);
                  this.articles.push(article);
               }
               // console.log(this.article);
            },
            (error) => {
               console.log(error);
            }
         );
      },
      //====================================

      createArticle: function(article) {
         console.log(article);
         this.articles.push(article);
      },

      getSubject: function() {
         this.subject_select = this.subject;
      },
   },
   created: function() {
      // this.articles = articleList;
      this.getAllBoards(); //생성되자마자 게시글 조회
   },
   mounted() {
      // this.articleFromMain = this.$route.params.createdArticle;
   },
};
</script>

<style lang="scss">
@import 'src/css/community.scss';
</style>
