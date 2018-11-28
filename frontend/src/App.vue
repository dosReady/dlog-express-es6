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
@import '$static/scss/common';
html {
  height: 100%;
  body {
  height: 100%;
  margin: 0!important;
  background-color: #EFEFEF!important;
  box-sizing: border-box;
  #app {
    font-family: 'Roboto', '맑은 고딕', malgun gothic, '돋움', Dotum, 'Helvetica Neue', Helvetica, verdana, Arial, sans-serif;
    color: #646464;
    font-size: 1rem!important;
    font-weight: 400;
    line-height: 1.75;
    height: 100%;
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
