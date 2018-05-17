<template>
  <div id="Stat_user">
    <admin_topbar></admin_topbar>
    <div class="container-fluid">
      <h1>Single user report</h1>
    </div>
    <div class="container-fluid">
      <div class="row" id="content">
        <div class="col-4">
          <div class="row" id="find">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button" @click="find">Find a user</button>
              </div>
              <input type="text" class="form-control" v-model="check_email" placeholder="enter E-mail" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="row" v-if="show_info">
            <h3>General Info</h3>
            <div class="w-100"></div>
            <div class="col-4">Name:</div>
            <div class="col-8">{{name}}</div>
            <div class="w-100"></div>
            <div class="col-4">E-mail:</div>
            <div class="col-8">{{email}}</div>
            <div class="w-100"></div>
            <div class="col-4">Type:</div>
            <div class="col-8">{{type}}</div>
            <div class="w-100"></div>
            <div class="col"><a v-bind:href="surveylink">link to pre-survey</a></div>
          </div>

          <queryCard v-if="show_info"/>
          <button v-if="show_info" v-on:click="requestData()">Get data</button>
        </div>
        <div class="col-8">
          <visualization v-if="vis_on" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import queryData from '../../stores/queryData'

export default {
    name: 'Stat_user',

    data () {
        return {
            //response: "",
            check_email: ''
        }
    },

    queryData,

    methods: {
        requestData() {

        },
        find: function() {
          queryData.dispatch('findUser', this.check_email);
        }
    },

    computed: {
      name: function() {
        return queryData.state.user_rawdata.users[0].FirstName + " " +
          queryData.state.user_rawdata.users[0].LastName;
      },
      email: function() {
        return queryData.state.user_rawdata.users[0].email;
      },
      type: function() {
        return queryData.state.user_rawdata.users[0].Type;
      },
      surveylink: function() {
        return "http://#";
      },
      vis_on: function() {
        queryData.state.vis_on[queryData.state.curr_scope];
      },
      show_info: function() {
        if(queryData.state.user_id == '') {
          return false;
        }
        return true;
      }
    }
}
</script>

<style>
  #Stat_user {
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
