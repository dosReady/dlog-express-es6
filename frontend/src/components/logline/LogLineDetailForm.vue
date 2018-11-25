<template>
  <div class="page-container">
    <div class="page-top"></div>
    <div class="page-content">
        <div class="logline-title">
          <h1>{{data.logline_master_title}}</h1>
          <span class="update-date">{{data.update_date}}</span>
          <hr>
        </div>
        <div class="logline-content markdown-body" v-html="compiledMarkdown"></div>
        <comment-container :data="comments"></comment-container>
        <comment-component></comment-component>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import CommentComponent from '@/components/comment/CommentComponent'
import CommentContainer from '@/components/comment/CommentContainer'
export default {
  name: 'LogLineDetailForm',
  data () {
    return {
      inputComment: {
        comment_content: '',
        master_seq: this.$route.params.id
      },
      data: {},
      comments: []
    }
  },
  components: {
    CommentComponent,
    CommentContainer
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const logline = await this.$http.post('/api/logline/detail', {id: this.$route.params.id})
      const comments = await this.$http.post('/api/comment/list', {id: this.$route.params.id})
      this.comments = comments.data
      this.data = logline.data
    }
  },
  methods: {},
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
@import '$static/css/common';
.logline-title {
  word-break: break-all;
  margin-bottom: 1.75rem;
  hr {
    border-color: #e7edf3;
  }
}
.logline-content {
  padding: 1rem 0 5rem 0;
}
.update-date {
  font-size: .875rem;
  color: #8aa6c1;
}
</style>
