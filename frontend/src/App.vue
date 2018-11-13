<template>
  <div id="app" class="container-fluid m-0 p-0">
    <load-layout></load-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    'LoadLayout': () => import('@/components/layouts/LoadLayout.vue')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
  overflow: hidden
}
</style>
