import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const options = {responsive: false, maintainAspectRatio: false,
      scales: { xAxes: [{  maxBarThickness: 25  }] }};

export default {
  extends: Bar,
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.chartData, options)
  }
}
