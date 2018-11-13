<template>
    <div class="row content">
        <div class="col-md-1 mt-5">
            <button class="btn btn-outline-info mb-1">저장</button>
            <router-link class="btn btn-outline-info" to="/logline">목록</router-link>
        </div>
        <div class="col-md-11">
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
                <button class="btn btn-outline-danger p-1" @click="fnWork">추가</button>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item, index) in worklist" :key="index">{{item}}</li>
                </ul>
            </div>

            <div class="form-group">
                <label>첨부파일</label>
                <button class="btn btn-outline-danger p-1" @click="fnFile">추가</button>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item, index) in filelist" :key="index">{{item}}</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'LogLineForm',
  data () {
    return {
      worklist: [],
      filelist: []
    }
  },
  methods: {
    fnWork () {
      this.worklist.push('123213')
    },
    fnFile () {
      this.filelist.push('23455')
    }
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
