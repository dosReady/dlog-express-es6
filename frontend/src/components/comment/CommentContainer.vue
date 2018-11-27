<template>
    <div class="comment-container">
      <comments v-for="(item, index) in data.comments" :key="index" :data="item"></comments>
      <pagination :size="data.comment_total_cnt" :mode="'comment'"></pagination>
    </div>
</template>

<script>
import Comments from '@/components/comment/Comments'
import Pagination from '@/components/Pagination'
export default {
  name: 'CommentContainer',
  props: [ 'data' ],
  components: {
    Comments,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.comment-container {
  word-break: break-all;
}
</style>
