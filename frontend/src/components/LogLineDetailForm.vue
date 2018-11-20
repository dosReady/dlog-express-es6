<template>
    <div>
        <div class="preview-content">
            <div v-html="compiledMarkdown"></div>
        </div>
        <div class="comment-content">
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
div.preview-content {
  font-size: 1.17rem;
  margin: 0 auto;
  padding-top: 3rem;
  padding-left: 1rem;
  padding-right: 2rem;
  width: 50%;
  height: 70%;
  background-color: transparent!important;
  color: black!important;
  overflow: hidden;
  overflow-y: scroll
}
.comment-content {
  background-color: #3F5765;
  padding: 1rem;
  height: 30%;
}
textarea {
  width: 100%;
  height: 98%;
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

@media (max-width: 1920px) {
}
@media (max-width: 1600px) {
  div.preview-content {
    width: 60%;
  }
}
@media (max-width: 1200px) {
  div.preview-content {
    width: 70%;
  }
}
@media (max-width: 1024px) {
  div.preview-content {
    width: 80%;
  }
}
</style>
