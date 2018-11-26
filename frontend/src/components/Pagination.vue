<template>
    <div class="pagination-container">
        <ul>
            <li v-if="this.size > 5"><button class="btn" @click="goPage('first', $event)">처음</button></li>
            <li><button class="btn" @click="goPage('prev', $event)">이전</button></li>
            <li v-for="n in pagination.size_length" :key="n"><button class="btn" @click="goPage(n, $event)">{{n}}</button></li>
            <li><button class="btn" @click="goPage('next', $event)">다음</button></li>
            <li><button class="btn" @click="goPage('last', $event)">끝</button></li>
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
      default: 10
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
      page_end: 0
    }
  },
  created () {
    console.log(this)
  },
  methods: {
    goPage (n, event) {
      const ultag = event.target.parentElement.parentElement
      for (let item of ultag.children) {
        const button = item.querySelector('button')
        button.classList.remove('active')
      }
      this.pagination.page = n
      event.target.classList.add('active')
      this.$eventbus.$emit('reloadComments', this.pagination)
    }
  },
  computed: {
  },
  watch: {
    size () {
      this.pagination.size_length = Math.floor(this.size / this.max) + 1
      this.page_start = ((this.pagination.page - 1) / this.$props.size) * this.$props.size + 1
      this.page_end = Math.min(this.page_start + this.$props.size - 1, this.pagination.size_length)
      console.log(this.page_start)
      console.log(this.page_end)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
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
