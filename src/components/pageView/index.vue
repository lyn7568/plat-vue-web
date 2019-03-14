<template>
  <div class="page-view">
    <img :src="logImg" style="display:none" />
    <span v-if="!pageObj.noShow">浏览量 {{pageCount}}</span>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: [ 'pageObj' ],
    data() {
      return {
        HT_API: process.env.HT_API,
        KX_API: process.env.KX_API,
        platform: process.env.PLAT_ID,
        pageCount: 0,
        logImg: ''
      }
    },
    created() {
      if (!this.pageObj.noShow) {
        this.queryPageView()
      }
      this.wlog(this.pageObj)
    },
    methods: {
      wlog(obj) {
        if (obj.tn === 'ware' || obj.tn === 'resource' || obj.tn === 'ppatent') {
          this.logImg = this.KX_API + '/ajax/img?__lt=' + obj.tn + '&id=' + obj.id + '&src=' + obj.src + '&platform=' + this.platform + '&_t=' + (new Date().getTime())
        } else {
          this.logImg = this.HT_API + '/ajax/img?__lt=' + obj.tn + '&id=' + obj.id + '&src=' + obj.src + '&_t=' + (new Date().getTime())
        } 
      },
      queryPageView() {
        var that = this
        let obj = {
            tn: that.pageObj.tn,
            id: that.pageObj.id
          }
        let url = that.HT_API;
        if (obj.tn === 'ware' || obj.tn === 'resource' || obj.tn === 'ppatent') {
          obj.platform = this.platform
          url = this.KX_API
        }
        axios.get( url + '/ajax/log/qo/sum',{
          params: obj
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
}
</style>
