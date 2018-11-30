<template>
    <div id="profile-tab-blog">
        <div class="left">
            <ul class="tag-list">
                <li>
                    <button class="btn" @click="goBlog($event)">
                        <span>전체보기</span>
                    </button>
                </li>
                <li v-for="(item, index) in tag" :key="index">
                    <button class="btn" @click="goBlog($event, item.tag_name)">
                    <span>{{item.tag_name}}</span>
                    <span class="count">({{item.tag_cnt}})</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="right">
            <ul class="blog-list">
                <li class="blog-wrap" v-for="(item, index) in data" :key="index">
                        <img src="static/image/website-bg-img.jpg">
                        <div class="blog-content">
                            <router-link class="" :to="{name: 'BlogDetail', params: {id: item.blog_seq}}">
                            <div class="blog-title">
                                <h4>{{item.blog_title}}</h4>
                                <h6 class="color-gray">{{item.update_date}}</h6>
                            </div>
                            <p>
                                {{item.blog_content}}
                            </p>
                            </router-link>
                        </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProfileTabBlog',
  data () {
    return {
      tag: [],
      data: [],
      dataTotal: 0
    }
  },
  async created () {
    await this.selectblog('dos')
    await this.selecttag('dos')
  },
  methods: {
    async goBlog (e, tag) {
      const tagList = document.getElementsByClassName('tag-list')
      const profileBtns = tagList[0].getElementsByClassName('btn')
      for (const button of profileBtns) {
        button.classList.remove('btn-selected')
      }
      e.currentTarget.classList.add('btn-selected')
      await this.selectblog('dos', tag)
    },
    async selectblog (id, tag) {
      const data = await this.$post({url: '/api/profile/list', params: {id: 'dos', tag: tag}, errmsg: '블로그 목록조회중 오류가 발생했습니다.'})
      this.data = data.list
      this.dataTotal = !data.total ? 0 : data.total
    },
    async selecttag (id) {
      const tag = await this.$post({url: '/api/tag/mylist', params: {id: 'dos'}, errmsg: '태그 목록조회중 오류가 발생했습니다.'})
      this.tag = tag
    }
  }
}
</script>

<style lang="scss" scoped>
#profile-tab-blog {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .left {
        flex: 1 1 30%;
        border-right: 1px solid #ddd;
        .tag-list {
            padding: 1rem;
            .count {
                margin-left: .25rem;
                color: #adb5bd;
            }
        }
    }
    .right {
        flex:  1 1 70%;
        .blog-list {
            padding: 1rem 2rem 1rem 2rem;
            .blog-wrap {
                display: flex;
                padding: 1rem;
                border-bottom: 1px solid #ddd;
                img {
                    flex: 1 1 30%;
                    transform: transform 0.2s ease-out;
                    width: 15rem;
                    height: 10rem;
                    object-fit: cover;
                }
                .blog-content {
                    flex: 1 1 70%;
                    height: 10rem;
                    margin-left: 1rem;
                    overflow: hidden;
                    .blog-title {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: flex-start;
                    }
                }
            }
            .blog-wrap:last-child {
                display: flex;
                padding: 1rem;
                border-bottom: none;
            }
        }
    }
}
</style>
