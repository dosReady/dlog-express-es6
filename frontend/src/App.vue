<template>
  <div id="app">
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
html {
  height: 100%;
  body {
  height: 100%;
  margin: 0!important;
  background-color: #EFEFEF!important;
  box-sizing: border-box;
  #app {
    font-family: "Open Sans", sans-serif;
    height: 100%;
    font-size: 1rem!important;
    user-select:none;
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-weight: 700!important;
  }
  }
}
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
          box-sizing: inherit;
}
</style>
