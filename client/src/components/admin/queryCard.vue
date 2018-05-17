<template>
  <div id="queryCard">
  <div class="row">
    <a>About</a>
    <select v-model="about" name="about">
      <option value=''>pick one</option>
      <option value='user'>User</option>
      <option value='map'>Map</option>
      <option value='action'>Action</option>
    </select>
  </div>
  <div class="row">
    <a>Data</a>
    <select v-model="query_data" name="data">
      <option value=''>--</option>
      <option v-if="this.about == 'user'" value="users">User List</option>
      <option v-if="this.about == 'map'" value="maps">Map List</option>
      <option v-if="this.about == 'map'" value="keyword">Key Words</option>
      <option v-if="this.about == 'action'" value="event">Events</option>
    </select>
  </div>
  <div class="row">
    <a>Filter</a>
    <select v-model="query_filter" name="filter">
      <option value=''>--</option>
      <option value="timeRange">Time Range</option>
      <option v-if="query_data == 'users'" value="type">Type</option>
      <option v-if="query_data == 'users'" value="#maps">#Maps Create</option>
      <option v-if="query_data == 'maps'" value="creator">Creator</option>
      <option v-if="query_data == 'keyword'" value="onNodes">On Nodes</option>
      <option v-if="query_data == 'keyword'" value="onEdges">On Edges</option>
    </select>
    <div v-if="query_filter == 'timeRange'" name="time_range">
      <input v-model="fromdate" type="text" class="form-control" placeholder="from">
      <input v-model="todate" type="text" class="form-control" placeholder="to">
    </div>
  </div>
  </div>
</template>

<script>
import queryData from '../../stores/queryData'

export default {
    name: 'queryCard',

    data () {
        return {
            about: ''
        }
    },
    queryData,

    computed: {
        query_data: {
          get: function () {
            return queryData.state.query.data;
          },
          set: function (newValue) {
            queryData.state.query.data = newValue;
          }
        },
        query_filter: {
          get: function () {
            return queryData.state.query.filter;
          },
          set: function (newValue) {
            queryData.state.query.filter = newValue;
          }
        },
        fromdate: {
          get: function () {
            return queryData.state.query.fromdate;
          },
          set: function (newValue) {
            queryData.state.query.fromdate = newValue;
          }
        },
        todate: {
          get: function () {
            return queryData.state.query.todate;
          },
          set: function (newValue) {
            queryData.state.query.todate = newValue;
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
</style>
