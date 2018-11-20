    <template>
    <div>
        <div class="logline-list-wrap">
            <div class="button-group">
                <router-link class="btn btn-outline-info" to="/logline/add">등록</router-link>
            </div>
            <div class="logline-list">
              <div class="card-container" v-for="(item, index) in loglines" :key="index">
                <div class="card-img">
                    <img src="static/image/default_img.jpg" alt="리액트의 새로운 기능, Hooks 알아보기">
                </div>
                <div class="card-wrap">
                    <div class="card-title">
                      <h5>{{item.logline_master_title}}</h5>
                      <button class="btn btn-outline-danger ml-auto" @click="removeLogline(item.logline_master_seq)">ㅡ</button>
                    </div>
                    <div class="card-content">
                      <p v-html="item.logline_master_content"></p>
                    </div>
                </div>
                <div class="card-bottom">
                  <router-link class="page-link mr-2" :to="{name: 'LogLineDetailForm', params: {id: item.logline_master_seq}}">더 보기</router-link>
                  <router-link class="page-link" :to="{name: 'LogLineEditForm', params: {id: item.logline_master_seq}}">편집</router-link>
                  <span class="update-date">{{item.update_date}}</span>
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
      loglines: []
    }
  },
  async beforeCreate () {
    try {
      const {data} = await this.$http.post('/logline/list')
      this.loglines = data
    } catch (error) {
      console.log(error)
      alert('로그라인 목록조회중 오류가 발생했습니다.')
    }
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
div.logline-list-wrap {
  display: flex;
  flex: 0 0 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 1rem;
  padding-right: 1rem;
}
div.logline-list-wrap > div.button-group {
  display: flex;
  flex: 0 0 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.75rem;
  margin-bottom: 0.1rem;
  height: 2.5rem;
  align-items: center;
}
div.logline-list-wrap > div.logline-list {
  display: flex;
  flex-wrap: wrap;
  position:relative;
  flex: 0 0 100%;
  height: 100vh;
  padding: 1rem;
  overflow: hidden;
  overflow-y: scroll;
}
div.card-container {
  position: relative;
  width: calc((100% - 8.75rem) / 5);
  margin-right: 1.75rem;
  margin-bottom: 1rem;
  height: 29rem;
}
div.card-container > div.card-wrap {
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 -4px 16px rgba(0,0,0,.05);
  padding: 1rem;
}
div.card-container > div.card-wrap > div.card-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.95rem;
}
div.card-container > div.card-wrap > div.card-content{
  word-break: break-all;
  overflow: hidden;
  height: 5rem;
}
div.card-container div.card-bottom{
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 4px rgba(0,0,0,.05);
  margin-top: 0;
  padding: 1rem;
  background-color: #3F5866;
}
div.card-container div.card-img {
  display: block;
  position: relative;
  box-shadow: 0 0 4px rgba(0,0,0,.05);
  height: 14rem;
}
div.card-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
span.update-date {
  margin-left: auto;
  color: white;
}

a.page-link {
  background-color: transparent;
  color: white;
}
a.page-link:hover {
  background-color: white;
  color: black;
}

@media (max-width: 1920px) {
  div.card-container {
    width: calc(25% - 1.75rem)
  }
}
@media (max-width: 1600px) {
  div.card-container {
    width: calc(33.333% - 1.75rem)
  }
}
@media (max-width: 1200px) {
  div.card-container {
    width: calc(50% - 1.75rem)
  }
}
@media (max-width: 1024px) {
  div.card-container {
    width: calc(100% - 1.75rem);
    margin-bottom: 2rem;
  }
}
</style>
