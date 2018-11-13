<template>
    <div class="row">
        <div class="col bg-dark p-0">
            <nav class='navbar mt-5 px-0'>
                <ul class="nav flex-column w-100 m-0">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/">홈</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/logline">로그라인</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <router-view class="col-10 container px-5"></router-view>
    </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
.row {
    height: 100vh
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
