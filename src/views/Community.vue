<template>
  <div class="cm-container">
    <v-select
      v-model="subject"
      :items="subjects"
      dense
      outlined
      hide-details
      class="ma-2 subject"
      label="주제"
    ></v-select>
    <article-list :articles="articles" :subject_select="subject" />
    <div class="nori-wrapper spinner">
      <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
        <div slot="no-more" class="nf">더 이상 컨텐츠가 없어요 :)</div>
      </infinite-loading>
    </div>
    <speed-dial @emit-create="createArticle"></speed-dial>
  </div>
</template>

<script>
import ArticleList from "@/components/Community/ArticleList";
import SpeedDial from "@/components/main/SpeedDial.vue";
import { findBoardsByPage, createBoard } from "@/api/community.js";
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
      subjects: [
        "전체보기",
        "맛집정보 나눔",
        "교육정보 나눔",
        "육아정보 나눔",
        "요리정보 나눔",
        "생활정보 나눔",
        "잡담",
      ],
      subject_select: "",
      subject: "",
      articleFromMain: "",
      page: 1,
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
    // getBoards() {
    //   this.articles = [];
    //   this.page = 1;
    //   findBoardsByPage(
    //     this.page,
    //     (res) => {
    //       console.log(res.data);
    //       this.articles = res.data;
    //       this.page += 1;
    //       this.loading = false;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // },

      // 무한 스크롤
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
      console.log("article : " + article.category);
      createBoard(
        article,
        () => {
          alert("게시 글 등록이 완료되었습니다.");
          this.getBoards();
        },
        (error) => {
          console.log(error);
        }
      );
      //
    },
  },
  created: function() {    
    // this.getBoards(); //생성되자마자 게시글 조회
  },
};
</script>

<style lang="scss">
@import 'src/css/community.scss';
</style>
