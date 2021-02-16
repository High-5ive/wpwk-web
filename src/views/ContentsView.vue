<template>
  <div class="cv-container">
    <!-- evaluation값에 따라 페이지 변환 -->
    <!-- 평가페이지 -->
    <div v-if="evaluationValue">
      <Evaluations @evaluationPage="evaluation" :contentsInfo="contents" />
    </div>

    <!-- 카드페이지 -->
    <div v-else class="cv-card-wrapper">
      <div class="card-top-option">
        <div
          v-if="userInfo.userId == contents.userId"
          class="dots"
          @click="menuToggle"
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </div>
        <div v-if="menu" aria-expanded="false" class="dropdown-menu">
          <div class="menu-detail" @click="editContent">
            <v-icon>mdi-tooltip-edit-outline</v-icon>
            <span>노리 수정하기</span>
          </div>
          <div class="menu-detail" @click="deleteContent">
            <v-icon>mdi-delete-forever</v-icon>
            <span>노리 삭제하기</span>
          </div>
        </div>
      </div>
      <div class="card-top-wrapper">
        <p class="title nf">{{ contents.title }}</p>
        <p class="writer nf">{{ contents.nickname }}</p>
      </div>

      <CardList :cards="cards" @evaluationPage="evaluation" />
    </div>

    <!-- 댓글창 전체 모달 -->
    <div class="comment-modal" style="position: absolute;">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          style="position: absolute;"
        >
          <!-- 댓글 모달창을 여는 댓글 버튼 -->
          <template v-slot:activator="{ on, attrs }">
            <v-icon id="btn-comment" v-bind="attrs" v-on="on">
              mdi-comment-text-multiple-outline
            </v-icon>
          </template>

          <!-- 화면 전체를 뒤덮는 모달 -->
          <v-card id="comment-box">
            <img
              class="wp-face"
              src="@/assets/img/characters/comment_wp1.png"
            />
            <img
              class="wp-hand"
              src="@/assets/img/characters/comment_wp2.png"
            />

            <div class="cm-wrapper">
              <ContentsCommentList
                :comments="comments"
                @deleteComment="deleteComment"
                @updateComment="updateComment"
              />
            </div>
            <comment-form-view
              :contents="contents"
              @createComment="createComment"
              @emit-close="closeModal"
            />
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <!-- 댓글창 끝 -->
  </div>
</template>

<script>
import CardList from "@/components/ContentsView/CardList";
import Evaluations from "@/components/ContentsView/Evaluations";
import ContentsCommentList from "@/components/Comment/ContentsCommentList";
import CommentFormView from "../components/Comment/CommentForm_view.vue";
import { findContentsItemById } from "@/api/contents.js";
import { findContentsComment } from "@/api/contents.js";
import { deleteContentsComment } from "@/api/contents.js";
import { updateContentsComment } from "@/api/contents.js";
import { createContentsComment } from "@/api/contents.js";
import { findContentsById } from "@/api/contents.js";
import { mapState } from "vuex";

export default {
  name: "ContentsView",
  components: {
    CardList,
    Evaluations,
    ContentsCommentList,
    CommentFormView,
  },
  data: function() {
    return {
      cards: Array,
      evaluationValue: false,
      dialog: false,
      menu: false,
      comments: [],
      time: {
        hour: 0,
        minute: 0,
      },
      selectedCategories: [],
      hashtags: [],
      contents: Object,
    };
  },
  created() {
    //컨텐츠 ID 에 맞는 ItemList axios 호출
    this.getContentsItems();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    evaluation(value) {
      this.evaluationValue = value;
    },
    back: function() {
      this.evaluationValue = false;
      this.$router.go(this.$router.currentRoute);
    },
    deleteComment: function(comment) {
      const deleteId = this.comments.indexOf(comment);
      this.comments.splice(deleteId, 1);
      console.log("deleteComment", deleteId);

      deleteContentsComment(
        comment.id,
        (success) => {
          alert("댓글을 삭제 했습니다.");
          console.log("댓글을 삭제 succ.", success);
        },
        (fail) => {
          console.log("댓글을 삭제 fail.", fail);
        }
      );
    },
    updateComment: function(comment) {
      var data = {
        commentId: comment.id,
        comment: comment.comment,
      };

      updateContentsComment(
        data,
        (success) => {
          console.log(success);
          alert("댓글 수정을 완료 했습니다.");
        },
        (fail) => {
          console.log(fail);
          alert("댓글을 수정하는데 실패 했습니다.");
        }
      );
    },

    createComment: function(comment) {
      console.log(comment);

      this.comments.push(comment);
      createContentsComment(
        comment,
        (success) => {
          console.log(success);
        },
        (fail) => {
          console.log(fail);
        }
      );
    },

    getContentsItems: function() {
      var contentsId = this.$route.params.id;
      findContentsById(
        contentsId,
        (success) => {
          this.contents = success.data;
        },
        (fail) => {
          console.log(fail);
        }
      );

      findContentsItemById(
        contentsId,
        (success) => {
          //console.log('get ContentsItem suc ', success.data);
          this.cards = success.data;
        },
        (fail) => {
          console.log("get ContentsItem fail ", fail);
        }
      );

      findContentsComment(
        contentsId,
        (success) => {
          //console.log('get Contents Comments success', success.data);
          this.comments = success.data;
        },
        (fail) => {
          console.log("get Contents Comment fail", fail);
        }
      );
    },

    // 현재 떠있는 댓글창을 닫기
    closeModal() {
      this.dialog = false;
    },

    menuToggle: function() {
      this.menu = this.menu == false ? true : false;
    },

    editContent: function() {
      this.$router.push({name:'ContentsUpdate', params: this.contents.id});
    },
  },

  watch: {
    evaluationValue: function() {
      this.cards = [];
      this.getContentsItems();
    },
  },
};
</script>

<style lang="scss">
@import "src/css/contentsView.scss";
</style>
