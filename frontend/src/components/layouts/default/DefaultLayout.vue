<template>
    <div class="default-layout">
        <router-view class="content"></router-view>
    </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
.default-layout {
    width: 100vw;
    height: 100vh;
    padding: 0!important;
}
.content {
    display: flex;
    flex-direction: column;
    background-color:  #EFEFEF;
    height: 100vh;
}
.nav-item {
    margin-top: 30px;
    text-align: center;
}
.nav-link {
    padding-left: 0;
    padding-right: 0
}
.nav-link:hover {
    color: black!important;
    background-color: white
}
</style>
