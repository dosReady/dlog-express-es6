<template>
    <div class="leftmenu-layout">
        <div class="leftmenu-container">
            <ul>
                <li>
                    <router-link class="page-link" to="/">메뉴 1</router-link>
                </li>
            </ul>
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
    div.leftmenu-container {
        display: flex;
        flex-wrap: wrap;
        width: 15rem;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        background-color: #7B9BA6;
        box-shadow: 0px 5px 5px rgb(98, 102, 102);
        padding-left: 3rem;
        padding-right: 3rem;
        padding-top: 2rem;
        ul {
            li {
                a.page-link {
                }
            }
        }
    }
}
</style>
