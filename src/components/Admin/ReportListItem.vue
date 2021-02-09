<template>
    <div>
        <v-card>
            <div> 신고자: {{ this.reporter }} </div>
            <div> 노리 제작자: {{ this.creator }} </div>
            <v-card-subtitle>
                {{ this.title }}
            </v-card-subtitle>
            <v-text>
                신고 사유: {{ this.reason }}
            </v-text>
            <v-card-actions>
                <!-- modal로 신고 받은 페이지 띄우기 -->
                <v-dialog v-model="dialog" persistent width="400px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text v-bind="attrs" v-on="on"> 컨텐츠 확인 </v-btn>
                </template>
                <v-card>
                    <v-toolbar dark>
                     <!-- 닫기 버튼 -->
                    <v-btn icon dark @click="dialog = false"> <v-icon>mdi-close</v-icon> </v-btn>
                    <v-toolbar-title>신고한 컨텐츠 확인</v-toolbar-title>
                    </v-toolbar>

                    <iframe width="400px" height="600px" :src="url"> </iframe>
                </v-card>
                </v-dialog>
                <div v-if="done"> {{ this.choose }} 처리가 완료됐습니다. </div>
                <div v-else>
                    <v-btn outlined @click="waitContents"> 문제없음 </v-btn>
                    <v-btn outlined @click="warnContents"> 경고 </v-btn>
                    <v-btn outlined @click="deleteContents"> 삭제 </v-btn>
                </div>
            </v-card-actions>
        </v-card>
        <hr>
    </div>
</template>

<script>
export default {
    name: "ReportListItem",
    props: {
        report: Object,
    },
    data: function () {
        return {
            creator: "",
            reporter: "",
            title: "",
            viewId: 0,
            reason: "",
            dialog: false,
            url: "",
            choose : "",
            done: ""
        }
    },
    methods: {
        getReport: function () {
            this.creator = this.report.creator
            this.reporter = this.report.reporter
            this.title = this.report.title
            this.viewId = this.report.viewId
            this.reason = this.report.reason
            this.done = this.choose
        },
        waitContents: function () {
            var wait = confirm('문제없음 처리 하시겠습니까?')
            if (wait) {
                this.choose = "문제없음"
            }
        },
        warnContents: function () {
            var warn = confirm('경고 처리 하시겠습니까?')
            if (warn) {
                this.choose = "경고"
            }
        },
        deleteContents: function () {
            var deleteC = confirm('삭제 처리 하시겠습니까?')
            if (deleteC) {
                this.choose = "삭제"
            }
        }
    },
    created: function () {
        this.getReport()
        // 임의의 값 입력
        this.url = "http://localhost:8080/view"
    },
    watch: {
        choose: function () {
            this.getReport()
        }
    },
    // computed: {
    //     getUrl: function () {
    //         // viewId 받아서 해당 페이지 로드
    //         this.url = `http://localhost:8080/view/${this.viewId}`
    //     }
    // }
}
</script>

<style scoped>
</style>