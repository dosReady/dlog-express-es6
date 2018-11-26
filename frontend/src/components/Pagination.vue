<template>
    <div class="pagination-container">
        <ul>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== 1"><button class="btn" @click="goPage(1, $event)">처음</button></li>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== 1"><button class="btn" @click="goPage('prev', $event)">이전</button></li>
            <li v-for="n in page_stack" :key="n">
                <button v-if="pagination.page === n" class="btn active" @click="goPage(n, $event)">{{n}}</button>
                <button v-else class="btn" @click="goPage(n, $event)">{{n}}</button>
            </li>
            <li v-if="this.pagination.size_length > 5 && this.pagination.page !== this.page_end"><button class="btn" @click="goPage('next', $event)">다음</button></li>
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
    link: String
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
      page_count: 3
    }
  },
  created () {
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
      this.pagination.page = n
      this.$eventbus.$emit('reloadComments', this.pagination)
    }
  },
  watch: {
    size () {
      this.pagination.size_length = Math.floor(this.size / this.max) + 1
      for (let i = 1; i <= this.page_count; i++) {
        this.page_stack.push(i)
      }
      this.page_start = ((this.pagination.page - 1) / this.$props.size) * this.$props.size + 1
      this.page_end = Math.min(this.page_start + this.$props.size - 1, this.pagination.size_length)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
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
