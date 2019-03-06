<template>
  <div class="page-view">
    <img :src="logImg" style="display:none" />
    <span>浏览量 {{pageCount}}</span>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: [ 'pageObj' ],
    data() {
      return {
        HT_API: process.env.HT_API,
        pageCount: 0,
        logImg: ''
      }
    },
    created() {
      this.queryPageView()
      this.wlog(this.pageObj)
    },
    methods: {
      wlog(obj) {
        this.logImg = this.HT_API + '/ajax/img?__lt=' + obj.tn + '&id=' + obj.id + '&src=' + obj.src + '&_t=' + (new Date().getTime())
      },
      queryPageView() {
        var that = this
        axios.get(that.HT_API + '/ajax/log/qo/sum',{
          params: {
            tn: that.pageObj.tn,
            id: that.pageObj.id
          }
        }).then(res => {
          if (res.data.success) {
            that.pageCount = res.data.data
          }
        }).catch(err => {})
      },
      logPageCount() {
        // this.$axios.get('/ajax/log', {
        //   __lt: this.pageObj.tn,
        //   id: this.pageObj.id,
        //   src: this.pageObj.src
        // }, (res) => {})
      }
    }
  };
</script>
<style>
.page-view{
  display: inline-block;
  margin-right:15px;
}
</style>
