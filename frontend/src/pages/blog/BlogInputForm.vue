<template>
    <div class="blog-conatiner">
        <div class="blog-header">
            <div class="title-area">
              <input type="text" v-model="subject" placeholder="제목" maxlength="100">
            </div>
            <div class="btn-group">
                <button class="btn btn-outline-default border-white" @click="saveBlog">저장</button>
                <router-link class="btn btn-outline-default border-white" to="/">목록</router-link>
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
  name: 'BlogInputForm',
  data () {
    return {
      data: {
        blog_title: '',
        blog_content: ''
      }
    }
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const {data} = await this.$http.post('/api/blog/detail', {id: this.$route.params.id})
      this.data = data
    }
  },
  methods: {
    async saveBlog () {
      if (confirm('저장하시겠습니까?')) {
        try {
          if (!this.$route.params.id) {
            await this.$http.post('/api/blog/add', {data: this.data})
          } else {
            await this.$http.post('/api/blog/edit', {seq: this.$route.params.id, data: this.data})
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
      if (this.data.blog_content) {
        content = this.data.blog_content
      }
      return marked(content, { sanitize: true })
    },
    subject: {
      get () {
        return this.data.blog_title
      },
      set (value) {
        this.data.blog_title = value
      }
    },
    content: {
      get () {
        return this.data.blog_content
      },
      set (value) {
        this.data.blog_content = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '$static/css/github-markdown';
div.blog-conatiner {
  height: 100%;
  overflow: hidden;
  div.blog-header {
    display: flex;
    align-items: center;
    background-color: #2B3A42;
    font-size: 2rem;
    padding: 0 1rem 0 1rem;
    overflow: hidden;
    height: 5rem;
    div.title-area {
      display: flex;
      flex: 1 1;
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
    div.btn-group {
      margin-left: auto;
    }
  }
  div.title-mobile-area {
    display: none;
    background-color: #3F5866;
    height: 3rem;
    input {
      border: none;
      width: 100%;
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
    }
  }
  div.preview-content {
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 15rem;
    word-break: break-all;
    background-color: transparent!important;
    color: black!important;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  div.input-content {
    display: flex;
    background-color: #2B3A42;
    height: calc(100% - 20rem);
    textarea {
      padding: 2rem;
      overflow: hidden;
      overflow-y: scroll;
      flex: 1 1;
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
  }
}
</style>
