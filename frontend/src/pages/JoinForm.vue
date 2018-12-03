<template>
  <div class="page-container">
    <div class="page-content">
        <h2>환영합니다. {{data.email}}님!</h2>
        <div class="input-form">
            <div class="input-group">
                <input type="text" placeholder="비밀번호를 입력하세요."/>
                <font-awesome-icon icon="unlock-alt"/>
            </div>
            <div class="input-group">
                <input type="text" placeholder="확인비밀번호를 입력하세요."/>
                <font-awesome-icon icon="unlock-alt"/>
            </div>
            <div class="input-group">
                <input type="text" placeholder="이름을 입력하세요"/>
                <font-awesome-icon icon="user"/>
            </div>
            <div class="input-group">
                <input type="text" placeholder="연락처를 입력하세요"/>
                <font-awesome-icon icon="phone"/>
            </div>
        </div>
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
    h2 {
        text-transform: none;
        margin-bottom: 1rem;
    }
}
</style>
