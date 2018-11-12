<template>
    <component :is='switchLayout'></component>
</template>

<script>
export default {
  name: 'LoadLayout',
  data () {
    return {
      layout: ''
    }
  },
  components: {
    'DefaultLayout': () => import('@/components/layouts/default/DefaultLayout')
  },
  computed: {
    switchLayout () {
      switch (this.layout) {
        default:
          return 'DefaultLayout'
      }
    }
  }
}
</script>

<style scoped>
</style>
