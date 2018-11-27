<template>
    <div id="topmenu-layout">
        <div id="topmenu-container">
            <h1><router-link to="/">dlog</router-link></h1>
            <nav class="links">
                <ul>
                    <li><router-link to="/">blog</router-link></li>
                    <li><router-link to="/">logline</router-link></li>
                </ul>
            </nav>
            <nav class="icons">
                <ul>
                    <li><router-link to="/"><font-awesome-icon icon="search" /></router-link></li>
                    <li><router-link to="/"><font-awesome-icon icon="bars" /></router-link></li>
                </ul>
            </nav>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'topmenuLayout',
  data () {
    return {
      path: ''
    }
  },
  created () {
    this.path = this.$route.path
  },
  watch: {
    '$route' (to, from) {
      this.path = to.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '$static/css/common';
#topmenu-layout {
    height: 100%;
    #topmenu-container {
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        border-bottom: solid 1px rgba(160, 160, 160, 0.3);
        height: 4em;
        top: 0;
        left: 0;
        line-height: 4em;
        position: fixed;
        width: 100%;
        z-index: 10000;
        h1 {
            height: inherit;
            line-height: inherit;
            padding: 0 0 0 1.5em;
            white-space: nowrap;
        }
        .links {
            flex: 1;
            border-left: solid 1px rgba(160, 160, 160, 0.3);
            height: inherit;
            line-height: inherit;
            margin-left: 1.5em;
            overflow: hidden;
            padding-left: 1.5em;
            ul {
                li:first-child {
                    border-left: 0;
                    margin-left: 0;
                    padding-left: 0;
                }
                li {
                    display: inline-block;
                    border-left: solid 1px rgba(160, 160, 160, 0.3);
                    line-height: 1;
                    margin-left: 1em;
                    padding-left: 1em;
                    a {
                        border-bottom: 0;
                        font-size: 0.95em;
                        font-weight: 400;
                        letter-spacing: 0.25em;
                        text-transform: uppercase
                    }
                }
            }
        }
        .icons {
            height: inherit;
            line-height: inherit;
            ul {
                height: inherit;
                line-height: inherit;
                li {
                    height: inherit;
                    line-height: inherit;
                    white-space: nowrap;
                    border-left: solid 1px rgba(160, 160, 160, 0.3);
                    padding: 0.15em 1.3em 0.15em 1.5em;
                    a {
                        border-bottom: 0;
                        color: #aaaaaa!important;
                        overflow: hidden;
                        position: relative;
                        text-indent: 4em;
                        width: 4em
                    }
                    a:hover {
                        color: black!important;
                    }
                }
            }
        }
    }
}
</style>
