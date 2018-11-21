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

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  background-color: #EFEFEF;
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Open Sans", sans-serif;
    margin-top: 60px;
    height: 100%;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select:none;
  }
}

</style>
