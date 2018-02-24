<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="menu" v-on:click="menu">
    </div>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </nav>
</template>

<script>
export default {
  name: 'topbar',
  data() {
    return {

    }
  },
  methods: {
    menu: function(e) {
      console.log("clicked on menu")
    }
  }
}
</script>