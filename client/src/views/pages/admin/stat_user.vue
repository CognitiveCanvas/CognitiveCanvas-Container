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

          <queryCard_user v-if="show_info"/>
          <button class="btn btn-primary" type="submit" v-if="show_info" v-on:click="getAndShow()">Get data and show</button>
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
    name: 'Stat_user',

    data () {
      return {
        check_email: ''
      }
    },

    mounted: function() {
      this.$store.commit('reporting/changeScope', 'user');
    },

    methods: {
      getAndShow() {
        this.$store.dispatch('reporting/requestDataAndShow', {scope: 'user'});
      },
      find: function() {
        this.$store.dispatch('reporting/findUser', this.check_email);
      }
    },

    computed: {
      name: function() {
        return this.$store.state.reporting.general_info.user.info.FirstName + " " +
          this.$store.state.reporting.general_info.user.info.LastName;
      },
      email: function() {
        return this.$store.state.reporting.general_info.user.info.email;
      },
      type: function() {
        return this.$store.state.reporting.general_info.user.info.Type;
      },
      surveylink: function() {
        return "http://#";
      },
      vis_on: function() {
        if(this.$store.state.reporting.raw_data.user.length != 0) {
          return this.$store.state.reporting.vis_on.user;
        }
        return false;
      },
      show_info: function() {
        if(this.$store.state.reporting.general_info.user.id == '') {
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
