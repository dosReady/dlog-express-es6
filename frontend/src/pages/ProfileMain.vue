<template>
  <div class="profile-container">
    <div class="profile-content">
        <div class="user-image">
            <img src="static/image/dlog_logo.png" alt="">
        </div>
        <div class="user-info">
            <h1>사용자</h1>
        </div>
        <div class="btn-group">
            <router-link to="/blog/add" class="btn btn-default mr-1">블로그 작성</router-link>
            <button class="btn btn-default">로그라인 작성</button>
        </div>
        <div class="user-active">
            <div></div>
            <component :is="'profile-tab-blog'"></component>
        </div>
    </div>
  </div>
</template>

<script>
import ProfileTabBlog from '@/components/profile/ProfileTabBlog'
export default {
  name: 'ProfileMain',
  data () {
    return {
    }
  },
  components: {
    ProfileTabBlog
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
   .profile-content {
        border-radius: .25rem;
        padding: 1.75rem;
        box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.05), 0 2px 4px 0 rgba(0,0,0,0.05);
        background-color: white;
        width: 1000px;
        margin: 0 auto 1.75rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width: 1000px) {
            width: 100%;
            padding: 1rem;
        }
        .user-image {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            img {
                width: 10rem;
                height: 10rem;
                border-radius: 5rem;
                object-fit: cover;
            }
        }
        .user-info {
            width: inherit;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        .user-active {
            width: inherit;
            border-top: solid 1px rgba(160, 160, 160, 0.3);
            padding: 1rem;
            margin-top: 1rem;
        }
   }
   .profile-bottom {
        background-color: #DDD7D0;
        height:auto;
   }
}
</style>
