<template>
  <div id="Stat_artifact">
    <admin_topbar></admin_topbar>
    <div class="container-fluid">
      <h1>Single map report</h1>
    </div>
    <div class="container-fluid">
      <div class="row" id="content">
        <div class="col-4">
          <div class="row" id="find">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button" @click="find">Find a map</button>
              </div>
              <input type="text" class="form-control" v-model="check_email" placeholder="creator E-mail" aria-describedby="basic-addon1">
              <input type="text" class="form-control" v-model="check_title" placeholder="enter title" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="row" v-if="show_info">
            <h3>General Info</h3>
            <div class="w-100"></div>
            <div class="col-4">Created by:</div>
            <div class="col-8">{{creator}}</div>
            <div class="w-100"></div>
            <div class="col-4">Title:</div>
            <div class="col-8">{{title}}</div>
            <div class="w-100"></div>
            <div class="col-4">Creat time:</div>
            <div class="col-8">{{init_time}}</div>
            <div class="w-100"></div>
            <div class="col-4">Last modified:</div>
            <div class="col-8">{{last_modify}}</div>
          </div>

          <queryCard v-if="show_info"/>
          <button v-if="show_info" v-on:click="requestData()">Get data</button>
          <button v-if="show_info" v-on:click="showChart('mapR')">Map Reconstruction</button>
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
    name: 'Stat_artifact',

    data () {
        return {
            check_email: '',
            check_title: ''
        }
    },

    methods: {
      requestData() {

      },
      find: function() {
        this.$store.dispatch('reporting/findMap', {byID: '', email: this.check_email, title: this.check_title});
      },
      showChart(t) {
          const type = t;
          let title = '';
          switch(type) {
              case 'mapR':
                title = 'Map Reconstruction';
                this.$store.dispatch('reporting/snapshotMap', {});
          }
          this.$store.commit('reporting/visualize', {type: type, title: title});
          this.$store.state.reporting.vis_on[this.$store.state.reporting.curr_scope] = true;
      }
    },

    computed: {
      title: function() {
        return this.$store.state.reporting.map_rawdata.maps[0].Title;
      },
      creator: function() {
        return this.$store.state.reporting.map_rawdata.maps[0].Owner;
      },
      init_time: function() {
        return this.$store.state.reporting.map_rawdata.maps[0]["Created Date"];
      },
      last_modify: function() {
        return this.$store.state.reporting.map_rawdata.maps[0].Modified;
      },
      vis_on: function() {
        return this.$store.state.reporting.vis_on[queryData.state.curr_scope];
      },
      show_info: function() {
        if(this.$store.state.reporting.map_id == '') {
          return false;
        }
        return true;
      }
    }
}
</script>

<style>
  #Stat_artifact {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: whitesmoke;
  }
  #content {
    margin-top: 40px;
    margin-left: 20px;
  }
  #find {
    width: 90%;
  }
</style>
