<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'app'
}
window.bugsnagClient = bugsnag('f5b4e40125cc5b1591125821d850486b')
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

<style>
  :root{
    --accent-color: #FFCB08;
    --primary-color: #820263;
    --dark-color: #2E294E;
  }
  
  *{
    box-sizing: border-box;
  }

</style>

<style module>
  .container{
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: var(--primary-color);
  }
</style>
