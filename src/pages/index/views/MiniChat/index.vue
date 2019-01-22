<template>
  <div class="chatBox">
    <div class="sidebar">
      <v-list></v-list>
    </div>
    <div class="main">
      <div v-show="selectChatId">
        <v-message></v-message>
        <v-text></v-text>
      </div>
    </div>
  </div>
</template>
<script>
  import queryBase from '@/libs/queryBase'
  import { urlParse, defaultSet, ImageUrl, TimeTr } from '@/libs/util'
  import VList from './components/list'
  import VText from './components/text'
  import VMessage from './components/message'
  export default {
    data() {
      return {
        urlParamsId: ''
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'selectChatId'
      ])
    },
    components: {
      VList,
      VText,
      VMessage
    },
    created() {
      var that = this
      if (urlParse('id')) {
        that.urlParamsId = urlParse('id')
        queryBase.getProfessor(that.urlParamsId, function(sc, value){
          if (sc) {
            if (value.hasHeadImage) {
              value.img = ImageUrl(('head/' + value.id + '_l.jpg'), true)
            } else {
              value.img = defaultSet.img.expert
            }
            that.$store.dispatch('selectKxUserAction', value)
          }
        })
        that.$store.dispatch('selectSession', that.urlParamsId)
      } else {
        that.$store.dispatch('selectKxUserAction', '')
        that.$store.dispatch('selectSession', '')
      }
    }
  }
</script>
<style scoped>
  .chatBox {
    display: flex;
    overflow:hidden;
    margin-bottom: 20px;
    background: #fff;
  }
  .chatBox .sidebar, .main {
      height: 100%;
  }
  .chatBox .sidebar {
      float: left;
      width: 260px;
      color: #f4f4f4;
      border-right: 1px solid #ddd;
  }
  .chatBox .main {
      flex: 1;
      position: relative;
      overflow: hidden;
      height: 540px;
      background-color: #eee;
  }
  .chatBox .main::after{
    width: 100%;
    position: absolute;
    content: '点击左侧列表，查看对话记录';
    font-size: 14px;
    color: #999;
    line-height: 540px;
    text-align: center;
  }
  .chatBox .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
  }
  .chatBox .message {
      height: 380px;
      background: #fff;
  }
</style>
