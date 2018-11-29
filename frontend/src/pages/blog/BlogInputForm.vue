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
        <div :class="previewContentClass" @dblclick="togglePreview">
            <div class="markdown-body" v-html="compiledMarkdown"></div>
        </div>
        <div :class="inputContentClass" @dblclick="toggleInputContent">
            <codemirror class="" v-model="content" :options="cmOption"></codemirror>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import 'codemirror/mode/markdown/markdown.js'
export default {
  name: 'BlogInputForm',
  data () {
    return {
      data: {
        blog_title: '',
        blog_content: ''
      },
      previewContentClass: {
        'preview-content': true,
        hide: false
      },
      inputContentClass: {
        'input-content': true,
        hide: false
      },
      cmOption: {
        mode: 'markdown',
        theme: 'material',
        lineNumbers: false,
        lineWrapping: true,
        scrollbarStyle: 'overlay',
        placeholder: '내용을 입력해보세요!'
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
    togglePreview (e) {
      // const inputcontent = document.getElementsByClassName('input-content')
      this.inputContentClass.hide = this.previewContentClass.hide
      this.previewContentClass.hide = !this.previewContentClass.hide
    },
    toggleInputContent (e) {
      this.previewContentClass.hide = this.inputContentClass.hide
      this.inputContentClass.hide = !this.inputContentClass.hide
    },
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
    height: 10%;
    div.title-area {
      display: flex;
      flex: 1 1;
      input {
        flex: 1 1;
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
      flex: 1 1;
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
  div.preview-sizecontrol {
    flex: 1 1;
    height: 1rem;
    z-index: 15;
    opacity: .5;
    cursor: row-resize;
  }
  div.preview-content {
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 40%;
    word-break: break-all;
    background-color: transparent!important;
    color: black!important;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  div.input-content {
    display: flex;
    background-color: #263238;
    padding: 2rem;
    height: 50%;
    @media (max-width: 480px) {
      padding: 1rem;
      height: calc(50% - 3rem);
    }
  }
}
</style>
