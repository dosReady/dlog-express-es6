<template>
  <div class="page-container">
    <div class="page-content">
        <h1>환영합니다. {{data.email}}님!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinForm',
  data () {
    return {
      data: {
        email: ''
      }
    }
  },
  async created () {
    console.log(this.$route.query.email)
    if (this.$route.query.email) {
      const data = await this.$post({url: '/api/user/checkSendEmail', params: {toEmail: atob(this.$route.query.email)}, errmsg: '잘못된 요청입니다.'})
      if (!data) {
        alert('잘못된 요청 입니다.')
      }
      this.data.email = atob(this.$route.query.email)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
    width: 700px;
    @media (max-width: 700px) {
        width: 100%;
    }
}
</style>
