<template>
  <div id="queryCard_user">
  <div class="row">
    <a>About</a>
    <select v-model="query_about" name="about">
      <option value=''>pick one</option>
      <option value='map'>Map</option>
      <option value='action'>Action</option>
    </select>
  </div>
  <div class="row">
    <a>Data</a>
    <select v-model="query_data" name="data">
      <option value=''>pick one</option>
      <option v-if="query_about == 'map'" value="maps">Maps List</option>
      <option v-if="query_about == 'action'" value="event">#Events per type</option>
      <option v-if="query_about == 'action'" value="action">#Actions per type</option>
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
    name: 'queryCard_user',

    data () {
      return {
        curr_scope: 'user'
      }
    },

    computed: {
      query_about: {
        get: function () {
          return this.$store.state.reporting.query.user.about;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'user', type: 'about', option: newValue});
        }
      },
      query_data: {
        get: function () {
          return this.$store.state.reporting.query.user.data;
        },
        set: function (newValue) {
          this.$store.commit('reporting/setQuery', {scope: 'user', type: 'data', option: newValue});
        }
      }
      /*query_filter: {
        get: function () {
          return this.$store.state.reporting.query.user.filter;
        },
        set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'user', type: 'filter', option: newValue});
          }
        },
        fromdate: {
          get: function () {
            return this.$store.state.reporting.query.user.fromdate;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'user', type: 'fromdate', option: newValue});
          }
        },
        todate: {
          get: function () {
            return this.$store.state.reporting.query.user.todate;
          },
          set: function (newValue) {
            this.$store.commit('reporting/setQuery', {scope: 'user', type: 'todate', option: newValue});
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
