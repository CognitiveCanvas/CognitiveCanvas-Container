<template>
<div class="container">
  <div class="row">
    <input type="range" min="1" max="5" v-model:value="sliderVal" class="slider" id="myRange">
    <p>Value: <span>{{sliderVal}}</span></p>
  </div>
  <div class=row id="canvasBox">
    <v-stage :config="configKonva">
      <v-layer>
        <v-circle v-for="c in configCircle"
         :config="c"></v-circle>
        <v-line v-for="l in configEdge"
         :config="l"></v-line>
      </v-layer>
    </v-stage>
  </div>
</div>
</template>

<script>

export default {
  name: 'mapReconstruct',

  data() {
    return {
      sliderVal: 5,

      maxSlider: 5,

      configKonva: {
        width: 600,
        height: 600
      },

      show: true
    }
  },

  watch: {
    sliderVal: function(val) {
      this.sliderVal = val;
    }
  },

  computed: {
    configCircle: function() {
      let vis = [true, true, true];
      let i;
      for(i = 0; i < this.sliderVal; i++) {
        vis[i] = true;
      }
      for(; i < vis.length; i++) {
        vis[i] = false;
      }
      return [{x: 100,
      y: 100,
      radius: 50,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
      visible: vis[0]},
      {x: 200,
      y: 200,
      radius: 40,
      fill: "blue",
      stroke: "black",
      strokeWidth: 4,
      visible: vis[1]},
      {x: 300,
      y: 200,
      radius: 40,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
      visible: vis[2]} ]
    },
    configEdge: function() {
      let vis = [true, true];
      if(this.sliderVal >= 4) {
        vis[0] = true;
      } else {
        vis[0] = false;
      }
      if(this.sliderVal >= 5) {
        vis[1] = true;
      } else {
        vis[1] = false;
      }
      return [{points: [100, 100, 200, 200],
      stroke: 'red',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round',
      visible: vis[0]},

      {points: [200, 200, 300, 200],
      stroke: 'red',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round',
      visible: vis[1]} ]
    }
  }

}
</script>

<style>
.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

#canvasBox {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>
