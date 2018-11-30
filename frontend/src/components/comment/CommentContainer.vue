<template>
    <div id="comment" class="comment-container">
      <div id="focus-line"></div>
      <comments v-for="(item, index) in data.comments" :key="index" :data="item"></comments>
      <pagination :size="data.comment_total_cnt" :mode="'comment'" :scrollToId="'focus-line'"></pagination>
    </div>
</template>

<script>
import Comments from '@/components/comment/Comments'
import Pagination from '@/components/Pagination'
export default {
  name: 'CommentContainer',
  props: ['data', 'scrollToId'],
  components: {
    Comments,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.comment-container {
  word-break: break-all;
  #focus-line {
    height: 5rem;
  }
}
</style>
