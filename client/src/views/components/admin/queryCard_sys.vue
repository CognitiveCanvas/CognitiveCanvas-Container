<template>
  <div id="queryCard_sys">
  <div class="row">
    <a>About</a>
    <select v-model="query_about" name="about">
      <option value=''>pick one</option>
      <option value='user'>User</option>
      <option value='map'>Map</option>
      <option value='action'>Action</option>
    </select>
  </div>
  <div class="row">
    <a>Data</a>
    <select v-model="query_data" name="data">
      <option value=''>pick one</option>
      <option v-if="query_about == 'user'" value="users">User List</option>
      <option v-if="query_about == 'map'" value="maps">Map List</option>
      <option v-if="query_about == 'map'" value="label">Key Words</option>
      <option v-if="query_about == 'action'" value="event">#Events per type</option>
      <option v-if="query_about == 'action'" value="action">#Actions per type</option>
    </select>
  </div>
  <div class="row">
    <a>Filter</a>
    <select v-model="query_filter" name="filter">
      <option value=''>No filter</option>
      <option value="timeRange">Time Range</option>
      <option v-if="query_data == 'users'" value="type">Type</option>
      <option v-if="query_data == 'users'" value="#maps">#Maps Create</option>
      <option v-if="query_data == 'keyword'" value="onNodes">On Nodes</option>
      <option v-if="query_data == 'keyword'" value="onEdges">On Edges</option>
    </select>
  </div>
  <div class="row" v-if="query_filter == 'timeRange'" id="time_range">
    <input v-model="fromdate" type="text" class="form-control" placeholder="from">
    <input v-model="todate" type="text" class="form-control" placeholder="to">
  </div>
  </div>
</template>

<script>

export default {
    name: 'queryCard_sys',

    data () {
      return {
        curr_scope: 'system'
      }
    },

    computed: {
      query_about: {
        get: function () {
          return this.$store.state.reporting.query.system.about;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'system', type: 'about', option: newValue});
        }
      },
      query_data: {
        get: function () {
          return this.$store.state.reporting.query.system.data;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'system', type: 'data', option: newValue});
        }
      },
      query_filter: {
        get: function () {
          return this.$store.state.reporting.query.system.filter;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'system', type: 'filter', option: newValue});
        }
      },
      fromdate: {
        get: function () {
          return this.$store.state.reporting.query.system.fromdate;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'system', type: 'fromdate', option: newValue});
        }
      },
      todate: {
        get: function () {
          return this.$store.state.reporting.query.system.todate;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'system', type: 'todate', option: newValue});
        }
      }
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
  #time_range {
    width: 50%
  }
</style>
