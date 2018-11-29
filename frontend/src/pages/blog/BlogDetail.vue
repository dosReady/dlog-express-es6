<template>
  <div class="page-container">
    <div class="page-content">
        <div class="blog-title">
          <h1>{{data.blog_title}}</h1>
          <span class="update-date">{{data.update_date}}</span>
          <hr>
        </div>
        <div class="blog-content markdown-body" v-html="compiledMarkdown"></div>
        <comment-container :data="comments"></comment-container>
        <div class="comment-input">
          <textarea v-model="inputComment.comment_content" placeholder="댓글을 입력해주세요."></textarea>
          <div class="btn-wrap">
            <button class="btn btn-default" @click="add_comment">댓글 달기</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import CommentContainer from '@/components/comment/CommentContainer'
const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
}
export default {
  name: 'BlogDetail',
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
    CommentContainer
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const blog = await this.$http.post('/api/blog/detail', {id: this.$route.params.id})
      const {data} = await this.$http.post('/api/comment/list', {id: this.$route.params.id})
      this.comments = data
      this.data = blog.data
    }
  },
  async created () {
    this.$eventbus.$on('reloadComments', (pagination) => {
      this.init_comment(pagination)
    })
  },
  methods: {
    async add_comment () {
      try {
        await this.$http.post('/api/comment/add', {data: this.inputComment})
        alert('저장되었습니다.')
        this.init_comment()
      } catch (error) {
        console.log(error)
        alert('저장 처리중 오류가 발생했습니다.')
      }
    },
    async delete_comment (paramsSeq) {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        try {
          await this.$http.post('/api/comment/delete', {seq: paramsSeq})
          alert('삭제되었습니다.')
          this.init_comment()
        } catch (error) {
          console.log(error)
          alert('삭제 처리중 오류가 발생했습니다.')
        }
      }
    },
    async init_comment (pagination) {
      try {
        const {data} = await this.$http.post('/api/comment/list', {id: this.$route.params.id, pagination: pagination})
        this.comments = data
        this.inputComment.comment_content = ''
      } catch (error) {
        console.log(error)
        alert('댓글 조회중 오류가 발생했습니다.')
      }
    }
  },
  computed: {
    compiledMarkdown () {
      let content = ''
      if (this.data.blog_content) {
        content = this.data.blog_content
      }
      return marked(content, { renderer: renderer, sanitize: true })
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
.page-container {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    height: 100%;
   .page-content {
        border-radius: .25rem;
        padding: 1.75rem;
        box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.05), 0 2px 4px 0 rgba(0,0,0,0.05);
        background-color: white;
        width: 1000px;
        height: auto;
        margin: 0 auto 1.75rem auto;
        @media (max-width: 1000px) {
            width: 100%;
            padding: 1rem;
        }
   }
   .page-bottom {
        background-color: #DDD7D0;
        height:auto;
   }
}
.blog-title {
  word-break: break-all;
  margin-bottom: 1.75rem;
  hr {
    border-color: #e7edf3;
  }
}
.blog-content {
  padding: 1rem 0 5rem 0;
}
.update-date {
  font-size: .875rem;
  color: #8aa6c1;
}
.comment-input {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  .btn-wrap {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
