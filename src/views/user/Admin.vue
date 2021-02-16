<template>
  <div class="ad-container nf nf-600">
    <p>신 고 목 록</p>
    <ReportList :reports="reports" />
  </div>
</template>

<script>
import ReportList from '@/components/Admin/ReportList.vue';
import { findAllReports } from '@/api/admin.js';
import { mapState } from 'vuex';
export default {
  name: 'Admin',
  components: {
    ReportList,
  },
  data: function() {
    return {
      reports: [],
    };
  },
  created() {
    this.findAllReports();
    this.isAdmin();
  },
  methods: {
    findAllReports: function() {
      findAllReports(
        (success) => {
          console.log('find all Reports suc', success);
          this.reports = success.data;
        },
        (fail) => {
          console.log(fail);
        }
      );
    },

    isAdmin: function() {
      if (this.userInfo.status != 2) {
        alert('접근할 수 없습니다');
        this.$router.push('/main');
      }
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>

<style lang="scss">
@import 'src/css/admin.scss';
</style>
