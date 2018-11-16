<template>
    <div>
        <div class="row content">
            <div class="col-sm-2 btn-group-vertical mr-3 pr-0">
                <router-link class="btn btn-outline-info" to="/logline/reg">등록</router-link>
            </div>
            <div class="col-sm-9 scrollbar">
                <!--
                <div class="row" v-for="(item, index) in loglines" :key="index">
                    <span :class="classObject">{{item}}</span>
                </div>
                -->
                <div class="row card">
                    <div class="card-body">
                        <h5 class="card-title">샘플 제목</h5>
                        <h6 class="card-subtitle mb-2 text-muted">샘플 주제</h6>
                        <p class="card-text">샘플 내용입니다.</p>
                        <router-link class="card-link" to="/logline/sampleid/detail">더 보기</router-link>
                        <router-link class="card-link" to="/logline/sampleid/edit">편집</router-link>
                    </div>
                </div>

                <div class="row card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>

                <div class="row card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>

                <div class="row card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>

                <div class="row card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>

                <div class="row card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LogLine',
  data () {
    return {
      inputText: '',
      loglines: []
    }
  },
  methods: {
    fninput (event) {
      if (event.keyCode === 13) {
        this.loglines.push(this.inputText)
        this.inputText = ''
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
  }
}
</script>

<style scoped>
.row {
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 0px;
}
.content {
    height: 100vh;
}
.scrollbar {
    height: 100vh;
    overflow-y: scroll;
}

.btn-group-vertical {
    max-height: 15%
}
</style>
