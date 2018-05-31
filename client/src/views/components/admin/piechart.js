import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      datasets: [{
          data: [10, 20, 30]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ]
    }, this.options)
  }
}
