<template>
    <div class="tag-container">
        <ul>
            <li v-for="(item, index) in data" :key="index">
                <button @click="goTag({emit:$props.emit, tag:item.tag_name})" class="btn btn-outline-default">{{item.tag_name}}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    emit: String
  },
  data () {
    return {
      data: []
    }
  },
  async created () {
    await this.init()
  },
  methods: {
    async init () {
      try {
        const {data} = await this.$http.post('/api/tag/list')
        this.data = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    goTag (data) {
      this.$eventbus.$emit(data.emit, data.tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
    ul {
        li {
            margin-bottom: 1rem;
        }
    }
}
</style>
