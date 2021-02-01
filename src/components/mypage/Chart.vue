<template>
  <div style="width:800px;">
    <canvas id="myChart"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js'
import myChartData from '@/assets/js/chartData.js'

export default {
  name: "Chart",
  data: function () {
    return {
      chartData: myChartData
    }
  },
  methods: {
    createChart: function (charId, chartData) {
      const ctx = document.getElementById(charId)
      const myChart = new Chart (ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      })
      console.log(myChart)
    }
  },
  mounted () {
    this.createChart('myChart', this.chartData)
  }
}
</script>
<style lang="">
  
</style>