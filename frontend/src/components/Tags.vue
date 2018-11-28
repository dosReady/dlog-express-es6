<template>
    <div class="tag-container">
      <transition name="ctrl" mode="out-in">
        <div class="tag-control" v-if="show">
          <div class="quick-btn-group"></div>
          <div class="input-group">
            <input type="text" placeholder="태그 검색" v-model="searchTagText" @keydown="enterSearch"/>
            <div class="append">
              <button class="btn btn-outline-default" @click="searchTag"><font-awesome-icon icon="search" /></button>
            </div>
          </div>
          <div class="tag-wrap">
              <button v-for="(item, index) in data" :key="index" @click="goTag({emit: $props.emit, tag: item.tag_name, cnt: item.tag_cnt})" class="btn btn-outline-default">
                  {{item.tag_name}}({{item.tag_cnt}})
              </button>
          </div>
        </div>
        <div class="tag-info" v-if="!show" >
          <button class="btn backwards-btn" @click="showAlltag"><font-awesome-icon icon="arrow-left" /><span style="margin-left:1rem">전체 태그보기</span></button>
          <hr>
          <h2>#{{selectedTag}}<span>({{selectedTagCnt}})</span></h2>
        </div>
      </transition>
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
      data: [],
      tagInfoShow: false,
      tagCtrlShow: true,
      selectedTag: '',
      selectedTagCnt: 0,
      show: true,
      searchTagText: ''
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
    enterSearch (e) {
      if (e.keyCode === 13) this.searchTag()
    },
    async searchTag () {
      try {
        const {data} = await this.$http.post('/api/tag/list', {searchTagText: this.searchTagText})
        this.data = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    goTag (data) {
      this.$eventbus.$emit(data.emit, data.tag)
      this.selectedTag = data.tag
      this.selectedTagCnt = data.cnt
      this.show = false
    },
    showAlltag () {
      this.goTag({emit: this.$props.emit, tag: '', cnt: 0})
      this.show = true
      this.selectedTag = ''
      this.selectedTagCnt = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
  display: flex;
  flex-direction: column;
  .tag-control {
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
  .tag-info {
    h2 {
      margin-left: 1rem;
    }
    .backwards-btn {
      font-size: 1.25rem;
      font-weight: 500;
      color: #868e96
    }
    .backwards-btn:hover {
      color: black
    }
  }
}
.ctrl-enter-active, .ctrl-leave-active {
  transition: opacity .5s;
}
.ctrl-enter {
  opacity: 0;
}
.ctrl-enter-to {
  opacity: 1;
}
.ctrl-leave {
  opacity: 1;
}
.ctrl-leave-to {
  opacity: 0;
}
</style>
