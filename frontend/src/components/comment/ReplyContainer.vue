<template>
    <div class="reply-container">
        <reply v-for="(item, index) in data" :key="index" :data="item"></reply>
    </div>
</template>

<script>
import Reply from '@/components/comment/Reply'
export default {
  name: 'ReplyContainer',
  props: {
    data: Array
  },
  components: {
    Reply
  }
}
</script>

<style lang="scss" scoped>
.reply-container {
    margin-left:2rem;
}
</style>
