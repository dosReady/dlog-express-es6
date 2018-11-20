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
    width: 100%;
    height: 100%;
    padding: 0!important;
}
.content {
    display: flex;
    flex-direction: column;
    background-color:  #EFEFEF;
    height: 100%;
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
