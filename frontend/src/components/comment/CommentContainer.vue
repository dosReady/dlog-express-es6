<template>
    <div class="comment-container">
      <comments v-for="(item, index) in data" :key="index" :data="item"></comments>
    </div>
</template>

<script>
import Comments from '@/components/comment/Comments'
export default {
  name: 'CommentContainer',
  props: {
    data: Array
  },
  components: {
    Comments
  }
}
</script>
