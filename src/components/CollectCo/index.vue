<template>
  <div class="collect-block">
    <div v-if="collectShow">
      <span>收藏</span>
      <em v-if="!ifCollect" class="icon-font icon-shoucang" @click="collectionAbout"></em>
      <em v-if="ifCollect" class="icon-font icon-yishoucang" @click="cancelCollectionAbout"></em>
    </div>
    <div v-if="!collectShow">
      <el-button v-if="!ifCollect" type="primary" icon="el-icon-plus" @click="collectionAbout">关注</el-button>
      <el-button v-if="ifCollect" type="info" @click="cancelCollectionAbout">已关注</el-button>
    </div>
  </div>
</template>
<script>
  import { loginStatus } from '@/libs/loginStatus';
  export default {
    props: ['watchOptions'],
    data() {
      return {
        ifCollect: false
      }
    },
    watch: {
      ifCollect(value) {
        this.ifCollect = value
      }
    },
    computed: {
      collectShow() {
        const type = this.watchOptions.type
        return !(type === 1 || type === 2)
      },
      collectText(value) {
        const type = this.watchOptions.type
        return (type === 1 || type === 2) ? '关注' : '收藏'
      }
    },
    created() {
      if (localStorage.getItem('userid')) {
        this.ifcollectionAbout()
      }
    },
    methods: {
      /* 判断是否收藏/关注 */
      ifcollectionAbout() {
        var that = this;
        that.$axios.get('/ajax/collection/check', {
          oid: that.watchOptions.oid,
          type: that.watchOptions.type
        }, function(res) {
          if (res.success) {
            if (res.data) {
              that.ifCollect = true
            } else {
              that.ifCollect = false
            }
          }
        })
      },
      /* 收藏/关注 */
      collectionAbout() {
        var that = this;
        loginStatus(function() {
          that.$axios.post('/ajax/collection/insert', {
            oid: that.watchOptions.oid,
            type: that.watchOptions.type
          }, function(res) {
            if (res.success) {
              if (res.data) {
                that.ifCollect = true
                that.$message({
                  message: `${that.collectText}成功`,
                  type: 'success'
                })
              }
            }
          })
        })
      },
      /* 取消收藏/关注 */
      cancelCollectionAbout() {
        var that = this;
        loginStatus(function() {
          that.$axios.post('/ajax/collection/delete', {
            oid: that.watchOptions.oid,
            type: that.watchOptions.type
          }, function(res) {
            if (res.success) {
              if (res.data) {
                that.ifCollect = false
                that.$message({
                  message: `已取消${that.collectText}`,
                  type: 'success'
                })
              }
            }
          })
        })
      }
    }
  };
</script>
<style scoped>
.collect-block{
  margin-right:15px;
  font-size: 15px;
  line-height: 15px;
}
.collect-block .icon-font{
  display: inline-block;
  width:16px;
  height:16px;
  margin-left:6px;
  cursor: pointer;
  background-size:cover;
}
.collect-block .icon-font.icon-shoucang{
  background-image:url('./img/icon_shoucang_nor.png');
}
.collect-block .icon-font.icon-yishoucang{
  background-image:url('./img/icon_shoucang_hig.png');
}
</style>
