
export const myChartData = {
  type: 'radar',
  data: {
    labels: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
    datasets:[
      {
        label: '내 성향',
        data: [80, 20, 60, 70, 34, 68, 41, 66],
        backgroundColor: "#f4b8407b",
        borderColor: "#f4b740",
        borderWidth: 1,
    }],
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    responsive: true,
    maintainAspectRatio:true,
    scale: {
      angleLines: {
        display: true,
      },
      ticks: {
        display: false,
        beginAtZero: true,
        max: 100,
        min: 0,
        stepSize: 20,
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20
          }
        }
      }
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    }
  }
}

export default myChartData;