<template>
    <div class="row">
        <nav class='col-3 navbar navbar-dark bg-dark'>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Link</a>
                </li>
            </ul>
        </nav>
        <router-view class="col-9 py-1"></router-view>
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
</style>
