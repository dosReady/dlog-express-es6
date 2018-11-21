<template>
    <component :is='switchLayout'>
      <router-view></router-view>
    </component>
</template>

<script>
const defaultLayout = 'default'
export default {
  name: 'LoadLayout',
  components: {
    'DefaultLayout': () => import('@/components/layouts/DefaultLayout'),
    'LeftmenuLayout': () => import('@/components/layouts/LeftMenuLayout')
  },
  computed: {
    switchLayout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
