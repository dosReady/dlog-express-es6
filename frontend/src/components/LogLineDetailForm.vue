<template>
  <div>
    <div class="detail-container">
        <div class="fix-menu">
          <div class="button-group">
            <router-link class="page-link" to="/">목록</router-link>
          </div>
        </div>
        <div class="detail-content">
          <div class="detail-title">
            <h1>{{data.logline_master_title}}</h1>
            <span>{{data.update_date}}</span>
            <hr/>
          </div>
          <div v-html="compiledMarkdown"></div>
        </div>
        <div class="bottom-warp">
          <div class="comment-area">
            <textarea rows="3" placeholder="댓글을 입력하세요"></textarea>
            <div class="button-group">
              <button class="button-add">댓글달기</button>
            </div>
          </div>
          <div class="loginline-area">
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'LogLineDetailForm',
  data () {
    return {
      result: '',
      data: {}
    }
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const {data} = await this.$http.post('/logline/detail', {id: this.$route.params.id})
      this.data = data
    }
  },
  computed: {
    compiledMarkdown () {
      let content = ''
      if (this.data.logline_master_content) {
        content = this.data.logline_master_content
      }
      return marked(content, { sanitize: true })
    },
    subject: {
      get () {
        return this.data.logline_master_title
      },
      set (value) {
        this.data.logline_master_title = value
      }
    },
    content: {
      get () {
        return this.data.logline_master_content
      },
      set (value) {
        this.data.logline_master_content = value
      }
    }
  }
}
</script>

<style lang="scss">
div.detail-container {
  margin: 0 auto!important;
  width: 60%;
  div.fix-menu {
    position: absolute;
    width: 4rem;
    left: 3rem;
    top: 5.5rem;
    padding-top: 1rem;
    div.button-group {
      position: fixed;
      top: 1rem;
      button {
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: transparent;
        color: black;
      }
      button:hover {
        background-color: white;
      }
    }
  }
  div.detail-title {
    margin-bottom: 3rem;
  }
  div.detail-content {
    font-size: 1.17rem;
    padding-top: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: transparent!important;
    color: black!important;
    height: 100%;
    margin-bottom: 2rem;
    @media (max-width: 1600px) {
    }
    @media (max-width: 1200px) {
    }
    @media (max-width: 1024px) {
    }
  }
  div.bottom-warp {
    display: flex;
    flex-direction: column;
    background-color: #3F5765;
    padding: 1rem;
    width: 100%;
    align-items: center;
  }
  div.comment-area {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 3rem;
    textarea {
      margin: 0 auto;
      width: 100%;
      resize: none;
      outline: none;
      overflow: hidden;
      overflow-y: scroll;
      word-break: break-all;
    }
    textarea::placeholder {
      color: black;
    }
    div.button-group {
      display: flex;
      justify-content: flex-end!important;
      button.button-add:not(:disabled):not(.disabled) {
        cursor: pointer;
      }
      button.button-add {
        border-radius: 0.25rem;
        padding-top: 0.5rem!important;
        padding-bottom: 0.5rem!important;
        padding-left: 0.5rem!important;
        padding-right: 0.5rem!important;
        background-color: transparent!important;
        border: 1px solid white;
        color: white!important;
      }
      button.button-add:hover {
        background-color: white!important;
        color: black!important;
      }
    }
  }
}
</style>
