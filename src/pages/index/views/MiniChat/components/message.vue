<template>
	<div class="message" v-if="selectChatId">
		<header class="header">
			<div class="friendname" v-if="selectKxUser">{{selectKxUser.name}} <span>{{selectKxUser.title}} {{selectKxUser.orgName}}</span></div>
      <a :href="'expert.html?id='+selectChatId"><el-button type="text">查看对方资料</el-button></a>
		</header>
		<div class="message-wrapper" ref="list">
      <ul v-if="chatDetailLocal && chatDetailLocal.length>0">
        <li v-for="(item,index) in chatDetailLocal" :key="item.index" class="message-item">
          <div class="time" v-if="!compareTwo(index, item.opTime)"><span>{{TimeTr(item.opTime, true)}}</span></div>
          <div class="main" :class="{ self: item.msgType }">
              <img class="avatar" width="36" height="36" :src="item.msgType ? headPhoto : selectKxUser.img" />
              <div class="content">
                  <div class="text" v-html="item.cnt"></div>
              </div>
          </div>
        </li>
      </ul>
		</div>
	</div>
</template>

<script>
import { TimeTr } from '@/libs/util'
export default {
  data() {
    return {
      TimeTr: TimeTr
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'headPhoto',
      'selectChatId',
      'selectKxUser',
      'kxLastTime',
      'chatDetailLocal'
    ])
  },
  watch: {
    chatDetailLocal() {
      var that = this
      setTimeout(() => {
        that.$refs.list.scrollTop = that.$refs.list.scrollHeight
      }, 0)
    },
    selectChatId(val) {
      this.selectChatId = val
      clearTimeout(this.refreshChatTime)
      this.querySelectChatInfo()
    },
    selectKxUser(val) {
      this.selectKxUser = val
    }
  },
  created() {
    if (this.selectChatId) {
      this.querySelectChatInfo()
    }
  },
  mounted() {
    var that = this
    //  在页面加载时让信息滚动到最下面
    if (that.$refs.list) {
      setTimeout(() => {
        that.$refs.list.scrollTop = that.$refs.list.scrollHeight
      }, 0)
    }
  },
  methods: {
    querySelectChatInfo() {
      var that = this
      this.$axios.get('/ajax/msg/rec', {
        pid: that.selectChatId
      } ,function(res) {
        if (res.success && res.data) {
          const dataS = res.data
          if (dataS.length > 0) {
            for (let i = 0; i < dataS.length; ++i) {
              if (dataS[i].msgType === 0) {
                that.$store.dispatch('kxLastTimeAction', dataS[i].opTime)
              }
            }
          }
          that.$store.dispatch('chatDetailAction', dataS)
          that.queryRefreshChatDetal()
        }
      })
    },
    queryRefreshChatDetal() {
      var that = this
      this.$axios.get('/ajax/msg/refrec', {
        pid: that.selectChatId,
        opTime: that.kxLastTime
      } ,function(res) {
        if (res.success && res.data) {
          const dataS = res.data
          if (dataS.length > 0) {
            that.$store.dispatch('kxLastTimeAction', dataS[dataS.length - 1].opTime)
            dataS.map((item) => {
              that.chatDetailLocal.push(item)
            })
            that.chatDetailLocal.sort(function(a, b) {
              return a.opTime > b.opTime ? 1 : (a.opTime === b.opTime ? 0 : -1)
            })
            that.$store.dispatch('chatDetailAction', that.chatDetailLocal)
          }
          if (that && !that._isDestroyed) {
            that.refreshChatTime = setTimeout(() => {
              that.queryRefreshChatDetal()
            }, 1000)
          } else {
            that.refreshChatTime = ''
          }
        }
      })
    },
    /*超过时间10min*/
    timeCTen(t) {
      var d = new Date()
      d.setFullYear(parseInt(t.substring(0, 4)))
      d.setMonth(parseInt(t.substring(4, 6)) - 1)
      d.setDate(parseInt(t.substring(6, 8)))
      d.setHours(parseInt(t.substring(8, 10)))
      d.setMinutes(parseInt(t.substring(10, 12)))
      d.setSeconds(parseInt(t.substring(12, 14)))
      return d.getTime()
    },
    compareTwo(index, b) {
      var f = 0
      var l = this.timeCTen(b)
      let s = 10 * 60 * 1000
      if (index !== 0) {
        f = this.timeCTen(this.chatDetailLocal[index - 1].opTime)
      }
      let k = (l - f) - s
      return k < 0
    }
  },
  beforeDestroy() {
    var that = this
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(that.refreshChatTime)
    })
  }
}
</script>

<style scoped>
  .message{
    width: 100%;
    height: 450px;
  }
  .message .header{
    height: 60px;
    padding: 10px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between;
    align-items: center
  }
  .message .header .friendname{
    font-size: 18px;
    color: #666;
  }
  .message .header .friendname span {
    font-size: 15px;
    color: #999;
  }
  .message .message-wrapper{
      min-height: 320px;
      max-height: 320px;
      padding: 10px 15px;
      box-sizing: border-box;
      overflow-y: auto;
      border-bottom: 1px solid #e7e7e7;
  }
  .message .message-wrapper .message-item{
    margin: 4px 0;
  }
  .message .message-wrapper .message{
    margin-bottom: 15px
  }
  .message .message-wrapper .time{
    width: 100%;
    font-size: 12px;
    margin: 7px auto;
    text-align: center;
  }
  .message .message-wrapper .time span{
    display: inline-block;
    padding: 4px 6px;
    color: #fff;
    border-radius: 3px;
    background-color: #dcdcdc;
  }
  .message .message-wrapper .main .avatar {
    float: left;
    margin-left: 15px;
    border-radius: 50%;
  }
  .message .message-wrapper .main .content{
    display: inline-block;
    margin-left: 10px;
    position: relative;
    padding: 6px 10px;
    max-width: 330px;
    min-height: 36px;
    line-height: 24px;
    box-sizing: border-box;
    font-size: 14px;
    text-align: left;
    background-color: #e2e1da;
    border-radius: 4px;
    overflow: hidden;
  }
  .message .message-wrapper .main .content .text {
    word-wrap: break-word;
  }
  .message .message-wrapper .main .content:before{
    content: " ";
    position: absolute;
    top: 12px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #e2e1da;
  }
  .message .message-wrapper .self{
    text-align: right;
  }
  .message .message-wrapper .self .avatar{
    float: right;
    margin:0 15px;
  }
  .message .message-wrapper .self .content {
    background-color: #91c8f5;
  }
  .message .message-wrapper .self .content:before {
    right: -12px;
    vertical-align: middle;
    border-right-color: transparent;
    border-left-color: #91c8f5;
  }
</style>
