<template>
  <div class="report-wrapper">
    <div class="report-content-wrapper">
      <div class="reporter-creator">
        <div class="reporter">{{ this.reporter }}</div>
        <i class="fas fa-hand-point-right"></i>
        <div class="creator">{{ this.creator }}</div>

        <!-- modal로 신고 받은 페이지 띄우기 -->
        <div class="page">
          <!-- modal로 신고 받은 페이지 띄우기 -->
          <v-dialog v-model="dialog" persistent width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                rounded
                small
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                컨텐츠 확인
              </v-btn>
            </template>
            <div>
              <!-- 닫기 버튼 -->
              <v-btn color="red" dark rounded @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <iframe width="350px" height="620px" :src="url"> </iframe>
          </v-dialog>
        </div>
      </div>

      <div class="contents-title nf nf-600">
        {{ this.title }}
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
export default {
  name: 'ReportListItem',
  props: {
    report: Object,
  },
  data: function() {
    return {
      creator: '',
      reporter: '',
      title: '',
      contentsId: 0,
      comment: '',
      dialog: false,
      url: '',
      choose: '',
      done: '',
    };
  },
  methods: {
    getReport: function() {
      this.creator = this.report.creator;
      this.reporter = this.report.reporter;
      this.title = this.report.title;
      this.contentsId = this.report.contentsId;
      this.comment = this.report.comment;
      this.done = this.choose;
    },
    waitContents: function() {
      var wait = confirm('문제없음 처리 하시겠습니까?');
      if (wait) {
        this.choose = '문제없음';
      }
    },
    warnContents: function() {
      var warn = confirm('경고 처리 하시겠습니까?');
      if (warn) {
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
    },
  },
  created: function() {
    this.getReport();
    // 임의의 값 입력
    this.url = 'http://localhost:8080/view';
  },
  watch: {
    choose: function() {
      this.getReport();
    },
  },
  // computed: {
  //     getUrl: function () {
  //         // contentsId 받아서 해당 페이지 로드
  //         this.url = `http://localhost:8080/view/${this.contentsId}`
  //     }
  // }
};
</script>

<style scoped></style>
