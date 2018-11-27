<template>
    <div class="tag-container">
        <div class="quick-btn-group"></div>
        <div class="tag-search-wrap">
          <input type="text" placeholder="태그 입력"/>
          <div class="icon-wrap">
            <font-awesome-icon icon="search" />
          </div>
        </div>
        <div class="tag-wrap">
            <button v-for="(item, index) in data" :key="index" @click="goTag({emit:$props.emit, tag:item.tag_name})" class="btn btn-outline-default">
                {{item.tag_name}}({{item.tag_cnt}})
            </button>
        </div>
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
  display: flex;
  flex-direction: column;
  .tag-search-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1rem;
    input {
      flex: 1 1;
      padding: .75em;
      line-height: 1.5;
    }
    .icon-wrap {
      line-height: 1.5;
      padding: .75rem;
      border: 1px solid rgba(160, 160, 160, 0.3);
    }
  }
  .tag-wrap {
    display: inline-block;
    align-items: center;
    button {
      align-items: center;
      margin-right: .75rem;
      margin-bottom: .75rem;
      .tag-name {
        margin-right: .25rem;
      }
      .tag-cnt {
        font-size: .75rem!important;
      }
    }
  }
}
</style>
