<template>
    <div class="detail-container">
        <div class="fix-container">
          <div class="fix-wrap">
            <div class="button-group">
              <router-link class="page-link" to="/">목록</router-link>
            </div>
            <div class="indexlink-group">
              <router-link class="page-link" to="/">목차영역</router-link>
            </div>
          </div>
        </div>
        <div class="detail-content">
          <div class="detail-title">
            <h1>{{data.logline_master_title}}</h1>
            <span>{{data.update_date}}</span>
            <hr/>
          </div>
          <div class="markdown-body" v-html="compiledMarkdown"></div>
        </div>
        <div class="bottom-warp">
          <div class="comment-area">
            <textarea rows="3" placeholder="댓글을 입력하세요" v-model="inputComment.comment_content"></textarea>
            <div class="button-group">
              <button class="button-add" @click="insertComment">댓글달기</button>
            </div>
          </div>
          <div class="loginline-area">
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
      inputComment: {
        comment_content: this.insertComment,
        conmment_upper_seq: '',
        master_seq: this.$route.params.id,
        is_private: 'N',
        comment_password: ''
      },
      data: {},
      comments: []
    }
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const {data} = await this.$http.post('/api/logline/detail', {id: this.$route.params.id})
      const result = await this.$http.post('/api/comment/list', {id: this.$route.params.id})
      console.log(result)
      this.data = data
    }
  },
  methods: {
    async insertComment () {
      await this.$http.post('/api/comment/add', {data: this.inputComment})
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
@import '$static/css/github-markdown';
div.detail-container {
  width: 1000px;
  margin: 5rem auto!important;
  padding: 1rem;
  @media (max-width: 1000px) {
    width: 100%;
    margin:0!important;
  }
  div.fix-container {
    position: absolute;
    width: 100%;
    left: 0;
    top: 5.5rem;
    div.fix-wrap {
      display: flex;
      flex-direction: row;
      width: 100%;
      position: fixed;
      @media (max-width: 1000px) {
        flex-direction: column;
      }
      div.button-group {
        width: 9rem;
        height: 5rem;
        padding: 1rem;
        background-color: #3F5765;
        border-top-right-radius: 0.55rem;
        border-bottom-right-radius: 0.55rem;
        @media (max-width: 1000px) {
          width:5rem;
          font-size: 11px!important;
        }
        button {
          padding-left: 1rem;
          padding-right: 1rem;
          @media (max-width: 800px) {
            padding-left: 0rem;
            padding-right: 0rem;
          }
          background-color: transparent;
          color: black;
        }
        button:hover {
          background-color: white;
        }
        a.page-link {
          border-radius: 0.25rem;
          background-color: transparent;
          color: white;
          border: 1px solid white;
        }
        a.page-link:hover {
          background-color: white;
          color: black;
        }
      }
      div.indexlink-group {
        width: 9rem;
        height: 8rem;
        padding: 1rem;
        margin-left: auto;
        background-color: #3F5765;
        border-top-left-radius: 0.55rem;
        border-bottom-left-radius: 0.55rem;
        @media (max-width: 1000px) {
          margin-top: 1rem;
          margin-left: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: 0.55rem;
          border-bottom-right-radius: 0.55rem;
          width:5rem;
          font-size: 11px!important;
        }
        a.page-link {
          border-radius: 0.25rem;
          background-color: transparent;
          color: white;
          border: 1px solid white;
        }
        a.page-link:hover {
          background-color: white;
          color: black;
        }
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
      background-color: transparent;
      border: 1px solid white;
      color: white;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    textarea::placeholder {
      color: white;
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
