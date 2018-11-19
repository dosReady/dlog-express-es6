<template>
    <div class="row content">
        <div class="col-md-2 btn-group-vertical pr-0 mr-3">
            <button class="btn btn-outline-info mb-2" @click="saveData">저장</button>
            <router-link class="btn btn-outline-info" to="/logline">목록</router-link>
        </div>
        <div class="col-md-9">
            <div class="form-group mt-3">
                <label>제목</label>
                <span class="form-control">{{data.subject}}</span>
            </div>
            <div class="form-group">
                <label>내용</label>
                <div class="form-control h-100" v-html="data.content"></div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text text-white bg-info">할일</span>
                    </div>
                    <input type="text" class="form-control" placeholder="해야할 일을 입력하십시오." v-model="todoText" @keypress="enterWork">
                    <div class="input-group-append">
                        <button class="btn btn-outline-danger p-1" @click="addWork">추가</button>
                    </div>
                </div>
                <ul class="list-group mt-2 scrollbar">
                    <li class="list-group-item" v-for="(item, index) in data.worklist" :key="index">
                        <div class="input-group">
                            <span class="col p-1">{{item.work_content}}</span>
                            <div class="input-group-append">
                                <button class="btn btn-outline-danger p-1" @click="removeWork(index)">삭제</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LogLineDetailForm',
  data () {
    return {
      todoText: '',
      data: {
        subject: '',
        content: '',
        worklist: [],
        filelist: []
      }
    }
  },
  async beforeCreate () {
    const {data} = await this.$http.post('/logline/detail', {id: this.$route.params.id})
    this.data = data
  },
  methods: {
    enterWork (e) {
      if (e.keyCode === 13) {
        this.addWork()
      }
    },
    addWork () {
      this.data.worklist.push({
        level: '',
        category: '',
        text: this.todoText
      })

      this.todoText = ''
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
    async saveData () {
      if (confirm('로그라인을 등록하시겠습니까?')) {
        const {data} = await this.$http.post('/logline/add', {data: this.data})
        console.log(data)
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

.scrollbar {
    height: 30vh;
    overflow-y: scroll;
}
</style>
