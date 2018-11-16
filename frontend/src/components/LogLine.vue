<template>
    <div>
        <div class="row content">
            <div class="col-md-2 btn-group-vertical pr-0 mr-3">
                <router-link class="btn btn-outline-info" to="/logline/add">등록</router-link>
            </div>
            <div class="col-md-9 scrollbar">
                <!--
                <div class="row" v-for="(item, index) in loglines" :key="index">
                    <span :class="classObject">{{item}}</span>
                </div>
                -->
                <div class="row card" v-for="(item, index) in loglines" :key="index">
                    <div class="card-body">
                        <h5 class="card-title">{{item.logline_master_title}}</h5>
                        <p class="card-text" v-html="item.logline_master_content"></p>
                        <router-link class="card-link" :to="{name: 'LogLineDetailForm', params: {id: item.logline_master_seq}}">더 보기</router-link>
                        <router-link class="card-link" :to="{name: 'LogLineEditForm', params: {id: item.logline_master_seq}}">편집</router-link>
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
      loglines: []
    }
  },
  async created () {
    const {data} = await this.$http.post('/logline/list')
    this.loglines = data
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
