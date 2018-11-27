<template>
    <div id="topmenu-layout">
        <div id="topmenu-container">
            <h1><router-link to="/">dlog</router-link></h1>
            <nav class="links">
                <ul>
                    <menu-btn :path="'/blog'">blog</menu-btn>
                    <menu-btn :path="'/logline'">logline</menu-btn>
                </ul>
            </nav>
            <!--
            <nav class="icons">
                <ul>
                    <li><router-link to="/"><font-awesome-icon icon="search" /></router-link></li>
                    <li><router-link to="/"><font-awesome-icon icon="bars" /></router-link></li>
                </ul>
            </nav>
            -->
        </div>
        <slot></slot>
    </div>
</template>

<script>
import MenuBtn from '@/components/MenuBtn'
export default {
  name: 'topmenuLayout',
  components: {
    MenuBtn
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
            height: inherit;
            line-height: inherit;
            margin-left: 1.5em;
            padding-left: 1.5em;
            @media (max-width: 700px) {
                display: none;
            }
            ul {
                display: flex;
                align-items: center;
                li {
                    border-left: solid 1px rgba(160, 160, 160, 0.3);
                    margin-left: 0;
                    margin-right: 0;
                    padding-left: 1em;
                    padding-right: 1em;
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
