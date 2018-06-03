<template>
<div class="container">
  <table class="table">
    <thead>
      <tr>
        <th v-for="col in dataCol">{{col}}</th>
        <th v-if="nav"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dp in datapoint">
        <td v-for="d in dp">{{d}}</td>
        <td v-if="nav"><button type="button" class="btn btn-outline-secondary" @click="navTo(dp)">navigate</button></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import router from '../../../router/index'

export default {
  name: 'dataList',

  data() {
    return {
    }
  },

  computed: {
    dataCol: {
      get: function() {
        const scope = this.$store.getters['reporting/currScope'];
        switch(this.$store.state.reporting.vis_title[scope]) {
          case 'users':
            return Object.keys(this.$store.state.reporting.raw_data[scope].users[0]);
          case 'maps':
            return Object.keys(this.$store.state.reporting.raw_data[scope].maps[0]);
          case 'frequency':
            return Object.keys(this.$store.state.reporting.raw_data[scope].frequency[0]);
          case 'nodes':
            return Object.keys(this.$store.state.reporting.raw_data[scope].nodes[0]);
          case 'edges':
            return Object.keys(this.$store.state.reporting.raw_data[scope].edges[0]);
        }
      }
    },
    datapoint: {
      get: function() {
        const scope = this.$store.getters['reporting/currScope'];
        switch(this.$store.state.reporting.vis_title[scope]) {
          case 'users':
            return this.$store.state.reporting.raw_data[scope].users;
          case 'maps':
            return this.$store.state.reporting.raw_data[scope].maps;
          case 'frequency':
            return this.$store.state.reporting.raw_data[scope].frequency;
          case 'nodes':
            return this.$store.state.reporting.raw_data[scope].nodes;
          case 'edges':
            return this.$store.state.reporting.raw_data[scope].edges;
        }
      }
    },
    nav: function() {
      const scope = this.$store.getters['reporting/currScope'];
      let title = this.$store.state.reporting.vis_title[scope];
      if(scope == 'map') {
        return false;
      }
      if(title == 'users' || title == 'maps') {
        return true;
      }
      return false;
    }
  },

  methods: {
    navTo: function(value) {
      switch(this.$store.state.reporting.query[this.$store.state.reporting.curr_scope].data) {
        case 'users':
          this.$store.dispatch('reporting/findUser', value.email);
          //this.$store.commit('reporting/changeScope', 'user');
          router.push({ name: "userStat" });
          break;
        case 'maps':
          this.$store.dispatch('reporting/findMap', {byID: value.MapWebstrateID});
          //this.$store.commit('reporting/changeScope', 'map');
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
</style>
