import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: {data: '', filter: '', fromdate: '', todate: ''},
    rawdata: [],
    user_id: '',
    user_rawdata: [],
    map_id: '',
    map_rawdata: [],
    vis_title: {system: '', user: '', map: ''},
    vis_type: {system: '', user: '', map: ''},
    vis_on: {system: false, user: false, map: false},
    curr_scope: 'system',

    actions_data:[]
  },

  mutations: {
    updateData(state, params) {
      switch(params.type) {
        case 'system':
          state.rawdata = params.data;
          break;
        case 'user':
          state.user_rawdata = params.data;
          break;
        case 'map':
          state.map_rawdata = params.data;
      }
    },
    visualize(state, params) {
      state.vis_type[state.curr_scope] = params.type;
      state.vis_title[state.curr_scope] = params.title;
    }
  },

  actions: {
    findUser(context, check_email) {
      if (check_email.length != 0) {
        let apiURL = "http://reporting-ccreporting.7e14.starter-us-west-2.openshiftapps.com/" + "users/" + check_email;
        alert("Sending API request to" + apiURL);
        Axios.get(apiURL).then(result => {
          if(result.data.users.length == 0) {
            alert("No user found, please check another");
            return;
          }
          context.commit('updateData', {type: 'user', data: result.data});
          context.state.user_id = check_email;
        })
        .catch (err => {
          alert(err);
        });
      }
    },
    findMap(context, params) {
      let apiURL = "http://reporting-ccreporting.7e14.starter-us-west-2.openshiftapps.com/" + "maps/";
      if (params.byID.length != 0) {
        apiURL = apiURL + params.byID;
      } else if (params.email.length != 0 && params.title.length != 0) {
        apiURL = apiURL + params.email + "?title=" + params.title;
      } else {
        return;
      }
      alert("Sending API request to" + apiURL);
      Axios.get(apiURL).then(result => {
        if(result.data.maps.length == 0) {
          alert("No map found, please check another");
          return;
        }
        context.commit('updateData', {type: 'map', data: result.data});
        context.state.map_id = result.data.maps[0].MapWebstrateID;
      })
      .catch (err => {
        alert(err);
      });
    },
    snapshotMap(context, params) {
      //for test actions should be ordered by timestamp small to large
      context.state.actions_data = [{
        "type": "created",
        "event": "keyboard",
        "artifact": "nodeID",
        "timestamp": 1235640,
        "snapshot": {
          "nodes": [{
            "NodeID": 1,
            "Creator": "testuser1@ucsd.edu",
            "Label": "First Node",
            "Shape": "circle",
            "Color": "red",
            "Size": "32 px",
            "Creation Date": 1235643,
            "LocationX": 300,
            "LocationY": 250
          }],
          "edges": []
        }
      },
      {
        "type": "created",
        "event": "keyboard",
        "artifact": "nodeID",
        "timestamp": 1235643,
        "snapshot": {
          "nodes": [{
            "NodeID": 2,
            "Creator": "testuser1@ucsd.edu",
            "Label": "Second Node",
            "Shape": "circle",
            "Color": "blue",
            "Size": "32 px",
            "Creation Date": 1235645,
            "LocationX": 600,
            "LocationY": 200
          }],
          "edges": []
        }
      },
      {
        "type": "created",
        "event": "keyboard",
        "artifact": "nodeID",
        "timestamp": 1235645,
        "snapshot": {
          "nodes": [],
          "edges": [{
            "EdgeID": 1,
            "Creator": "testuser1@ucsd.edu",
            "Label": "First Edge",
            "Node1": {"id": "1", "LocationX": 300, "LocationY": 250},
            "Node2": {"id": "2", "LocationX": 600, "LocationY": 200},
            "Creation Date": 1235649,
            "Type": null
          }]
        }
      }]
    }
  }
})
