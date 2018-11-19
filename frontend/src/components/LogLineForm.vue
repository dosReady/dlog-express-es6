<template>
    <div>
        <div class="logline-header">
            <input type="text" v-model="subject" placeholder="제목" maxlength="100">
            <div class="button-group">
                <button class="btn btn-outline-info" @click="saveLogline">저장</button>
                <router-link class="btn btn-outline-info" to="/logline">목록</router-link>
            </div>
        </div>
        <div class="preview-header">
        </div>
        <div class="preview-content">
            <div v-html="compiledMarkdown"></div>
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
    async saveLogline () {
      if (confirm('저장하시겠습니까?')) {
        try {
          if (!this.$route.params.id) {
            await this.$http.post('/logline/add', {data: this.data})
          } else {
            await this.$http.post('/logline/edit', {seq: this.$route.params.id, data: this.data})
          }
          alert('저장이 완료되었습니다.')
          this.$router.push({path: '/logline'})
        } catch (error) {
          console.log(error)
          alert('저장 처리중 오류가 발생했습니다.')
        }
      }
    }
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
.logline-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    background-color: #3F5765;
    font-size: 2rem;
    padding: 1rem;
    height: 10%
}
.logline-header > .button-group {
    padding: 1rem
}
.logline-header > input {
    border: none;
    background-color: transparent;
    color: white;
    padding: 1rem;
    width: 85%;
}
.logline-header > input:focus {
    outline: none
}
.logline-header > input::placeholder {
    color: white
}
.preview-header {
    padding: 1rem;
    border-bottom: #3F5765;
    height: 5%
}
.preview-content {
    padding: 1rem;
    width: 99%;
    height: 55%;
    background-color: transparent!important;
    color: black!important;
    overflow: hidden;
    overflow-y: scroll
}
.input-content {
    background-color: #3F5765;
    padding: 1rem;
    height: 30%;
}
textarea {
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
</style>
