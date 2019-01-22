<template>
  <div class="msglist">
    <div class="message-tit">消息列表</div>
    <ul v-if="chatList && chatList.length>0">
      <li v-for="(item, index) in chatList" :key="item.index" class="sessionlist"
        v-show="urlPid===item.pid ? showChatLi : item.actived" :class="{ active: item.pid === selectChatId }"
        @click="handelView(item.pid, item.unread, item.kxUser)">
        <div class="list-left">
          <img class="avatar" width="42" height="42" v-if="item.kxUser" :alt="item.kxUser.img" :src="item.kxUser.img">
          <span class="badge" v-show="item.unread>0">{{item.unread}}</span>
        </div>
        <div class="list-right">
          <p class="name" v-if="item.kxUser">{{item.kxUser.name}}</p>
          <span class="time" v-if="item.opTime">{{TimeTr(item.opTime, true)}}</span>
          <p class="lastmsg" v-if="item.cnt">{{item.cnt}}</p>
        </div>
        <div class="dele">
          <el-button type="danger" icon="el-icon-delete" circle @click.stop="handerDel(item.pid, index)"></el-button>
        </div>
      </li>
    </ul>
    <div v-else class="no-message">暂无消息</div>
  </div>
</template>

<script>
import queryBase from '@/libs/queryBase'
import { urlParse, defaultSet, ImageUrl, TimeTr } from '@/libs/util'
export default {
  data() {
    return {
      kxUserIdArr: [],
      chatList: [],
      refreshListTime: '',
      TimeTr: TimeTr,
      urlPid: ''
    }
  },
  watch: {
    chatLsit(val) {
      this.chatLsit = val
    },
    selectChatId(val) {
      this.selectChatId = val
      clearTimeout(this.refreshListTime)
      this.queryChatList()
    },
    selectKxUser(val) {
      this.selectKxUser = val
    },
    kxUserIdArr(val) {
      this.kxUserIdArr = val
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'selectChatId',
      'selectKxUser',
      'chatListLocal'
    ]),
    showChatLi() {
      return this.kxUserIdArr.indexOf(this.urlPid) > -1
    }
  },
  created() {
    this.urlPid = urlParse('id')
    this.queryChatList()
  },
  methods: {
    queryChatList() {
      var that = this
      this.$axios.get('/ajax/msg/idxList', {}, function(res) {
        if (res.success && res.data) {
          const dataS = res.data
          that.$store.dispatch('chatListLocalAction', dataS)
          if (that.urlPid) {
            var hasId = false
            for (let j = 0; j < dataS.length; ++j) {
              if (dataS[j].pid === that.urlPid) {
                hasId = true
                that.$store.dispatch('ifFirstChatActiion', true)
                break
              }
            }
            if (!hasId) {
              dataS.unshift({
                uid: localStorage.getItem('userid'),
                pid: urlParse('id'),
                cnt: '',
                opTime: '',
                unread: 0,
                actived: true
              })
            }
          }
          var num = 0
          if (dataS.length > 0) {
            for (let i = 0; i < dataS.length; ++i) {
              (function(item, num) {
                num++
                queryBase.getProfessor(item.pid, function(sc, value){
                  num--
                  if (sc) {
                    if (value.hasHeadImage) {
                      value.img = ImageUrl(('head/' + value.id + '_l.jpg'), true)
                    } else {
                      value.img = defaultSet.img.expert
                    }
                    item.kxUser = value
                    that.$forceUpdate()
                  }
                })
                that.kxUserIdArr.push(item.pid)
              })(dataS[i], num)
            }
            if (num === 0) {
              that.chatList = dataS
            }
          }
          if (that && !that._isDestroyed) {
            that.refreshListTime = setTimeout(() => {
              if (that && !that._isDestroyed) {
                that.queryChatList()
              }
            }, 1000)
          } else {
            that.refreshListTime = ''
          }
        }
      })
    },
    handelView(id, num, us) {
      this.$store.dispatch('selectSession', id)
      this.$store.dispatch('selectKxUserAction', us)
      for (let m = 0; m < this.chatListLocal.length; ++m) {
        if (this.chatListLocal[m].pid === id) {
          this.$store.dispatch('ifFirstChatActiion', true)
          break
        }
      }
      if (num > 0) {
        this.readedOperate(id)
      }
    },
    readedOperate(id) {
      this.$axios.post('/ajax/msg/readed', {
        pid: id
      }, function(res) {
        if (res.success && res.data) {}
      })
    },
    handerDel(id, index) {
      this.$axios.post('/ajax/msg/delete', {
        pid: id
      }, function(res) {
        if (res.success && res.data) {
          this.chatList.splice(index, 1)
        }
      })
    }
  },
  beforeDestroy() {
    var that = this
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(that.refreshListTime)
    })
  }
}
</script>

<style scoped>
  .msglist{
    height: 540px;
    overflow-y: auto;
  }
  .msglist .message-tit{
    text-align:center;
    color: #666;
    line-height:60px;
    font-size: 16px;
    border-bottom: 1px solid #d8d8d8; 
  }
  .msglist .no-message{
    text-align:center;
    color: #999;
    font-size: 14px;
    line-height:100px;
  }
  .msglist .sessionlist{
    display: flex;
    padding: 12px;
    transition: background-color .1s;
    font-size: 0;
    position:relative;
    cursor: pointer;
  }
  .msglist .sessionlist .dele{
    display: none;
    position: absolute;
    right: 10px;
    z-index: 20;
    top: 20px;
  }
  .msglist .sessionlist .dele .el-button.is-circle{
    padding:6px;
  }
  .msglist .sessionlist:hover {
    background-color: rgb(220,220,220);
  }
  .msglist .sessionlist:hover .dele{
    display: block;
  }
  .msglist .sessionlist.active {
    background-color: #c4c4c4;
  }
  .msglist .sessionlist .list-left{
    position: relative;
    vertical-align: middle;
    display: inline-block;
  }
  .msglist .sessionlist .list-left .badge{
    position: absolute;
    right: 2px;
    top: -5px;
    background-color: #f56c6c;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
  }
  .msglist .sessionlist .avatar{
    border-radius: 50%;
    margin-right: 12px;
  }
  .msglist .sessionlist .list-right{
    position: relative;
    flex: 1;
    margin-top: 4px;
    font-size: 14px;
    line-height: 20px;
  }

  .msglist .sessionlist .list-right .name{
    display: inline-block;
    vertical-align: top;
    color: #333;
  }
  .msglist .sessionlist .list-right .time{
    float: right;
    color: #999;
    font-size: 10px;
    vertical-align: top;
  }
  .msglist .sessionlist .list-right .lastmsg{
    position: absolute;
    font-size: 12px;
    width: 100%;
    height: 20px;
    color: #999;
    bottom: 2px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
</style>
