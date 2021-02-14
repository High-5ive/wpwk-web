<template>
  <div class="cv-container">
    <!-- evaluation값에 따라 페이지 변환 -->
    <!-- 평가페이지 -->
    <div v-if="evaluationValue">
      <!-- <v-icon @click="back">
            mdi-backup-restore
         </v-icon> -->
      <Evaluations @evaluationPage="evaluation" :contentsInfo="contents" />
    </div>

    <!-- 카드페이지 -->
    <div v-else class="cv-card-wrapper">
      <div class="card-top-wrapper">
        <p class="title nf">{{ this.title }}</p>
        <p class="writer nf">{{ this.writer }}</p>
      </div>

      <CardList :cards="cards" @evaluationPage="evaluation" />
    </div>

    <!-- 댓글창 전체 모달 -->
    <div class="comment-modal">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <!-- 댓글 모달창을 여는 댓글 버튼 -->
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              id="btn-comment"
              color="success"
              dark
              v-bind="attrs"
              v-on="on"
            >
              mdi-comment-text-multiple-outline
            </v-icon>
          </template>

          <!-- 화면 전체를 뒤덮는 모달 -->
          <v-card id="comment-box">
            <div class="close-btn" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </div>

            <img
              class="wp-face"
              src="@/assets/img/characters/comment_wp1.png"
            />
            <img
              class="wp-hand"
              src="@/assets/img/characters/comment_wp2.png"
            />

            <div class="cm-wrapper">
              <CommentList
                :comments="this.comments"
                @updateComment="updateComment"
                @deleteComment="deleteComment"
              />
            </div>
            <CommentForm :contents="contents" @createComment="createComment" />
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <!-- 댓글창 끝 -->
  </div>
</template>

<script>
import CardList from '@/components/ContentsView/CardList';
import Evaluations from '@/components/ContentsView/Evaluations';
import CommentList from '@/components/Comment/CommentList';
import CommentForm from '@/components/Comment/CommentForm';
import { findContentsItemById } from '@/api/contents.js';
import { findContentsComment } from '@/api/contents.js';
import { deleteContentsComment } from '@/api/contents.js';
import { updateContentsComment } from '@/api/contents.js';
import { createContentsComment } from '@/api/contents.js';

export default {
  name: 'ContentsView',
  components: {
    CardList,
    Evaluations,
    CommentList,
    CommentForm,
  },
  data: function() {
    return {
      cards: Array,
      title: '',
      writer: '',
      evaluationValue: false,
      dialog: false,
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

      deleteContentsComment(
        comment.id,
        (success) => {
          alert('댓글을 삭제 했습니다.');
          console.log('댓글을 삭제 succ.', success);
        },
        (fail) => {
          console.log('댓글을 삭제 fail.', fail);
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
          alert('댓글 수정을 완료 했습니다.');
        },
        (fail) => {
          console.log(fail);
          alert('댓글을 수정하는데 실패 했습니다.');
        }
      );
    },

    createComment: function(comment) {
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
      var contents = this.$route.params.nori;
      this.contents = contents;
      console.log(contents);
      this.writer = contents.nickname;
      this.title = contents.title;
      var contentsId = contents.id;

      findContentsItemById(
        contentsId,
        (success) => {
          console.log('get ContentsItem suc ', success.data);
          this.cards = success.data;
        },
        (fail) => {
          console.log('get ContentsItem fail ', fail);
        }
      );

      findContentsComment(
        contentsId,
        (success) => {
          console.log('get Contents Comments success', success.data);
          this.comments = success.data;
        },
        (fail) => {
          console.log('get Contents Comment fail', fail);
        }
      );
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
@import 'src/css/contentsView.scss';
</style>
