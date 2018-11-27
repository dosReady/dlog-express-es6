<template>
    <li :class="classObject"><router-link :to="!path ? data: {path:path}"><slot></slot></router-link></li>
</template>

<script>
export default {
  name: 'MenuBtn',
  props: {
    data: Object,
    path: String
  },
  data () {
    return {
      classObject: {
        select: false
      }
    }
  },
  created () {
    if (this.$props.data) {
      if (this.$props.data.name === this.$route.name) this.classObject.select = true
    } else {
      if (this.$props.path === this.$route.path) this.classObject.select = true
    }
  },
  watch: {
    '$route' (to, from) {
      this.classObject.select = false
      if (this.$props.data) {
        if (this.$props.data.name === this.$route.name) this.classObject.select = true
      } else {
        if (this.$props.path === this.$route.path) this.classObject.select = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {
    a {
        border-bottom: 0;
        font-size: 0.95em;
        font-weight: 400;
        letter-spacing: 0.25em;
        text-transform: uppercase
    }
}
li.select {
    a {
        font-weight: 600!important;
        color: #355c7d!important;
    }
    border-bottom: solid 3px #355c7d!important;
}
</style>
