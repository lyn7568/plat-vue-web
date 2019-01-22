<template>
  <div class="contact-block">
    <el-button type="primary" @click="contactChat" :disabled="contactOptions.type ? disableClick : false">联系</el-button>
  </div>
</template>
<script>
  import { loginStatus } from '@/libs/loginStatus';
  export default {
    props: ['contactOptions'],
    data() {
      return {
        disableClick: true,
        orglinkmans: []
      }
    },
    created() {
      if (this.contactOptions.type) {
        this.getDefaultLink()
      }
    },
    methods: {
      getDefaultLink() {
        var that = this
        this.$axios.getk('/ajax/org/linkman/queryAll',{
          oid: that.contactOptions.oid
        }, function(data) {
          if (data.success) {
            var $data = data.data;
            if ($data.length > 0) {
              that.disableClick = false
              for (var i = 0; i < $data.length; i++) {
                that.orglinkmans.push($data[i].pid)
              }
            } else {
              that.disableClick = true
            }
          }
        })
      },
      contactChat() {
        var that = this;
        loginStatus(function() {
          var linkId = that.contactOptions.oid
          if (that.contactOptions.type) {
            linkId = that.orglinkmans[0]
          }
          location.href='/#/miniChat?id='+ linkId
        })
      }
    }
  }
</script>
<style scoped>
.contact-block{
  margin-right:15px;
  font-size: 15px;
  line-height: 15px;
}
</style>
