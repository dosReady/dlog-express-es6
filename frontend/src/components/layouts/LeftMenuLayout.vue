<template>
    <div class="leftmenu-layout">
        <div class="leftmenu-container"></div>
        <div class="content-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LeftMenuLayout'
}
</script>

<style lang="scss" scoped>
.leftmenu-layout {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    .leftmenu-container {
        flex-grow: 0;
        flex-shrink: 0;
        width: 26rem;
        background-color: #f5f6f7;
        position: relative;
    }
    .content-container {
        flex-grow: 1;
        flex-shrink: 1;
        width: 100%;
    }
}
</style>
