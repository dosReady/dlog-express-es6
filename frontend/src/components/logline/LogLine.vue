    <template>
      <div class="logline-list-wrap">
          <div class="add-bookmark">
              <router-link class="page-link" to="/logline/add">등록</router-link>
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
      const {data} = await this.$http.post('/api/logline/list')
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
          await this.$http.post('/api/logline/delete', {seq: seq})
          alert('삭제처리 되었습니다.')
          this.initLogine()
        } catch (error) {
          console.log(error)
          alert('삭제처리중 오류가 발생했습니다.')
        }
      }
    },
    async initLogine () {
      const {data} = await this.$http.post('/api/logline/list')
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

<style lang="scss" scoped>
div.logline-list-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 5rem;
  div.add-bookmark {
    display: flex;
    position: fixed;
    width: 6rem;
    left: 16.3vw;
    top: 0rem;
    z-index:15;
    align-items: center;
    background-color: #3F5765;
    padding: 1rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    height: 5rem;
    @media (max-width: 1900px) {
      left: 17.3vw;
    }
    @media (max-width: 1024px) {
      left: 19.3vw;
    }
    a.page-link {
      width: 100%;
      border-radius: 0.25rem;
      background-color: transparent;
      border: 1px solid white;
      color: white;
      text-align: center;
    }
    a.page-link:hover {
       background-color: white;
      color: black;
    }
  }
  div.logline-list {
    display: flex;
    flex-wrap: wrap;
    position:relative;
    align-items: center;
    height: 100%;
    padding: 1rem;
    div.card-container {
      position: relative;
      width: calc((100% - 8.875rem) / 5);
      margin-right: 1.75rem;
      margin-bottom: 1rem;
      height: 29rem;
      @media (max-width: 1920px) {
        width: calc((100% - 8.875rem) / 3);
      }
      @media (max-width: 1680px) {
        width: calc((100% - 8.875rem) / 2);
      }
      div.card-wrap {
        display: flex;
        flex-direction: column;
        background-color: white;
        box-shadow: 0 -4px 16px rgba(0,0,0,.05);
        padding: 1rem;
        div.card-title {
          display: flex;
          align-items: center;
          margin-bottom: 0.95rem;
        }
        div.card-content{
          word-break: break-all;
          overflow: hidden;
          height: 5rem;
        }
      }
      div.card-bottom{
        display: flex;
        align-items: center;
        background-color: white;
        box-shadow: 0 0 4px rgba(0,0,0,.05);
        margin-top: 0;
        padding: 1rem;
        background-color: #3F5866;
        a.page-link {
          background-color: transparent;
          color: white;
        }
        a.page-link:hover {
          background-color: white;
          color: black;
        }
        span.update-date {
          margin-left: auto;
          color: white;
        }
      }
      div.card-img {
        display: block;
        position: relative;
        box-shadow: 0 0 4px rgba(0,0,0,.05);
        height: 14rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

}
</style>
