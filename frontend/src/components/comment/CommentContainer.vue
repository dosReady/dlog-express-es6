<template>
    <div class="comment-container">
      <div class="comment-wrap" v-for="(item, index) in data" :key="index">
        <div class="comment-top">
          <span>등록자</span>
          <span>{{item.comment_update_date}}</span>
        </div>
        <div class="comment-body">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CommentContainer',
  props: {
    data: Array
  },
  data () {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.commponent-container {

}
</style>
