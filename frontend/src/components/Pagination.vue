<template>
    <div v-if="$props.size > 0" class="pagination-container">
        <ul>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== 1"><button class="btn" @click="goPage(1, $event)">처음</button></li>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== 1 && this.width > 600"><button class="btn" @click="goPage('prev', $event)">이전</button></li>
            <li v-for="n in page_stack" :key="n">
                <button v-if="pagination.page === n" class="btn active" @click="goPage(n, $event)">{{n}}</button>
                <button v-else class="btn" @click="goPage(n, $event)">{{n}}</button>
            </li>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== this.page_end && this.width > 600"><button class="btn" @click="goPage('next', $event)">다음</button></li>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== this.page_end"><button class="btn" @click="goPage(page_end, $event)">끝</button></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Pagnation',
  props: {
    size: Number,
    max: {
      type: Number,
      default: 5
    },
    mode: String
  },
  data () {
    return {
      pagination: {
        size_length: 0,
        page: 1,
        max: this.$props.max
      },
      page_start: 0,
      page_end: 0,
      page_stack: [],
      page_count: 5, // 3 이하 넣지말자
      width: window.innerWidth || document.body.clientWidth
    }
  },
  created () {
    if (this.width <= 600) this.page_count = 3
  },
  methods: {
    goPage (n, event) {
      if (n === 'prev') {
        n = this.pagination.page - 1
        if (n === 0) n = 1
      }
      if (n === 'next') {
        n = this.pagination.page + 1
        if (n === this.page_end) n = this.page_end
      }
      if (this.page_end > this.page_count) {
        this.page_stack = []
        if (n - 1 === 1 || n === 1) {
          for (let i = 1; i <= this.page_count; i++) {
            this.page_stack.push(i)
          }
        } else if (n + 1 === this.page_end || n === this.page_end) {
          for (let i = (this.page_end - this.page_count) + 1; i <= this.page_end; i++) {
            this.page_stack.push(i)
          }
        } else {
          for (let i = n - ((this.page_count - 1) / 2); i <= n + ((this.page_count - 1) / 2); i++) {
            this.page_stack.push(i)
          }
        }
      }
      this.pagination.page = n
      if (this.$props.mode === 'comment') {
        this.$eventbus.$emit('reloadComments', this.pagination)
        this.$eventbus.$emit('initComments')
        this.$eventbus.$emit('initReply')
      } else if (this.$props.mode === 'blog') {
        this.$eventbus.$emit('reloadBlogs', this.pagination)
      }
    }
  },
  watch: {
    size () {
      console.log('size 변경 감지')
      this.pagination.size_length = Math.floor(this.size / this.max) + 1
      this.page_start = ((this.pagination.page - 1) / this.$props.size) * this.$props.size + 1
      this.page_end = Math.min(this.page_start + this.$props.size - 1, this.pagination.size_length)
      let loop = this.page_count
      this.page_stack = []
      if (this.page_end < this.page_count) loop = this.page_end
      for (let i = 1; i <= loop; i++) {
        this.page_stack.push(i)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  width: 100%;
  ul {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li {
          margin-right: 1rem;
      }
  }
}
</style>
