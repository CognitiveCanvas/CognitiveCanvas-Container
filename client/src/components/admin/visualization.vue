<template>
<div class="container">
  <div class="row">
    <div class="col align-self-end">
      <button id="export" @click="download">Export</button>
      <select v-model="export_type" name="type" id="opt">
        <option value="json">as JSON</option>
        <option value="csv">as CSV</option>
        <option v-if="toShow != 'list'" value="chart">as chart</option>
      </select>
    </div>
  </div>
  <dataList class="content" v-if="toShow == 'list'" />
  <piechart class="content" v-if="toShow == 'pie'" />
  <mapReconstruct class="content" v-if="toShow == 'mapR'" />
</div>
</template>

<script>
import queryData from '../../stores/queryData'
import json2csv from "json2csv";

export default {
  name: 'visualization',

  data() {
    return {
      export_type: 'json'
    }
  },

  queryData,

  computed: {
    toShow: function() {
      return queryData.state.vis_type[queryData.state.curr_scope];
    }
  },

  methods: {
    download: function() {
      if(this.export_type == 'chart') {
        // not yet
      }

      let saveData = (function () {
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          return function (data, type, fileName) {
              let blob;
              if(type == 'json') {
                let json = JSON.stringify(data);
                blob = new Blob([json], {type: "octet/stream"});
              } else if(type == 'csv') {
                const Json2csvParser = require('json2csv').Parser;
                let fields = Object.keys(queryData.state.rawdata[queryData.state.query.data][0]);
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(data);
                blob = new Blob([csv], {type: "text/csv"});
              }
              let url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = fileName;
              a.click();
              window.URL.revokeObjectURL(url);
          };
      }());

      const fileName = "rawData." + this.export_type;
      saveData(queryData.state.rawdata[queryData.state.query.data], this.export_type, fileName);
    }
  }
}

</script>

<style>
  .content {
    height: 450px;
  }
  #export {
    float: right;
  }
  #opt {
    float: right;
  }
</style>
