import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const options = {responsive: false, maintainAspectRatio: false};

export default {
  extends: Pie,
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.chartData, options)
  }
}
