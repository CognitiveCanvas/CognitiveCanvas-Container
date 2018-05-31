<template>
<div class="container">
  <div class="row">
    <div class="col">
      <h2>{{title}}</h2>
    </div>
    <div class="col align-self-end">
      <button class="btn btn-primary" type="submit" id="export" @click="download">Export</button>
      <select v-model="export_type" name="type" id="opt">
        <option value="json">as JSON</option>
        <option value="csv">as CSV</option>
      </select>
    </div>
  </div>
  <dataList id="list" v-if="toShow == 'list'" />
  <piechart v-if="toShow == 'pie'"
    :options="{responsive: false, maintainAspectRatio: false}"
    :width="500"
    :height="450">
  </piechart>
  <barchart v-if="toShow == 'bar'"
    :options="{responsive: false, maintainAspectRatio: false}"
    :width="500"
    :height="450">
  </barchart>
  <mapReconstruct id="mapR" v-if="toShow == 'mapR'" />
</div>
</template>

<script>
import json2csv from "json2csv";

export default {
  name: 'visualization',

  data() {
    return {
      export_type: 'json'
    }
  },

  computed: {
    title: function() {
      return this.$store.state.reporting.vis_title[this.$store.state.reporting.curr_scope];
    },
    toShow: function() {
      const scope = this.$store.getters['reporting/currScope'];
      return this.$store.state.reporting.vis_type[scope];
    }
  },

  methods: {
    download: function() {
      const scope = this.$store.getters['reporting/currScope'];
      const datatype = this.$store.state.reporting.query[scope].data;
      let self = this;
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
                let fields = Object.keys(data[0]);
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
      saveData(self.$store.state.reporting.raw_data[scope][datatype], this.export_type, fileName);
    }
  }
}

</script>

<style>
  #list, #mapR {
    height: 450px;
  }
  #export {
    float: right;
  }
  #opt {
    float: right;
  }
</style>
