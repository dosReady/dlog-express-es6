<template>
    <div class="comment-input">
        <textarea v-model="data.comment_content" placeholder="댓글을 입력해주세요."></textarea>
        <div class="btn-wrap">
            <button class="btn btn-default" @click="add_comment">댓글 달기</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  data () {
    return {
      data: {
        comment_seq: '',
        master_seq: '',
        comment_content: ''
      }
    }
  },
  methods: {
    async add_comment () {
      if (confirm('댓글을 저장하시겠습니까?')) {
        try {
          await this.$http.post('/api/comment/add', {data: this.data})
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
        this.inputComment.comment_content = ''
      } catch (error) {
        console.log(error)
        alert('댓글 조회중 오류가 발생했습니다.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
