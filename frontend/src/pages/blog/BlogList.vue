<template>
  <div id="blog-container">
    <div id="left-side">
      <section id="intro">
        <a href="#"><img class="logo" src="static/image/dlog_logo.png" alt=""></a>
        <header>
          <h2>Dlog</h2>
          <p>모든것을 기록하자</p>
        </header>
      </section>
      <section>
        <tags :emit="'searchBlog'"></tags>
      </section>
    </div>

    <div id="list-container">
      <div id="list-wrap">
        <article class="post" v-for="(item, index) in blogs" :key="index">
          <header>
            <router-link class="image featured" :to="{name: 'BlogDetail', params: {id: item.blog_seq}}"><img src="static/image/website-bg-img.jpg"></router-link>
          </header>
          <div class="post-body">
            <a href="#" class="author"><img src="static/image/dlog_logo.png" alt=""></a>
            <div class="post-title">
              <h2>{{item.blog_title}}</h2>
            </div>
            <div class="post-content">
              <p v-html="item.blog_content"></p>
            </div>
          </div>
          <footer>
            <ul class="actions">
              <li><router-link class="btn btn-default" :to="{name: 'BlogDetail', params: {id: item.blog_seq}}">더 보기</router-link></li>
              <li><router-link class="btn btn-default" :to="{name: 'BlogEdit', params: {id: item.blog_seq}}">편집</router-link></li>
            </ul>
          </footer>
        </article>
      </div>
      <pagination :size="blogsTotal" :mode="'blog'"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Tags from '@/components/Tags'
export default {
  name: 'BlogList',
  data () {
    return {
      blogs: [],
      blogsTotal: 0
    }
  },
  async created () {
    try {
      this.$eventbus.$on('reloadBlogs', (pagination) => {
        this.initBlog(pagination)
      })
      this.$eventbus.$on('searchBlog', (tag) => {
        this.searchBlog(tag)
      })
      this.initBlog()
    } catch (error) {
      console.log(error)
      alert('로그라인 목록조회중 오류가 발생했습니다.')
    }
  },
  methods: {
    async removeblog (seq) {
      if (confirm('로그라인을 삭제처리 하시겠습니까?')) {
        try {
          await this.$http.post('/api/blog/delete', {seq: seq})
          alert('삭제처리 되었습니다.')
          this.initBlog()
        } catch (error) {
          console.log(error)
          alert('삭제처리중 오류가 발생했습니다.')
        }
      }
    },
    async initBlog (pagination) {
      try {
        const {data} = await this.$http.post('/api/blog/list', {pagination: pagination})
        this.blogs = data.list
        this.blogsTotal = data.total
      } catch (error) {
        console.log(error)
        alert('블로그 초기화중 오류가 발생했습니다.')
      }
    },
    async searchBlog (tag) {
      try {
        const {data} = await this.$http.post('/api/blog/list', {tag: tag})
        this.blogs = data.list
        this.blogsTotal = data.total
      } catch (error) {
        console.log(error)
        alert('블로그 조회중 오류가 발생했습니다.')
      }
    }

  },
  computed: {
    classObject: () => {
      return {
        'col-6': true,
        'form-control': true,
        'ml-auto': false
      }
    }
  },
  components: {
    Pagination,
    Tags
  }
}
</script>

<style lang="scss" scoped>
#blog-container {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 4.5em;
  width: 100rem;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0;
  }
  #list-container {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 83.333333%;
    @media (max-width: 1530px) {
      flex: 0 0 66.666667%;
    }
    @media (max-width: 1530px) {
      flex: 0 0 60%;
    }
    @media (max-width: 1250px) {
      flex: 0 0 50%;
    }
    @media (max-width: 1100px) {
      flex: 0 0 40%;
    }
    @media (max-width: 960px) {
      flex: 0 0 30%;
    }
    @media (max-width: 800px) {
      flex: 0 0 100%;
    }
    #list-wrap {
      width: inherit;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 5em;
      .post {
        display: flex;
        flex-wrap: wrap;
        background: #ffffff;
        border: solid 1px rgba(160, 160, 160, 0.3);
        box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.05), 0 2px 4px 0 rgba(0,0,0,0.05);
        position: relative;
        margin-right: 1rem;
        margin-bottom: 1rem;
        width: 30rem;
        @media (max-width: 1500px) {
          width: 100%;
        }
        a.image.featured {
          overflow: hidden;
          border-top-left-radius: .25rem;
          border-top-right-radius: .25rem;
          img {
            transform: transform 0.2s ease-out;
            height: 15rem;
            object-fit: cover;
          }
        }
        a.image.featured:hover {
          img {
            transform: scale(1.05);
          }
        }
        header {
          width: 100%;
          height: auto;
        }
        .post-body {
          display: flex;
          flex-direction: column;
          position: relative;
          padding: 0 1rem 0 1rem;
          height: 10rem;
          .post-content {
            overflow: hidden;
          }
          .author {
            position: absolute;
            top: -2rem;
            right: .75rem;
            img {
              border-radius: 2rem;
            }
          }
        }
        footer {
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          border-top: solid 1px rgba(160, 160, 160, 0.3);
          padding: 1rem 1rem 0 1rem;
          margin-bottom: 1rem;
          .actions {
            flex-grow: 1;
            margin: 0!important;
            li:last-child {
              padding-right: 0;
            }
            li {
              display: inline-block;
              vertical-align: middle;
            }
          }
          .stats {
            cursor: default;
            list-style: none;
            padding: 0;
            li:first-child {
              border-left: 0;
              margin-left: 0;
              padding-left: 0;
            }
            li {
              display: inline-block;
              font-family: "Raleway", Helvetica, sans-serif;
              font-size: 0.6em;
              font-weight: 400;
              letter-spacing: 0.25em;
              line-height: 1;
              margin: 0 0 0 2em;
              padding: 0 0 0 2em;
              text-transform: uppercase;
            }
          }
        }
      }
    }
  }
  #left-side {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    margin-right: 2rem;
    width: 25rem;
    @media (max-width: 1400px) {
      width: 15rem;
    }
    @media (max-width: 800px) {
      display: none;
    }
    #intro {
      .logo {
        display: block;
        width: 4em;
        border-radius: 100%;
      }
    }
  }
}
</style>
