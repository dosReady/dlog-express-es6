<template>
    <div class="reply-container">
      <div :class="inputReplyClass">
        <textarea v-model="comment_content"></textarea>
        <div class="btn-wrap">
        <button class="btn btn-default" style="margin-right:1rem" @click="insertReply">답글 저장</button>
        <button class="btn btn-default" @click="hideInputReply">취소</button>
        </div>
      </div>
      <div :class="btnReplyWrapClass">
        <button class="btn btn-default" @click="showInputReply">답글달기</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    replyData: {
      comment_upper_seq: Number,
      master_seq: Number
    }
  },
  data () {
    return {
      comment_content: '',
      inputReplyClass: {
        'input-reply-hide': true,
        'input-reply-show': false
      },
      btnReplyWrapClass: {
        'btn-wrap-show': true,
        'btn-wrap-hide': false
      }
    }
  },
  methods: {
    showInputReply () {
      this.inputReplyClass = {
        'input-reply-hide': false,
        'input-reply-show': true
      }
      this.btnReplyWrapClass = {
        'btn-wrap-show': false,
        'btn-wrap-hide': true
      }
    },
    hideInputReply () {
      this.inputReplyClass = {
        'input-reply-hide': true,
        'input-reply-show': false
      }
      this.btnReplyWrapClass = {
        'btn-wrap-show': true,
        'btn-wrap-hide': false
      }
    },
    async insertReply () {
      try {
        const paramsData = {
          comment_upper_seq: this.$props.replyData.comment_upper_seq,
          comment_content: this.comment_content,
          master_seq: this.$props.replyData.master_seq
        }
        console.log(paramsData)
        await this.$http.post('/api/comment/add', {data: paramsData})
        alert('저장되었습니다.')
        this.comment_content = ''
      } catch (error) {
        console.log(error)
        alert('저장 처리중 오류가 발생했습니다.')
      }
    },
    async deleteReply () {
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-container {
  .input-reply-show {
    display: flex;
    flex-direction: column;
  }
  .input-reply-hide {
    display: none;
  }
  .btn-wrap-show {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem
  }
  .btn-wrap-hide {
    display: none;
  }
}
</style>
