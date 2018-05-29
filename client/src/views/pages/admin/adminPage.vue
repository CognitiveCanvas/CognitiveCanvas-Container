<template>
  <div id="adminPage">
    <admin_topbar></admin_topbar>
    <div class="container-fluid">
      <h1>System level report</h1>
    </div>
    <div class="container-fluid">
      <div class="row" id="content">
        <div class="col-4">
          <queryCard_sys />
          <button class="btn btn-primary" type="submit" v-on:click="getAndShow()">Get Data and show</button>
        <!--<button v-on:click="showChart('pie')">Pie chart</button>-->
        </div>
        <div class="col-8">
          <visualization v-if="vis_on" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AdminPage',

    data () {
      return {
      }
    },

    mounted: function() {
      this.$store.commit('reporting/changeScope', 'system');
    },

    computed: {
      vis_on: function() {
        if(this.$store.state.reporting.raw_data.system.length != 0) {
          return this.$store.state.reporting.vis_on.system;
        }
        return false;
      }
    },

    methods: {
      getAndShow() {
        this.$store.dispatch('reporting/requestDataAndShow', {scope: 'system'});
        //console.log(this.$store.state.reporting);
      }
    }
}
</script>

<style>
  #adminPage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: whitesmoke;
  }
  #content {
    margin-top: 20px;
    margin-right: 15px;
    margin-left: 20px;
  }
</style>
