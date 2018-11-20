<template>
  <div>
    <div class="detail-container">
        <div class="fix-menu">
          <div class="button-group">
            <button>목록</button>
          </div>
        </div>
        <div class="preview-content">
          <div v-html="compiledMarkdown"></div>
        </div>
        <div class="bottom-warp">
          <div class="comment-area">
            <textarea rows="4"></textarea>
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
      data: {
        subject: '',
        content: ''
      }
    }
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const {data} = await this.$http.post('/logline/detail', {id: this.$route.params.id})
      this.data = data
      if (this.data.subject) {
        this.result = '# ' + this.data.subject + '\n* * *\n' + this.data.content
      } else {
        this.result = this.data.content
      }
    }
  },
  methods: {
  },
  computed: {
    compiledMarkdown () {
      return marked(this.result, { sanitize: true })
    },
    subject: {
      get () {
        return this.data.subject
      },
      set (value) {
        this.data.subject = value
        if (value) {
          this.result = '# ' + value + '\n* * *\n' + this.data.content
        } else {
          this.result = this.data.content
        }
      }
    },
    content: {
      get () {
        return this.data.content
      },
      set (value) {
        this.data.content = value
        if (this.data.subject) {
          this.result = '# ' + this.data.subject + '\n* * *\n' + value
        } else {
          this.result = value
        }
      }
    }
  }
}
</script>

<style scoped>
div.detail-container {
  margin: 0 auto!important;
  width: 60%;
}
div.fix-menu {
  position: absolute;
  width: 4rem;
  left: 3rem;
  top: 5.5rem;
  padding-top: 1rem;
}
div.fix-menu div.button-group {
  position: fixed;
  top: 1rem
}
div.fix-menu div.button-group button {
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent;
  color: black;
}
div.fix-menu div.button-group button:hover {
  background-color: white;
}
div.preview-content {
  font-size: 1.17rem;
  padding-top: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent!important;
  color: black!important;
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
}
div.comment-area textarea {
  margin: 0 auto;
  width: 100%;
  resize: none;
  outline: none;
  overflow: hidden;
  word-break: break-all;
}
div.comment-area div.button-group {
  display: flex;
  justify-content: flex-end!important;
}
div.comment-area div.button-group button {
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent;
  color: white;
}
div.comment-area div.button-group button:hover {
  background-color: white;
  color: black;
}

@media (max-width: 1920px) {
}
@media (max-width: 1600px) {
  div.preview-content {
  }
}
@media (max-width: 1200px) {
  div.preview-content {
  }
}
@media (max-width: 1024px) {
  div.preview-content {
  }
}
</style>
