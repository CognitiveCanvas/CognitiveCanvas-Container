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
      return this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope];
    },
    dataCol: {
      get: function() {
        switch(this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope]) {
          case 'users':
            return Object.keys(this.$store.state.reporting.rawdata.users[0]);
          case 'maps':
            return Object.keys(this.$store.state.reporting.rawdata.maps[0]);
        }
      }
    },
    datapoint: {
      get: function() {
        switch(this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope]) {
          case 'users':
            return this.$store.state.reporting.rawdata.users;
          case 'maps':
            return this.$store.state.reporting.rawdata.maps;
        }
      }
    },
    nav: function() {
      let title = this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope];
      if(title == 'users' || title == 'maps') {
        return true;
      }
      return false;
    }
  },

  methods: {
    navTo: function(value) {
      switch(this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope]) {
        case 'users':
          this.$store.dispatch('reporting/findUser', value.email);
          this.$store.state.reporting.curr_scope = 'user';
          router.push({ name: "userStat" });
          break;
        case 'maps':
          this.$store.dispatch('reporting/findMap', {byID: value.MapWebstrateID});
          this.$store.state.reporting.curr_scope = 'map';
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
