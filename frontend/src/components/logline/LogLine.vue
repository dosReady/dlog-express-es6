    <template>
      <div class="logline-page-container">
          <div class="logline-list-container">
              <div class="logline-container" v-for="(item, index) in loglines" :key="index">
                <router-link :to="{name: 'LogLineDetailForm', params: {id: item.logline_master_seq}}">
                  <div class="img-wrap">
                      <img src="static/image/dlog_logo.png">
                  </div>
                  <div class="logline-body">
                    <div class="logline-title">
                      <h2>{{item.logline_master_title}}</h2>
                      <hr>
                    </div>
                    <div class="logline-content"><p>{{item.logline_master_content}}</p></div>
                    <div class="logline-bottom"></div>
                  </div>
                </router-link>
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
  }
}
</script>

<style lang="scss" scoped>
div.logline-page-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 7rem;
  div.logline-list-container {
    display: flex;
    flex-direction: column;
    div.logline-container {
      width: 820px;
      background-color: white;
      margin: 0 auto 1rem auto;
      border-radius:3px;
      box-shadow:3px 3px 3px 3px #999;
      @media (max-width: 820px) {
        width: 100%;
      }
      a {
        display: flex;
        align-items: center;
        color: black;
        div.img-wrap {
          display: block;
          position: relative;
          width: 15rem;
          height: 10rem;
          margin-right: 1rem;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        div.logline-body {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 1rem;
          div.logline-title {
            display: block;
            text-align: left;
            h2 {
              font-weight: 550;
            }
          }
          div.logline-content {
            p {
              word-break: break-all;
            }
          }
        }
      }
    }
  }
}
</style>
