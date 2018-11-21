<template>
    <div class="leftmenu-layout">
        <div class="leftmenu-container">
            메뉴
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
        width: 15rem;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        @media (max-width: 665px) {
            display: none;
        }
        @media (max-width: 530px) {
        }
    }
}
</style>
