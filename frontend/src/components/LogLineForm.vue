<template>
    <div class="row content">
        <div class="col-md-2 btn-group-vertical mr-3">
            <button class="btn btn-outline-info mb-2" @click="saveData">저장</button>
            <router-link class="btn btn-outline-info" to="/logline">목록</router-link>
        </div>
        <div class="col-md-9">
            <div class="form-group mt-3">
                <label>제목</label>
                <input type="text" class="form-control" v-model="data.subject" placeholder="제목">
            </div>
            <div class="form-group">
                <label>내용</label>
                <textarea rows="5" class="form-control" v-model="data.content"></textarea>
            </div>
            <div class="form-group">
                <label>할일</label>
                <button class="btn btn-outline-danger p-1" @click="addWork">추가</button>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item, index) in data.worklist" :key="index">
                        <input type="text" class="form-control" v-model="data.worklist[index].text">
                        <button class="btn btn-outline-danger p-1" @click="removeWork(index)">삭제</button>
                    </li>
                </ul>
            </div>
            <div class="form-group">
                <label>첨부파일</label>
                <button class="btn btn-outline-danger p-1" @click="addFile">추가</button>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item, index) in data.filelist" :key="index">
                        {{item}}
                        <button class="btn btn-outline-danger p-1" @click="removeFile(index)">삭제</button>
                    </li>
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
      data: {
        subject: '',
        content: '',
        worklist: [],
        filelist: []
      }
    }
  },
  methods: {
    addWork () {
      this.data.worklist.push({
        level: '',
        category: '',
        text: ''
      })
    },
    removeWork (index) {
      this.data.worklist.splice(index, 1)
    },
    addFile () {
      this.data.filelist.push({
        path: '',
        name: '',
        size: 0
      })
    },
    removeFile (index) {
      this.data.filelist.splice(index, 1)
    },
    saveData () {
      if (confirm('로그라인을 등록하시겠습니까?')) {
        console.log(this.data)
      }
    }
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

.btn-group-vertical {
    max-height: 15%
}
</style>
