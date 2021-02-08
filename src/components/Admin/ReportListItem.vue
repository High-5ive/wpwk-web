<template>
    <div>
        <v-card>
            <v-card-subtitle>
                <div>
                    노리제작자: {{ this.creator }}  / 신고자: {{ this.reporter }}
                </div>
            </v-card-subtitle>
            <v-card-title>
                {{ this.reason }}
            </v-card-title>
            <v-card-actions>
                <v-btn color="blue" text @click="confirm"> 컨텐츠 확인 </v-btn>
                <v-btn outlined @click="waitContents" :class="{'selected': wait}"> 문제없음 </v-btn>
                <v-btn outlined @click="warnContents" :class="{'selected': warn}"> 경고 </v-btn>
                <v-btn outlined @click="deleteContents" :class="{'selected': deleteC}"> 삭제 </v-btn>
                <v-btn outlined> 최종확인 </v-btn>
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
            viewId: 0,
            reason: "",
            wait: false,
            warn: false,
            deleteC: false,
        }
    },
    methods: {
        getReport: function () {
            this.creator = this.report.creator
            this.reporter = this.report.reporter
            this.viewId = this.report.viewId
            this.reason = this.report.reason
        },
        confirm: function () {
            this.$router.push({ path: 'view' })
            // this.$router.push({ name: 'ContentsView', params: {this.viewId}})
        },
        waitContents: function () {
            this.wait = !this.wait
        },
        warnContents: function () {
            this.warn = !this.warn
        },
        deleteContents: function () {
            this.deleteC = !this.deleteC
        }
    },
    created: function () {
        this.getReport()
    },
    watch: {
        done: function () {
            this.getReport()
        }
    }
}
</script>

<style scoped>
.selected{
    color: red;
}
</style>