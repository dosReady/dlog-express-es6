<template>
    <div>
        <div class="comment-container" v-for="(item, index) in data" :key="index">
            <div class="comment-top">
                <h4>등록자</h4>
                <span class="update-date">{{item.update_date}}</span>
            </div>
            <div class="comment-content">
                <p>{{item.comment_content}}</p>
                <reply :reply-data="{comment_seq:item.comment_seq, master_seq:$route.params.id, replys:item.reply}"></reply>
            </div>
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
        <pagnation class="comment-pagnation"></pagnation>
    </div>
</template>

<script>
import Reply from '@/components/Reply'
import Pagnation from '@/components/Pagnation'
export default {
  name: 'CommentContainer',
  props: {
    data: Array
  },
  data () {
    return {
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
    }
  },
  components: {
    Reply,
    Pagnation
  }
}
</script>
