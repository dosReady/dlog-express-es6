<template>
    <div class="leftmenu-layout">
        <div class="leftmenu-container">
            <div class="menu-top">
                <div class="top-image">
                    <img src="static/image/default_img.jpg">
                </div>
            </div>
            <ul>
                <li>
                    <router-link class="page-link" to="/">메뉴 1</router-link>
                </li>
                <li>
                    <router-link class="page-link" to="/">메뉴 2</router-link>
                </li>
                <li>
                    <router-link class="page-link" to="/">메뉴 3</router-link>
                </li>
            </ul>
        </div>
        <div class="mobilemenu-container">
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
  name: 'LeftmenuLayout'
}
</script>

<style lang="scss" scoped>
div.leftmenu-layout {
    height: 100%;
    margin-left: 15rem;
    @media (max-width: 800px) {
        margin-left: 0;
    }
    div.mobilemenu-container {
        display: none;
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
            padding: 1rem;
            margin-left: auto;
            img:not(:disabled):not(.disabled) {
                cursor: pointer;
            }
        }
    }
    div.leftmenu-container {
        display: flex;
        flex-wrap: wrap;
        width: 15rem;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        background-color: #2B3A42;
        box-shadow: 0px 5px 5px rgb(98, 102, 102);
        padding-top: 2rem;
        @media (max-width: 800px) {
            display: none;
        }
        div.menu-top {
            width: 100%;
            div.top-image {
                display: block;
                position: relative;
                height: 14rem;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            p {
                padding: 1rem;
            }
        }
        ul {
            width: 100%;
            list-style: none;
            padding-left: 0;
            li {
                margin-bottom: 1.75rem;
                a.page-link {
                    background-color: transparent;
                    border-left: none;
                    border-right: none;
                    color: white;
                }
                a.page-link:hover {
                    background-color: white;
                    color: black;
                }
            }
        }
    }
}
</style>
