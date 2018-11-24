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
        <div class="comment-container" v-for="(item, index) in comments" :key="index">
          <div class="comment-top">
            <h4>등록자</h4>
            <span class="update-date">{{item.update_date}}</span>
          </div>
          <div class="comment-content">
            <p>{{item.comment_content}}</p>
            <reply :reply-data="{conmment_upper_seq:item.comment_seq, master_seq:$route.params.id}"></reply>
          </div>
        </div>
        <pagnation class="comment-pagnation"></pagnation>
        <div class="comment-input">
          <textarea v-model="inputComment.comment_content" placeholder="댓글을 입력해주세요."></textarea>
          <div class="btn-wrap">
            <button class="btn btn-default" @click="add_comment">댓글 저장</button>
          </div>
        </div>
    </div>
    <div class="page-bottom"></div>
  </div>
</template>

<script>
import marked from 'marked'
import Reply from '@/components/Reply'
import Pagnation from '@/components/Pagnation'
export default {
  name: 'LogLineDetailForm',
  data () {
    return {
      inputComment: {
        comment_content: '',
        conmment_upper_seq: '',
        master_seq: this.$route.params.id
      },
      data: {},
      comments: []
    }
  },
  components: {
    Reply,
    Pagnation
  },
  async beforeCreate () {
    if (this.$route.params.id) {
      const logline = await this.$http.post('/api/logline/detail', {id: this.$route.params.id})
      const comments = await this.$http.post('/api/comment/list', {id: this.$route.params.id})
      this.comments = comments.data
      this.data = logline.data
    }
  },
  methods: {
    async add_comment () {
      if (confirm('댓글을 저장하시겠습니까?')) {
        try {
          await this.$http.post('/api/comment/add', {data: this.inputComment})
          alert('저장되었습니다.')
          this.init_comment()
        } catch (error) {
          console.log(error)
          alert('저장 처리중 오류가 발생했습니다.')
        }
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
    async init_comment () {
      try {
        const {data} = await this.$http.post('/api/comment/list', {id: this.$route.params.id})
        this.comments = data
        this.inputComment = ''
      } catch (error) {
        console.log(error)
        alert('댓글 조회중 오류가 발생했습니다.')
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
.comment-container {
  border-bottom: 1px solid #e7edf3;
  margin-bottom: 1rem;
  .comment-top {
    display: flex;
    align-items: center;
    height: 2rem;
    h4 {
      margin-right: 1rem;
    }
  }
  .comment-content {
    p {
      word-break: break-all;
    }
    .btn-wrap {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    }
  }
}
.comment-pagnation {
  ul {
    display: flex;
    list-style: none;
    justify-content: center;
    li {
      margin-right: 2rem;
    }
  }
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
