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
body {
  height: 100%;
  background-color: #EFEFEF!important;
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Open Sans", sans-serif;
    height: 100%;
    font-size: 1rem!important;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select:none;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    @media (max-width: 800px) {
      font-size: 12px!important;
    }
  }
  h1 {
    font-weight: 700!important;
  }
}

</style>
