<template>
    <div class="reply-wrap">
        <div class="reply-top">
            <h4>{{data.user_id}}</h4>
            <span>{{data.reply_update_date}}</span>
        </div>
        <div class="reply-body">{{data.reply_content}}</div>
        <div class="reply-bottom">
            <div :class="inputWrapClass">
                <textarea v-model="inputReplyData.reply_content"></textarea>
            <div class="button-wrap">
                <button class="btn btn-default" style="margin-right:.25rem"  @click="addComment">저장</button>
                <button class="btn btn-default" @click="hideInputWrap">취소</button>
            </div>
            </div>
            <div :class="buttonWrapClass">
              <button class="btn btn-default" @click="showInputWrap">답글 달기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    data: Object
  },
  data () {
    return {
      inputReplyData: {
        comment_seq: 0,
        reply_content: '',
        target_user_id: ''
      },
      inputWrapClass: {
        'comment-input-wrap': true,
        'hide': true
      },
      buttonWrapClass: {
        'button-wrap': true,
        'hide': false
      }
    }
  },
  methods: {
    showInputWrap () {
      this.inputWrapClass.hide = false
      this.buttonWrapClass.hide = true
    },
    hideInputWrap () {
      this.inputWrapClass.hide = true
      this.buttonWrapClass.hide = false
    },
    async addComment () {
      try {
        console.log(this.$props)
        this.inputReplyData.comment_seq = this.data.comment_seq
        this.inputReplyData.target_user_id = this.data.target_user_id
        await this.$http.post('/api/reply/add', {data: this.inputReplyData})
        this.reloadComment()
      } catch (error) {
        console.log(error)
        alert('댓글 저장처리중 오류가 발생했습니다.')
      }
    },
    reloadComment () {
      this.inputReplyData.reply_content = ''
      this.inputReplyData.target_user_id = ''
      this.hideInputWrap()
      this.$eventbus.$emit('reloadComments')
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-wrap {
    padding-top: 1rem;
    padding-bottom: 1rem;
    .reply-top {
        display: flex;
        align-items: center;
        h4 {
            margin-right: 0.25rem;
        }
    }
    .reply-body {
        margin-bottom: 1rem;
    }
    .reply-bottom {
        .comment-input-wrap {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
            textarea {
            margin-bottom: 1rem;
            }
        }
        .button-wrap {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
