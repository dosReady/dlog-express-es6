<template>
  <transition name="component-fade" mode="out-in">
  <div v-if="!isCompleted" class="page-container" key="join">
    <div class="page-content">
        <h2>환영합니다.</h2>
        <h2>{{data.email}}님!</h2>
        <div class="input-form">
            <label>이름 <font-awesome-icon icon="asterisk"/></label>
            <input type="text" autocomplete="off" v-model="data.name" placeholder="이름"/>
            <label>비밀번호 <font-awesome-icon icon="asterisk"/></label>
            <input type="password" autocomplete="off" v-model="data.pwd" placeholder="비밀번호"/>
            <label>비밀번호 확인 <font-awesome-icon icon="asterisk"/></label>
            <input type="password" autocomplete="off" v-model="data.checkpwd" placeholder="비밀번호 확인"/>
            <label>연락처 <font-awesome-icon icon="asterisk"/></label>
            <input type="text" autocomplete="off" v-model="data.call" placeholder="연락처"/>
            <button class="btn btn-default" @click="join">가입하기</button>
        </div>
    </div>
    <div id="error-focus"></div>
    <div v-if="msgstack.length > 0" id="error-info">
      <span v-for="(item, index) in msgstack" :key="index">
          <font-awesome-icon icon="square"/> {{item}}
      </span>
    </div>
  </div>
  <div v-if="isCompleted" class="page-container" key="completed">
    <div class="page-content">
        <h2>축하합니다.</h2>
        <h2>{{data.email}}님!</h2>
        <button class="btn btn-default" @click="login">로그인</button>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'JoinForm',
  data () {
    return {
      data: {
        email: '',
        name: '',
        pwd: '',
        checkpwd: '',
        call: ''
      },
      errmsg: {
        name: {
          required: '이름은 필수 입력 값입니다.',
          length: '이름 최대길이는 20자 입니다.'
        },
        pwd: {
          required: '비밀번호는 필수 입력 값입니다.',
          length: '비밀번호 길이는 최소 8자에서 최대 16자까지 입니다.'
        },
        checkpwd: {
          notmatch: '비밀번호가 서로 일치하지않습니다. 다시 확인하시기 바랍니다.'
        },
        call: {
          required: '연락처는 필수 입력입니다.',
          vaild: '연락처가 유효한 형식이 아닙니다.(Ex 010-1234-1112)'
        }
      },
      msgstack: [],
      isCompleted: false
    }
  },
  async created () {
    if (this.$route.query.email) {
      const data = await this.$post({url: '/api/user/checkSendEmail', params: {toEmail: atob(this.$route.query.email)}, errmsg: '잘못된 요청입니다.'})
      if (!data) {
        alert('잘못된 요청 입니다.')
      }
      this.data.email = atob(this.$route.query.email)
    }
  },
  updated () {
    if (this.msgstack.length > 0) document.getElementById('error-focus').scrollIntoView()
  },
  methods: {
    async join () {
      this.msgstack = []
      if (!this.data.name) this.msgstack.push(this.errmsg.name.required)
      if (!this.data.pwd) this.msgstack.push(this.errmsg.pwd.required)
      if (!this.data.call) this.msgstack.push(this.errmsg.call.required)
      if (this.data.name > 20) this.msgstack.push(this.errmsg.name.length)
      if (this.data.pwd < 8 || this.data.pwd > 20) this.msgstack.push(this.errmsg.pwd.length)
      if (this.data.pwd !== this.data.checkpwd) this.msgstack.push(this.errmsg.checkpwd.notmatch)
      if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(this.data.call)) this.msgstack.push(this.errmsg.call.vaild)
      if (this.msgstack.length > 0) {
      } else {
        await this.$post({callback: () => {this.isCompleted = true}, url: '/api/user/insertUser', params: {data: this.data}, errmsg: '사용자 등록처리중 오류가 발생했습니다.'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  height: auto;
  @media (max-width: 700px) {
    margin-top: 0;
  }
}
.page-content {
    width: 500px;
    @media (max-width: 700px) {
        width: 100%;
    }
    h2 {
        text-transform: none;
        margin-bottom: 1rem;
        word-break: break-all;
    }
    .input-form {
      display: flex;
      flex-direction: column;
      label {
        font-weight: 600;
        svg {
          font-size: .5rem;
          color: red;
          margin-bottom: .25rem;
        }
      }
      input {
        margin-bottom: 1rem;
      }
    }
}
#error-info {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
  background-color: rgba(243, 83, 83, 0.541);
  padding: 1rem;
  border-radius: .25rem;
  box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.05), 0 2px 4px 0 rgba(0,0,0,0.05);
  color: rgb(194, 3, 3);
  @media (max-width: 700px) {
    width: 100%;
  }
  span {
    word-break: break-all;
  }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
