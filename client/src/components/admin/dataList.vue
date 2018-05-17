<template>
<div class="outter">
  <h2>{{title + ' List'}}</h2>
  <table class="table">
    <thead>
      <tr>
        <th v-for="col in dataCol">{{col}}</th>
        <th v-if="nav">link</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dp in datapoint">
        <td v-for="d in dp">{{d}}</td>
        <td v-if="nav"><button @click="navTo(dp)">navigate</button></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import queryData from '../../stores/queryData'
import router from '../../router/index'

export default {
  name: 'dataList',

  data() {
    return {
    }
  },

  queryData,

  computed: {
    title: function() {
      return queryData.state.vis_title[queryData.state.curr_scope];
    },
    dataCol: {
      get: function() {
        switch(queryData.state.vis_title[queryData.state.curr_scope]) {
          case 'users':
            return Object.keys(queryData.state.rawdata.users[0]);
          case 'maps':
            return Object.keys(queryData.state.rawdata.maps[0]);
        }
      }
    },
    datapoint: {
      get: function() {
        switch(queryData.state.vis_title[queryData.state.curr_scope]) {
          case 'users':
            return queryData.state.rawdata.users;
          case 'maps':
            return queryData.state.rawdata.maps;
        }
      }
    },
    nav: function() {
      let title = queryData.state.vis_title[queryData.state.curr_scope];
      if(title == 'users' || title == 'maps') {
        return true;
      }
      return false;
    }
  },

  methods: {
    navTo: function(value) {
      switch(queryData.state.vis_title[queryData.state.curr_scope]) {
        case 'users':
          queryData.dispatch('findUser', value.email);
          queryData.state.curr_scope = 'user';
          router.push({ name: "userStat" });
          break;
        case 'maps':
          queryData.dispatch('findMap', {byID: value.MapWebstrateID});
          queryData.state.curr_scope = 'map';
          router.push({ name: "mapStat" });
      }
    }
  }
}
</script>


<style>
  .table {
    overflow: auto;
    width: 100%;
    height: 100%;
    display: block;
    padding-top: 10px;
  }
  .outer {
    height: 100%;
    width: 100%;
  }
</style>
