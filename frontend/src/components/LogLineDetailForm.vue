<template>
    <div class="row content">
        <div class="col-md-2 btn-group-vertical pr-0 mr-3">
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
                <label>할일</label>
                <ul class="list-group mt-2" v-slimscroll>
                    <li class="list-group-item" v-for="(item, index) in data.worklist" :key="index">
                        <div class="input-group">
                            <span class="col p-1">{{item.work_content}}</span>
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
