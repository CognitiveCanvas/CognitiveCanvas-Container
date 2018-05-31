<template>
  <div id="queryCard_map">
  <div class="row">
    <a>About</a>
    <select v-model="query_about" name="about">
      <option value=''>pick one</option>
      <option value='nodes'>Nodes</option>
      <option value='edges'>Edges</option>
      <!--<option value='label'>Labels</option>-->
      <option value='action'>Actions</option>
    </select>
  </div>
  <div class="row">
    <a>Data</a>
    <select v-model="query_data" name="data">
      <option value=''>pick one</option>
      <option v-if="query_about == 'nodes'" value="nodes">Nodes List</option>
      <option v-if="query_about == 'edges'" value="edges">Edges List</option>
      <!--<option v-if="query_about == 'label'" value="label">Keywords List</option>-->
      <option v-if="query_about == 'action'" value="event">#Events per type</option>
      <option v-if="query_about == 'action'" value="action">#Actions per type</option>
      <option v-if="query_about == 'action'" value="mapR">Map reconstruction</option>
    </select>
  </div>
  <!--<div class="row">
    <a>Filter</a>
    <select v-model="query_filter" name="filter">
      <option value=''>--</option>
      <option v-if="query_data == 'maps'" value="timeRange">Time Range</option>
      <option v-if="query_data == 'users'" value="type">Type</option>
      <option v-if="query_data == 'users'" value="#maps">#Maps Create</option>
      <option v-if="query_data == 'keyword'" value="onNodes">On Nodes</option>
      <option v-if="query_data == 'keyword'" value="onEdges">On Edges</option>
    </select>
    <div v-if="query_filter == 'timeRange' && query_data == 'maps'" name="time_range">
      <input v-model="fromdate" type="text" class="form-control" placeholder="from">
      <input v-model="todate" type="text" class="form-control" placeholder="to">
    </div>
  </div>-->
  </div>
</template>

<script>

export default {
    name: 'queryCard_map',

    data () {
      return {
        curr_scope: 'map'
      }
    },

    computed: {
        query_about: {
          get: function () {
            return this.$store.state.reporting.query.map.about;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'map', type: 'about', option: newValue});
          }
        },
        query_data: {
          get: function () {
            return this.$store.state.reporting.query.map.data;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'map', type: 'data', option: newValue});
          }
        }
        /*query_filter: {
          get: function () {
            return this.$store.state.reporting.query.map.filter;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'map', type: 'filter', option: newValue});
          }
        },
        fromdate: {
          get: function () {
            return this.$store.state.reporting.query.map.fromdate;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'map', type: 'fromdate', option: newValue});
          }
        },
        todate: {
          get: function () {
            return this.$store.state.reporting.query.map.todate;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'map', type: 'todate', option: newValue});
          }
        }*/
      }
}
</script>

<style>
  .row {
    padding-bottom: 15px;
  }
  a {
    padding-right: 15px;
  }
</style>
