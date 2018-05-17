<template>
  <div id="adminPage">
    <admin_topbar></admin_topbar>
    <div class="container-fluid">
      <h1>System level report</h1>
    </div>
    <div class="container-fluid">
      <div class="row" id="content">
        <div class="col-4">
          <queryCard />
          <button v-on:click="requestData()">Get Data</button>
          <button v-on:click="showChart('pie')">Pie chart</button>
        </div>
        <div class="col-8">
          <visualization v-if="vis_on" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'AdminPage',

    data () {
        return {
            request: ""
        }
    },

    computed: {
      vis_on: function() {
        return this.$store.state.reporting.vis_on[this.$store.state.reporting.curr_scope];
      }
    },

    methods: {
        requestData() {
            // make up api request URL
            const apiURL = "http://reporting-ccreporting.7e14.starter-us-west-2.openshiftapps.com/";
            this.request = this.$store.state.reporting.query.data;
            switch(this.$store.state.reporting.query.filter) {
              case 'timeRange':
                this.request = this.request + "?fromdate=" + this.$store.state.reporting.query.fromdate + "&todate=" + this.$store.state.reporting.query.todate;
                break;
            }
            // send request and handle data back
            alert("Sending API request to" + apiURL + this.request);
            axios.get(apiURL + this.request).then(result => {
                this.$store.commit('reporting/updateData', {type: 'system', data: result.data});
                this.$store.commit('reporting/visualize', {type: 'list', title: this.$store.state.reporting.query.data});
                this.$store.state.reporting.vis_on[this.$store.state.reporting.curr_scope] = true;
            })
            .catch (err => {
                alert(err);
            });
        },
        showChart(t) {
            const type = t;
            /*switch(type) {
                case 'pie':*/
                    //api request here
            const dummy = [{"type": "Administrator", "num": 2}, {"type": "Student", "num": 40}, {"type": "Instructor&TA", "num": 5}];
            this.$store.commit('reporting/updateData', {type: 'system', data: dummy});
            this.$store.commit('reporting/visualize', {type: type, title: 'users by type'});
            this.$store.state.reporting.vis_on[this.$store.state.reporting.curr_scope] = true;
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
