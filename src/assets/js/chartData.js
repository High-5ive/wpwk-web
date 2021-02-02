export const myChartData = {
  type: 'radar',
  data: {
    labels: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
    datasets:[
      {
        label: '내 성향',
        data: [50, 50, 50, 50, 50, 50, 50, 50],
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          
        ],
        borderColor: [
          "rgba(153, 102, 255, 0.2)",        
        ],
        borderWidth: 1,
    }],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            display: false,
            min: 0,
            max: 100,
          },
          gridLines: {
            display: false,
          },
          scaleLable: {
            display: false,
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          }
        }
      ]
    }
  }
}

export default myChartData;