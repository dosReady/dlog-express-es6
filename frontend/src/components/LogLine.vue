    <template>
    <div>
        <div class="row content">
            <div class="col-md-2 btn-group-vertical pr-0 mr-3">
                <router-link class="btn btn-outline-info" to="/logline/add">등록</router-link>
            </div>
            <div class="col-md-9" v-slimscroll="options">
                <!--
                <div class="row" v-for="(item, index) in loglines" :key="index">
                    <span :class="classObject">{{item}}</span>
                </div>
                -->
                <div class="row card" v-for="(item, index) in loglines" :key="index">
                    <div class="card-body">
                        <div class="card-title d-flex">
                            <h5>{{item.logline_master_title}}</h5>
                            <button class="btn btn-outline-danger ml-auto" @click="removeLogline(item.logline_master_seq)">삭제</button>
                        </div>
                        <p class="card-text" v-html="item.logline_master_content"></p>
                        <router-link class="card-link" :to="{name: 'LogLineDetailForm', params: {id: item.logline_master_seq}}">더 보기</router-link>
                        <router-link class="card-link" :to="{name: 'LogLineEditForm', params: {id: item.logline_master_seq}}">편집</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LogLine',
  data () {
    return {
      loglines: [],
      options: {
        width: '80%',
        height: '100vh'
      }
    }
  },
  async beforeCreate () {
    const {data} = await this.$http.post('/logline/list')
    this.loglines = data
  },
  methods: {
    async removeLogline (seq) {
      if (confirm('로그라인을 삭제처리 하시겠습니까?')) {
        try {
          await this.$http.post('/logline/delete', {seq: seq})
          alert('삭제처리 되었습니다.')
          this.initLogine()
        } catch (error) {
          console.log(error)
          alert('삭제처리중 오류가 발생했습니다.')
        }
      }
    },
    async initLogine () {
      const {data} = await this.$http.post('/logline/list')
      this.loglines = data
    }
  },
  computed: {
    classObject: () => {
      return {
        'col-6': true,
        'form-control': true,
        'ml-auto': false
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
