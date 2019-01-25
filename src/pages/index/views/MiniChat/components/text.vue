<!-- 文本输入框 -->
<template>
  <div class="text">
    <textarea ref="text" v-model="content" @keyup="keyEnter"></textarea>
    <div class="send" @click="send">
    	<span>发送(Enter)</span>
    </div>
    <transition name="appear">
	    <div class="warn" v-show="warn">
	    	<div class="description">不能发送空白信息</div>
	    </div>
	</transition>
  </div>
</template>

<script>
import { DateFormat } from '@/libs/util'
export default {
  data () {
    return {
      content: '',
      frequency: 0,
      warn: false,
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'selectChatId',
      'ifFirstChat',
      'chatDetailLocal'
    ])
  },
  watch: {
    ifFirstChat(val) {
      this.ifFirstChat = val
    }
  },
  methods: {
    keyEnter(e) {
      if (e.keyCode === 13) {
        this.send()
      }
    },
    send() {
      var that = this
      if (that.content.length <= 1) {
        that.warn = true
        that.content = ''
        setTimeout(() => {
          that.warn = false
        }, 1000)
        return
      }
      var url = '/ajax/msg/fsend'
      if (that.ifFirstChat) {
        url = '/ajax/msg/send'
      }
      that.$axios.post(url, {
        pid: that.selectChatId,
        cnt: that.content
      }, function(res) {
        if (res.success && res.data) {
          var msg = {
            cnt: that.content,
            opTime: DateFormat('yyyyMMddhhmmss'),
            msgType: '1',
          }
          that.chatDetailLocal.push(msg)
          that.chatDetailLocal.sort(function(a, b) {
            return a.opTime > b.opTime ? 1 : (a.opTime === b.opTime ? 0 : -1)
          })
          that.$store.dispatch('chatDetailAction', that.chatDetailLocal)
          that.content = ''
        }
      })
    }
  },
  mounted() {
    this.$refs.text.focus()
  },
  watch: {
    selectChatId() {
      setTimeout(() => {
        this.$refs.text.focus()
      }, 0)
    },
    content() {
      if (this.content === '') {
        if ( this.frequency === 0) {
          this.warn = true
          this.frequency++
          setTimeout(() => {
            this.warn = false
          }, 1000)
        }
      }
    }
  }
}
</script>

<style scoped>
  .text{
    position: relative;
    height: 160px;
    background: #fff;
    z-index: 10;
  }
  .text textarea{
    box-sizing: border-box;
    padding: 10px 30px;
    height: 110px;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
  .text .send{
    position: absolute;
    bottom: 10px;
    right: 30px;
    padding: 0 20px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;
    cursor: pointer;
  }
  .text .send:hover{
    background: #2693ec;
    color: #fff;
  }
  .text .warn{
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow:0 1px 5px 1px #bdbdbd;
  }
  .text .warn.appear-enter-active, .text .warn.appear-leave-active{
    transition: all 1s;
  }
  .text .warn.appear-enter, .text .warn.appear-leave-active{
    opacity: 0;
  }
  .text .warn::before{
    content: " ";
    position: absolute;
    top: 100%;
    right: 20px;
    border: 7px solid transparent;
    border-top-color: #fff;
    filter:drop-shadow(1px 3px 2px #bdbdbd);
  }
</style>