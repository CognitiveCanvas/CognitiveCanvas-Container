<template>
  <iframe class="concept-map" v-bind:src="source">
  </iframe>
</template>

<script>
  export default {
    name: 'topbar',
    data() {
      return {
        source: "http://webstrates.ucsd.edu/interaction-refactor/"
      }
    }
  }
</script>

<style>
.concept-map {
  height: 100%;
  width: 100%;
  top: -70px;
}
</style>