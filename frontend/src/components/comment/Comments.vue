<template>
    <div class="comment-wrap">
        <div class="comment-top">
            <h4>등록자</h4>
            <span>{{data.comment_update_date}}</span>
        </div>
        <div class="comment-body">
            <p>{{data.comment_content}}</p>
        </div>
        <div class="comment-bottom">
            <div :class="inputWrapClass">
            <textarea></textarea>
            <div class="button-wrap">
                <button class="btn btn-default" style="margin-right:.25rem">저장</button>
                <button class="btn btn-default" @click="hideInputWrap">취소</button>
            </div>
            </div>
            <div :class="buttonWrapClass">
              <button class="btn btn-default" @click="showInputWrap">댓글 달기</button>
            </div>
        </div>
        <reply-container :data="data.reply" :comment_seq="data.comment_seq"></reply-container>
    </div>
</template>

<script>
import ReplyContainer from '@/components/comment/ReplyContainer'
export default {
  name: 'Comments',
  props: {
    data: Object
  },
  data () {
    return {
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
    }
  },
  components: {
    ReplyContainer
  }
}
</script>

<style lang="scss" scoped>
 .comment-wrap {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #355c7d;
    .comment-top {
      display: flex;
      align-items: center;
      h4 {
        margin-right: 0.25rem;
        font-size: 1.25rem!important;
      }
    }
    .comment-bottom {
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
