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
import queryData from '../../stores/queryData'

export default {
  name: 'piechart',

  data() {
    return {
    }
  },

  queryData,

  computed: {
    title: function() {
      return queryData.state.vis_title[queryData.state.curr_scope];
    },
    datapoint: {
      get: function() {
        return queryData.state.rawdata;
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
