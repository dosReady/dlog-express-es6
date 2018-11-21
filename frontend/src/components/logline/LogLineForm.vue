<template>
    <div class="vh-conatiner">
        <div class="logline-header">
            <div class="title-area">
              <input type="text" v-model="subject" placeholder="제목" maxlength="100">
            </div>
            <div class="button-group">
                <button @click="saveLogline">저장</button>
                <router-link to="/">목록</router-link>
            </div>
        </div>
        <div class="title-mobile-area">
          <input type="text" v-model="subject" placeholder="제목" maxlength="100">
        </div>
        <div class="preview-content">
            <div class="markdown-body" v-html="compiledMarkdown"></div>
        </div>
        <div class="input-content">
            <textarea v-model="content" placeholder="내용을 입력하세요"></textarea>
        </div>
    </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'LogLineForm',
  data () {
    return {
      data: {
        logline_master_title: '',
        logline_master_content: ''
      }
    }
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const {data} = await this.$http.post('/api/logline/detail', {id: this.$route.params.id})
      this.data = data
    }
  },
  methods: {
    async saveLogline () {
      if (confirm('저장하시겠습니까?')) {
        try {
          if (!this.$route.params.id) {
            await this.$http.post('/api/logline/add', {data: this.data})
          } else {
            await this.$http.post('/api/logline/edit', {seq: this.$route.params.id, data: this.data})
          }
          alert('저장이 완료되었습니다.')
          this.$router.push({path: '/'})
        } catch (error) {
          console.log(error)
          alert('저장 처리중 오류가 발생했습니다.')
        }
      }
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

<style lang="scss" scoped>
@import '$static/css/github-markdown';
div.vh-conatiner {
  height: 99vh;
  div.logline-header {
    flex: 0 0 10%;
    display: flex;
    align-items: center;
    background-color: #2B3A42;
    font-size: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    overflow: hidden;
    div.title-area {
      -ms-flex: 1 1;
      flex: 1 1;
      display: flex;
      input {
        width: 100%;
        border: none;
        background-color: transparent;
        color: white;
        padding: 1rem;
      }
      input:focus {
        outline: none;
      }
      input::placeholder {
        color: white;
      }
      @media (max-width: 480px) {
        display: none;
      }
    }
    div.button-group {
      display: flex;
      align-items: center;
      button:not(:disabled):not(.disabled) {
        cursor: pointer;
      }
      a {
        text-decoration:none;
      }
      a,
      button {
        background-color: transparent;
        border: 1px solid white;
        color: white;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 1rem;
        margin-right: 1rem;
      }
      a:hover,
      button:hover {
        background-color: white;
        color: black;
      }
    }
  }
  div.title-mobile-area {
    display: none;
    background-color: #3F5866;
    input {
      width: 100%;
      border: none;
      background-color: transparent;
      color: white;
      padding: 1rem;
    }
    input:focus {
      outline: none
    }
    input::placeholder {
      color: white;
    }
    @media (max-width: 480px) {
      display: flex;
      flex: 0 0 5%;
    }
  }
  div.preview-content {
    flex: 0 0 51%;
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 50vh;
    word-break: break-all;
    background-color: transparent!important;
    color: black!important;
    overflow: hidden;
    overflow-y: scroll
  }
  div.input-content {
    flex: 0 0 40%;
    display: flex;
    background-color: #2B3A42;
    width: 100%;
    height: 35vh;
    textarea {
      padding: 2rem;
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      color: white;
      resize: none
    }
    textarea::placeholder {
        color: white
    }
    textarea:focus {
        outline: none
    }
    @media (max-width: 480px) {
      flex: 0 0 35%;
    }
  }
}
</style>
