<template>
    <div>
        <div class="col-11 row px-0">
            <h1>로그 라인</h1>
        </div>
        <div class="col-11 row container-fluid p-0 content">
            <div class="row">

            </div>
            <div class="row">

            </div>
        </div>
        <div class="col-11 row px-0">
            <div class="input-group">
                <input class="form-control" type="text">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-info">입력</button>
                </div>
            </div>    
        </div>                
    </div>

</template>

<script>
export default {
  name: 'LogLine'
}
</script>

<style scoped>
.row {
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 0px;
}
.content {
    height: 83vh;
}
</style>
