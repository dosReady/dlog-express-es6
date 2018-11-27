<template>
    <div class="topmenu-layout">
        <div class="topmenu-container">
            <div class="title-group">
                <router-link to="/">
                    <img src="/static/image/dlog_logo.png">
                </router-link>
            </div>
            <div class="button-page-group">
                <router-link v-if="path === '/logline'" class="page-link" to="/logline/add">등록</router-link>
            </div>
            <div class="page-link-group">
                <router-link class="page-link" to="/">ISSUE LOG</router-link>
                <router-link class="page-link" to="/">LOG LINE</router-link>
                <router-link class="page-link" to="/">ETC</router-link>
            </div>
            <div class="button-right-group">
                <img src="/static/icons/typicons/src/svg/th-menu.svg">
            </div>
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
div.topmenu-layout {
    height: 100%;
    @media (max-width: 800px) {
        margin-left: 0;
    }
    div.topmenu-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        height: 4rem;
        background-color: #2B3A42;
        opacity: 0.98;
        box-shadow: 0px 5px 5px rgb(98, 102, 102);
        color: white;
        margin-bottom: 1rem;
        position: fixed;
        z-index: 15;
        width: 100%;
        font-size: 1rem!important;
        div.page-link-group {
            display: flex;
            margin: auto 0rem auto 3rem;
            @media (max-width: 680px){
                display: none;
            }
            a.page-link {
                font-size: 1.5rem!important;
                border: none;
                color: white;
                background-color: transparent;
                margin-right: 1rem;
            }
            a.page-link:focus {
                z-index: 2;
                outline: 0;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
        }
        div.title-group {
            padding: 1rem;
            margin-right: 1rem;
            display: block;
            position: relative;
            box-shadow: 0 0 4px rgba(0,0,0,.05);
            width: 4rem;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        div.button-page-group {
            padding: 1rem;
            a {
                text-decoration:none;
            }
            a {
                background-color: transparent;
                border: 1px solid white;
                color: white;
                padding-left: 1rem;
                padding-right: 1rem;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                font-size: 1rem;
            }
            a:hover {
                background-color: white;
                color: black;
            }
        }
        div.category-info{
            padding: 1rem;
        }
        div.button-right-group{
            display: none;
            padding-top: 1rem;
            padding-bottom: 1rem;
            padding-right: 1.75rem;
            margin-left: auto;
            @media (max-width: 680px){
                display: block;
            }
            img:not(:disabled):not(.disabled) {
                cursor: pointer;
            }
            img {
                height: 2rem;
            }
        }
    }
}
</style>
