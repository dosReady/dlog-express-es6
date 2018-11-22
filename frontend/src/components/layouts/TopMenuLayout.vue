<template>
    <div class="topmenu-layout">
        <div class="topmenu-container">
            <div class="title-group">
                <router-link to="/">
                    <img src="static/image/dlog_logo.png">
                </router-link>
            </div>
            <!-- <div class="category-info">카테고리</div> -->
            <div class="button-group">
                <img src="static/icons/typicons/src/svg/th-menu.svg">
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'topmenuLayout'
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
        @media (max-width: 800px) {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
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
        div.category-info{
            padding: 1rem;
        }
        div.button-group{
            padding-top: 1rem;
            padding-bottom: 1rem;
            padding-right: 1.75rem;
            margin-left: auto;
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
