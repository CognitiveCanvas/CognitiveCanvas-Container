<template>
<div class="container">
  <div class="row"><h2>{{title}}</h2></div>
  <vn-pie :model="datapoint"
    :donut="true"
    :height="400"
    :width="500"
    text-field="type"
    value-field="num"
    :show-tooltip-percent="true"
    :show-legend="false">
  </vn-pie>
</div>
</template>

<script>

export default {
  name: 'piechart',

  data() {
    return {
    }
  },

  computed: {
    title: function() {
      return this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope];
    },
    datapoint: {
      get: function() {
        return this.$store.state.reporting.rawdata;
      }
    }
  }
}
</script>

<style>
  svg {
    height: 400px;
    width: 500px;
  }
</style>
