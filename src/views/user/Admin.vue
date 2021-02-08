<template>
    <div>
        <div> 신고 목록 </div>
        <ReportList :reports="reports" />
    </div>
</template>

<script>
const reports = [
    {
        creator: "나다",
        reporter: "너다",
        viewId: 1,
        reason: "재미가 없어요.",
    },
    {
        creator: "나다",
        reporter: "너다",
        viewId: 1,
        reason: "노잼이예요.",
    }
]

import ReportList from "@/components/Admin/ReportList.vue";

export default {
    name: "Admin",
    components: {
        ReportList
    },
    data: function () {
        return {
            reports: []
        }
    },
    created: function () {
        this.reports = reports
    }
}
</script>

<style scoped>

</style>