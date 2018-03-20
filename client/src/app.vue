<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
  window.bugsnagClient = bugsnag('API_KEY')
  // after Vue has been loaded…
  bugsnagClient.use(bugsnag__vue(Vue))
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<style>
body {
  top: 0;
  padding: 0;
  margin: 0;
  font-family: 'Muli', sans-serif;
  height: 100vh;
}
#app {
  height: 100%;
  width: 100%;
}

</style>
