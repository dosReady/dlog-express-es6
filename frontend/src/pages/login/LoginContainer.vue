<template>
  <div class="page-container">
    <div class="page-content">
        <h1>Dlog, 어서오세요 환영합니다.</h1>
        <div v-if="!isCommon" class="input-group">
            <div class="append">
                <input type="text" v-model="email" placeholder="이메일을 입력해주세요." @keydown="enterEmail"/>
                <button class="btn btn-default" @click="checkEmail">시작</button>
            </div>
        </div>
        <div v-if="isCommon" class="email-area">
            <div class="email">
                <button class="btn-group btn btn-font-default" @click="backEmail">
                    <font-awesome-icon icon="arrow-left" style="margin-right:1rem" />
                    <h4>{{email}}</h4>
                </button>
            </div>
            <div class="input-group">
                <div class="append">
                        <input type="hidden" name="username" :value="email"/>
                        <input type="password" name="password" v-model="pwd" placeholder="비밀번호를 입력해주세요."/>
                        <button class="btn btn-default" @click="login">로그인</button>
                </div>
            </div>
        </div>
        <div class="find-info">
            <ul>
                <li>
                    <router-link to="/">아이디 찾기</router-link>
                </li>
                <li>
                    <router-link to="/">비밀번호 찾기</router-link>
                </li>
            </ul>
        </div>
        <div class="oauth-area">
            <div class="separator"><div class="or">또는</div></div>
            <div class="google-wrap">
                <button class="btn-group btn">
                    <font-awesome-icon :icon="['fab', 'google']" style="margin-right:2rem;" />
                    <h4>google 로그인</h4>
                </button>
            </div>
            <div class="naver-wrap">
                <button class="btn-group btn">
                    <h3>N</h3>
                    <h4>NAVER 로그인</h4>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import pbkdf2 from 'pbkdf2'
export default {
  name: 'LoginContainer',
  data () {
    return {
      email: '',
      pwd: '',
      isCommon: false
    }
  },
  methods: {
    async login () {
      const data = {
        username: this.email,
        password: pbkdf2.pbkdf2Sync(this.pwd, 'salt', 1000, 32, 'sha512').toString('hex')
      }
      await this.$post({url: '/api/user/login', params: data, errmsg: '로그인 처리중 오류가 발생했습니다.'}, this.loginCallback)
    },
    loginCallback (data) {
      this.$store.commit('setAccessToken', data.token)
      this.$router.push('/blog')
    },
    enterEmail (e) {
      if (e.keyCode === 13) this.checkEmail()
    },
    async checkEmail () {
      const data = await this.$post({url: '/api/user/checkExist', params: {email: this.email}, errmsg: '이메일 조회중 오류가 발생했습니다.'})
      if (data) {
        this.isCommon = true
      } else {
        // 임시 alert 적용,  화면에 표출로 변경예정
        if (confirm('해당 이메일로 가입되어 있지않습니다. 회원가입 하시겠습니까?')) {
          await this.$post({url: '/api/user/sendEmail', params: {toEmail: this.email}, msg: '입력하신 이메일로 회원가입 요청메일을 발송하였습니다.', errmsg: '회원가입 요청메일 발송중 오류가 발생했습니다.'})
        } else {
          alert('회원가입을 취소 하였습니다.')
        }
        this.isCommon = false
      }
    },
    async backEmail () {
      this.isCommon = false
      this.email = ''
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
    .find-info {
        ul {
            display: flex;
            justify-content: flex-end;
            li {
                margin-right: .75rem;
                padding-right: .75rem;
                border-right: 1px solid #ced4da;
            }
            li:last-child {
                border-right: none;
                padding-right: 0;
                margin-right:  0;
            }
        }
    }
    .separator {
        width: 100%;
        height: 1px;
        background-color: #ced4da;
        position: relative;
        margin-top: 1rem;
        margin-bottom: 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .or {
            z-index: 15;
            background-color: white;
        }
    }
    .input-group {
        .append {
            flex: 1 1 100%;
        }
    }
    .email-area {
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        .email {
            display: flex;
            height: 4rem;
            margin-bottom: 1rem;
            h4 {
                text-transform: none;
            }
        }
    }
    .google-wrap {
        margin-bottom: 1rem;
        button {
            width: 100%;
            background-color:#d72020;
            border: 1px solid #d72020;
            border-top-right-radius: .25rem;
            border-bottom-right-radius: .25rem;
            color: white;
        }
        button:hover {
            background-color:#861717;
            border: 1px solid #861717;
        }
    }
    .naver-wrap {
        h3 {
            margin-right: 2rem;
            color: white;
            font-weight: 700;
        }
        button {
            width: 100%;
            background-color: #00c73c;
            border: 1px solid #00c73c;
            border-top-right-radius: .25rem;
            border-bottom-right-radius: .25rem;
            color: white;
        }
        button:hover {
            background-color:#02a333;
            border: 1px solid #02a333;
        }
    }
}

</style>
