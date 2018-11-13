<template>
    <div class="row content">
        <div class="col-1 mt-5">
            <button class="btn btn-outline-info mb-1" to="/logline/reg">저장</button>
            <router-link class="btn btn-outline-info" to="/logline">목록</router-link>
        </div>
        <div class="col-11">
            <div class="form-group mt-3">
                <label>제목</label>
                <input type="text" class="form-control" placeholder="제목">
            </div>
            <div class="form-group">
                <label>내용</label>
                <textarea rows="5" class="form-control"></textarea>
            </div>

            <div class="form-group">
                <label>할일</label>
                <ul class="list-group">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                </ul>
            </div>

            <div class="form-group">
                <label>첨부파일</label>
                <ul class="list-group">
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                    <li class="list-group-item">Morbi leo risus</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'LogLineForm',
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
.row {
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 0px;
}
.content {
    height: 100vh;
}
</style>
