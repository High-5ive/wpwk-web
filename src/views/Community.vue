<template>
  <div class="container">
    <div v-if="loading">
      <loading></loading>
    </div>
    <v-select
      v-model="subject"
      :items="subjects"
      dense
      outlined
      hide-details
      class="ma-2 subject"
      label="주제"
      @change="getSubject"
    ></v-select>
    <article-list :articles="articles" :subject_select="subject_select" />
    <div class="nori-wrapper spinner">
      <infinite-loading spinner="spiral" @infinite="infiniteHandler">
        <div slot="no-more" class="nf">더 이상 컨텐츠가 없어요 :)</div>
      </infinite-loading>
    </div>
    <speed-dial @emit-create="createArticle"></speed-dial>
  </div>
</template>

<script>
import ArticleList from "@/components/Community/ArticleList";
import SpeedDial from "@/components/main/SpeedDial.vue";
import { findBoardsByPage } from "@/api/community.js";
import infiniteLoading from "vue-infinite-loading";

export default {
  name: "community",
  components: {
    ArticleList,
    SpeedDial,
    infiniteLoading,
  },
  props: {
    createdArticle: Object,
  },
  data: function() {
    return {
      dialog: false,
      articles: [], //게시글들이 모여있는 리스트
      subjects: ["All", "동네정보", "육아정보", "잡담"],
      subject_select: "",
      subject: "",
      articleFromMain: "",
      page: 1,
      loading: true,
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
    getBoards() {
      console.log("커뮤니티 게시글 전체 조회");

      findBoardsByPage(
        this.page,
        (res) => {
          // console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            const data = res.data[i];

            const article = {
              id: data.id,
              content: data.content,
              writer: data.writer,
              likes: data.likes,
              subject: data.category, // 변수명 변경
              comments: data.comments,
              createdAt: data.createdAt,
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

    // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
    infiniteHandler($state) {
      findBoardsByPage(
        this.page,
        (res) => {
          setTimeout(() => {
            if (res.data.length) {
              var articleList = res.data;

              this.articles = this.articles.concat(articleList);
              $state.loaded();
              this.page += 1;
              if (this.articles.length / 10 == 0) {
                $state.complete();
              }
            } else {
              $state.complete();
            }
          }, 1000);
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
    this.getBoards(); //생성되자마자 게시글 조회
  },
  mounted() {
    // this.articleFromMain = this.$route.params.createdArticle;
  },
};
</script>

<style lang="scss">
@import "src/css/community.scss";
</style>
