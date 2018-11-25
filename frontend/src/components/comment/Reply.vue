<template>
    <div class="reply-wrap">
        <div class="reply-top">
            <h4>{{data.reply_user_id}}</h4>
            <span>{{data.reply_update_date}}</span>
        </div>
        <div class="reply-body">{{data.reply_content}}</div>
        <div class="reply-bottom">
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
    </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    data: Object,
    comment_seq: Number
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
  }
}
</script>

<style lang="scss" scoped>
.reply-wrap {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #355c7d;
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
