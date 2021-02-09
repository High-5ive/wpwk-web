<template>
    <div class="ad-container nf nf-600">
        <p> 신 고 목 록 </p>
        <ReportList :reports="reports" />
    </div>
</template>

<script>
const reports = [
    {
        creator: "나다",  // nickname
        reporter: "너다",   // nickname
        title: "아이 창의력 키우는, 손바닥 물감 놀이! 재밌어요!",
        contentsId: 1,
        comment: "재미가 없어요.",
    },
    {
        creator: "나",   // nickname
        reporter: "너",   // nickname
        title: "아이 창의력 키우는, 손바닥 물감 놀이! 재밌어요!",
        contentsId: 1,
        comment: "노잼이예요.",
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

<style lang="scss">
@import 'src/css/admin.scss';
</style>