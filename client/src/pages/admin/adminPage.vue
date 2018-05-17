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
import queryData from '../../stores/queryData'

export default {
    name: 'AdminPage',

    data () {
        return {
            request: ""
        }
    },

    queryData,

    computed: {
      vis_on: function() {
        return queryData.state.vis_on[queryData.state.curr_scope];
      }
    },

    methods: {
        requestData() {
            // make up api request URL
            const apiURL = "http://reporting-ccreporting.7e14.starter-us-west-2.openshiftapps.com/";
            this.request = queryData.state.query.data;
            switch(queryData.state.query.filter) {
              case 'timeRange':
                this.request = this.request + "?fromdate=" + queryData.state.query.fromdate + "&todate=" + queryData.state.query.todate;
                break;
            }
            // send request and handle data back
            alert("Sending API request to" + apiURL + this.request);
            axios.get(apiURL + this.request).then(result => {
                queryData.commit('updateData', {type: 'system', data: result.data});
                queryData.commit('visualize', {type: 'list', title: queryData.state.query.data});
                queryData.state.vis_on[queryData.state.curr_scope] = true;
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
            queryData.commit('updateData', {type: 'system', data: dummy});
            queryData.commit('visualize', {type: type, title: 'users by type'});
            queryData.state.vis_on[queryData.state.curr_scope] = true;
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
