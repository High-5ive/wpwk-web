<template>
  <div class="report-wrapper">
    <div class="report-content-wrapper">
      <div class="reporter-creator">
<<<<<<< HEAD
        <div class="reporter">{{ this.reporter }}</div>
        <i class="fas fa-hand-point-right"></i>
        <div class="creator">{{ this.creator }}</div>
=======
        <div class="reporter">{{ this.reporterNickname }}</div>
        님의 신고
        <i class="fas fa-hand-point-right"></i>
>>>>>>> feature-admin

        <!-- modal로 신고 받은 페이지 띄우기 -->
        <div class="page">
          <!-- modal로 신고 받은 페이지 띄우기 -->
          <v-dialog v-model="dialog" persistent width="400px">
<<<<<<< HEAD
            <template v-slot:activator="{ on, attrs }">
=======
            <template v-slot:activator="{ attrs }">
>>>>>>> feature-admin
              <v-btn
                outlined
                rounded
                small
                color="primary"
                v-bind="attrs"
<<<<<<< HEAD
                v-on="on"
=======
                @click="moveContents"
>>>>>>> feature-admin
              >
                컨텐츠 확인
              </v-btn>
            </template>
<<<<<<< HEAD
            <div>
              <!-- 닫기 버튼 -->
              <v-btn color="red" dark rounded @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <iframe width="350px" height="620px" :src="url"> </iframe>
=======
            <!-- <div>
              <v-btn color="red" dark rounded @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div> -->
            <!-- <iframe width="350px" height="620px" :src="url"> </iframe> -->
>>>>>>> feature-admin
          </v-dialog>
        </div>
      </div>

      <div class="contents-title nf nf-600">
<<<<<<< HEAD
        {{ this.title }}
=======
        {{ this.contents.title }}
>>>>>>> feature-admin
      </div>

      <div class="reason nf">신고 사유: {{ this.comment }}</div>

      <!-- 신고 처리 버튼 -->
      <div v-if="done" class="done nf nf-600">
        {{ this.choose }} 처리가 완료됐습니다.
      </div>
      <div v-else class="buttons">
        <v-btn outlined rounded small @click="waitContents"> 문제없음 </v-btn>
        <v-btn outlined rounded small @click="warnContents"> 경고 </v-btn>
        <v-btn outlined rounded small @click="deleteContents"> 삭제 </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { contentsReportUpdate } from '@/api/admin.js';
export default {
  name: 'ReportListItem',
  props: {
    report: Object,
  },
  data: function() {
    return {
<<<<<<< HEAD
      creator: '',
      reporter: '',
      title: '',
      contentsId: 0,
      comment: '',
=======
      reportId: 0,
      comment: '',
      status: '',
      reporterId: 0,
      reporterNickname: '',
      contents: Object,
      createdAt: '',
>>>>>>> feature-admin
      dialog: false,
      url: '',
      choose: '',
      done: '',
    };
  },
  methods: {
    getReport: function() {
<<<<<<< HEAD
      this.creator = this.report.creator;
      this.reporter = this.report.reporter;
      this.title = this.report.title;
      this.contentsId = this.report.contentsId;
      this.comment = this.report.comment;
      this.done = this.choose;
=======
      this.reportId = this.report.id;
      this.comment = this.report.comment;
      this.status = this.report.status;
      this.reporterId = this.report.reporterId;
      this.reporterNickname = this.report.reporterNickname;
      this.contents = this.report.contents;
      this.createdAt = this.report.createdAt;
>>>>>>> feature-admin
    },
    waitContents: function() {
      var wait = confirm('문제없음 처리 하시겠습니까?');
      if (wait) {
<<<<<<< HEAD
        this.choose = '문제없음';
      }
=======
        this.choose = 'CHECK';
      }
      var data = {
        status: this.choose,
        id: this.reportId,
      };

      contentsReportUpdate(
        data,
        (success) => {
          console.log('report 처리 성공', success);
        },
        (fail) => {
          console.log('report 처리 실패', fail);
        }
      );
>>>>>>> feature-admin
    },
    warnContents: function() {
      var warn = confirm('경고 처리 하시겠습니까?');
      if (warn) {
<<<<<<< HEAD
        this.choose = '경고';
      }
      // 게시글 작성자에게 경고 알림 전송
    },
    deleteContents: function() {
      var deleteC = confirm('삭제 처리 하시겠습니까?');
      if (deleteC) {
        this.choose = '삭제';
      }
      // 게시글 작성자에게 경고 알림 전송
=======
        this.choose = 'WARN';
      }
      // 게시글 작성자에게 경고 알림 전송
      var data = {
        status: this.choose,
        id: this.reportId,
      };

      contentsReportUpdate(
        data,
        (success) => {
          console.log('report 처리 성공', success);
        },
        (fail) => {
          console.log('report 처리 실패', fail);
        }
      );
    },
    deleteContents: function() {
      var deleteC = confirm('삭제 처리 하시겠습니까?');
      if (deleteC) {
        this.choose = 'DELETE';
      }
      // 게시글 작성자에게 경고 알림 전송
      var data = {
        status: this.choose,
        id: this.reportId,
      };

      contentsReportUpdate(
        data,
        (success) => {
          console.log('report 처리 성공', success);
        },
        (fail) => {
          console.log('report 처리 실패', fail);
        }
      );
    },
    moveContents: function() {
      this.$router.push({
        name: 'ContentsView',
        params: { nori: this.contents },
      });
>>>>>>> feature-admin
    },
  },
  created: function() {
    this.getReport();
<<<<<<< HEAD
    // 임의의 값 입력
    this.url = 'http://localhost:8080/view';
=======
>>>>>>> feature-admin
  },
  watch: {
    choose: function() {
      this.getReport();
    },
  },
<<<<<<< HEAD
=======

>>>>>>> feature-admin
  // computed: {
  //     getUrl: function () {
  //         // contentsId 받아서 해당 페이지 로드
  //         this.url = `http://localhost:8080/view/${this.contentsId}`
  //     }
  // }
};
</script>

<style scoped></style>
