<template>
  <div class="page-container">
    <div class="page-content">
        <h1>Dlog, 어서오세요 환영합니다.</h1>
        <div v-if="!isCommon" class="input-group">
            <div class="append">
                <input type="text" v-model="email" placeholder="이메일을 입력해주세요."/>
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
                    <input type="password" placeholder="비밀번호를 입력해주세요."/>
                    <button class="btn btn-default">로그인</button>
                </div>
            </div>
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
export default {
  name: 'LoginContainer',
  data () {
    return {
      email: '',
      isCommon: false
    }
  },
  methods: {
    async checkEmail () {
      this.isCommon = true
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
