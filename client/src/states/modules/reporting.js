import Axios from 'axios'
import reportConstants from '../../models/reportConstants'

const  state = {
    // current pages include system, user and map
    curr_scope: '',
    // query criteria
    query: {system: {about: '', data: '', filter: '', fromdate: '', todate: ''}, user: {about: '', data: '', filter: '', fromdate: '', todate: ''}, map: {about: '', data: '', filter: ''}},
    // general information to display and identify a single user/map
    general_info: {user: {id: '', info: []},
                   map: {id: '', info: []}},
    // data recieved by calling RESTful APIs
    raw_data: {system: [], user: [], map: []},
    // visualization states for 3 pages
    vis_title: {system: '', user: '', map: ''},
    vis_type: {system: '', user: '', map: ''},
    vis_on: {system: false, user: false, map: false}
}

const getters = {
    // get curr_scope
    currScope(state) {
        return state.curr_scope;
    }
}

const  mutations = {
    // update raw data to last recieved data, params[scope, data]
    updateData(state, params) {
        state.raw_data[params.scope] = params.data;
    },
    // set visualization on, params[scope, type, title]
    visOn(state, params) {
        state.vis_type[params.scope] = params.type;
        state.vis_title[params.scope] = params.title;
        state.vis_on[params.scope] = true;
    },
    // set visualization off
    visOff(state, scope) {
        state.vis_on[scope] = false;
    },
    // change curr_scope
    changeScope(state, to) {
        state.curr_scope = to;
    },
    // set query criteria when user click options in queryCard, params[scope, type, option]
    setQuery(state, params) {
        state.query[params.scope][params.type] = params.option;
    },
    // set general_info for single user/map, params[scope, data]
    setInfo(state, params) {
        state.general_info[params.scope].info = params.data;
        if(params.scope == 'user') {
            state.general_info[params.scope].id = params.data.email;
        } else {
            state.general_info[params.scope].id = params.data.MapWebstrateID;
        }
    }
}

const  actions = {
    // find a single user by email and update its info
    findUser(context, check_email) {
      if (check_email.length != 0) {
        // construct full url
        let apiURL = reportConstants.RESTapiURL + "users/" + check_email;
        alert("Sending API request to " + apiURL);
        // use axios to sent reqeust and handle response
        Axios.get(apiURL).then(result => {
          if(result.data.users.length == 0) {
            alert("No user found, please check another");
            return;
          }
          context.commit('setInfo', {scope: 'user', data: result.data.users[0]});
          context.commit('visOff', 'user'); // close previous visualization
        })
        .catch (err => {
          alert(err);
        });
      } else {
        alert("Please enter a valid E-mail");
      }
    },
    // find a single map by webstrateID/ownerEmail+title, params[byID, email, title]
    findMap(context, params) {
      // construct url
      let apiURL = reportConstants.RESTapiURL;
      if (params.byID.length != 0) {
        apiURL = apiURL + "maps/" + params.byID;
      } else if (params.email.length != 0 && params.title.length != 0) {
        apiURL = apiURL + "users/" + params.email + "/maps" + "?title=" + params.title;
      } else {
        alert("Please enter valid E-mail and title");
        return;
      }
      alert("Sending API request to" + apiURL);
      // use axios to sent reqeust and handle response
      Axios.get(apiURL).then(result => {
        if(result.data.maps.length == 0) {
          alert("No map found, please check another");
          return;
        }
        context.commit('setInfo', {scope: 'map', data: result.data.maps[0]});
        context.commit('visOff', 'map'); // close previous visualization
      })
      .catch (err => {
        alert(err);
      });
    },
    // call api to get the snapshot of a map for mapReconstruct
    snapshotMap(context, mapID) {
        //for test actions should be ordered by timestamp small to large
        context.state.raw_data.map = [{
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
      },
    // given query criteria, request data using RESTful api, params[scope]
    requestDataAndShow(context, params) {
      const dataType = context.state.query[params.scope].data;
      let vis_type = 'list'; // default vis_type
      let vis_title = dataType; // default vis_title
      // make up api request URL
      let apiURL = reportConstants.RESTapiURL;
      switch (params.scope) {
        case 'system':
          apiURL = apiURL + context.state.query.system.data;
          switch(context.state.query.system.filter) {
            case 'timeRange':
              apiURL = apiURL + "?fromdate=" + context.state.query.system.fromdate + "&todate=" + context.state.query.system.todate;
              break;
          }
          break;
        case 'user':
          apiURL = apiURL + "users/" + context.state.general_info.user.id + "/";
          switch(dataType) {
            case 'event':
              //
              break;
            case 'action':
              //
              break;
            default:
              apiURL = apiURL + dataType;
          }
          break;
        case 'map':
          apiURL = apiURL + "maps/" + context.state.general_info.map.id + "/";
          switch(dataType) {
            case 'event':
              // make up URL and set vis_type and title
              break;
            case 'action':
              //
              break;
            case 'label':
              //
              break;
            case 'mapR':
              //
              break;
            default:
              apiURL = apiURL + dataType;
          }
      }
      // send request and handle data back
      alert("Sending API request to " + apiURL);
      Axios.get(apiURL).then(result => {
        context.commit('updateData', {scope: params.scope, data: result.data});
        context.commit('visOn', {scope: params.scope, type: vis_type, title: vis_title});
      })
      .catch (err => {
        alert(err);
      });
    }
}

const reporting = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default reporting
