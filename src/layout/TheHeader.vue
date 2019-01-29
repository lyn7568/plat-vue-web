<template>
  <div class="header">
    <div class="top-wrapper minw-block">
      <div class="contain-wrapper">
        <div class="wrapper-left">
          <a :href="plat.website" class="a-link" target="_blank">{{plat.name}}</a>
          <span> X </span>
          <a :href="kexiuLink" target="_blank" class="a-link">科袖网</a>
          <span>联合为您服务</span>
        </div>
        <div class="wrapper-right">
          <div v-if="account">
            <!-- <a class="marLeft marLeft_1" href='/#/inform'><el-badge :value="informCount" :max="99">通知</el-badge></a> -->
            <a class="marLeft marLeft_1" href='/#/miniChat'><el-badge :value="unreadCount" :max="99">消息</el-badge></a>
            <el-dropdown>
              <span class="el-dropdown-link" style="cursor:pointer">
                {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <a href="center.html#/modifyData"><el-dropdown-item>修改资料</el-dropdown-item></a>
                <a href="center.html#/myDemands"><el-dropdown-item>我的需求</el-dropdown-item></a>
                <a href="center.html#/companyInformation" v-if="bindCompany"><el-dropdown-item>我的企业</el-dropdown-item></a>
                <a href="center.html#/attentionCollect"><el-dropdown-item>关注收藏</el-dropdown-item></a>
                <a href="center.html#/index"><el-dropdown-item>账户设置</el-dropdown-item></a>
                <div @click="logout"><el-dropdown-item divided>退出登录</el-dropdown-item></div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <a class="marLeft marLeft_1" href='/#/loginPlat'>请登录</a>
            <a class="marLeft marLeft_1" href='/#/register' tag="a">立即注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-wrapper minw-block" :style="{backgroundImage: 'url(' + plat.bannerurl + ')'}">
    </div>
    <div class="nav-wrapper minw-block">
      <div class="contain-wrapper">
        <div class="nav-menu">
          <a v-for="item in navArr" :key="item.url" :href="'/#/'+item.url" :class="activeCl(item.url)">{{item.tit}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ekexiuUrl } from '@/libs/util';
  import { MessageBox } from 'element-ui'

  export default {
    data() {
      return {
        navArr: [
          {
            url: 'home',
            tit: '首页'
          },
          {
            url: 'trends',
            tit: '平台动态'
          },
          {
            url: 'serve',
            tit: '找服务'
          },
          {
            url: 'reso',
            tit: '找资源'
          },
          {
            url: 'resu',
            tit: '找成果'
          },
          {
            url: 'exp',
            tit: '专家库'
          },
          {
            url: 'org',
            tit: '服务机构'
          },
          {
            url: 'comp',
            tit: '入驻企业'
          },
          {
            url: 'about',
            tit: '关于平台'
          }
        ],
        kexiuLink: ekexiuUrl,
        plat: '',
        unreadCount: 0,
        informCount: 0,
        refreshUnread: ''
      };
    },
    computed: {
      ...Vuex.mapGetters([
        'account',
        'bindCompany'
      ])
    },
    mounted () {
      /* eslint-disable no-undef */
      this.plat = PLAT.info;
      if (!this.account) {
        this.$store.dispatch('GetUserInfo').then(res => {})
      }
    },
    created() {
      if (localStorage.getItem('userid')) {
        this.queryMsgUnread()
        this.queryInformCount()
      }
    },
    methods: {
      activeCl(url) {
        if (this.$route && this.$route.name) {
          return this.$route.name === url ? 'active' : ''
        } else {
          return sessionStorage.getItem('isSelect') === url ? 'active' : ''
        }
      },
      logout() {
        var that = this
        MessageBox.confirm('您确认要退出登录吗?', '提示', {
          type: 'warning',
          center: true
        }).then(() => {
          that.$axios.get('/ajax/sys/logout', {}, function(res) {
            if (res.success) {
              localStorage.removeItem('userid')
              localStorage.removeItem('uaccount');
              localStorage.removeItem('bcid')
              location.href = '/#/loginPlat'
            }
          })
        }).catch(() => {})
      },
      queryMsgUnread() {
        var that = this
        this.$axios.get('/ajax/msg/unread', {}, function(res) {
          if (res.success) {
            that.unreadCount = res.data
            if (that && !that._isDestroyed) {
              that.refreshUnread = setTimeout(() => {
                that.queryMsgUnread()
              }, 1000)
            } else {
              that.refreshUnread = ''
            }
          }
        })
      },
      queryInformCount() {
        // var that = this
        // this.$axios.get('/ajax/inform/unread', {}, function(res) {
        //   if (res.success) {
        //     that.informCount = res.data
        //     if (that && !that._isDestroyed) {
        //       that.refreshInformCount = setTimeout(() => {
        //         that.queryInformCount()
        //       }, 1000)
        //     } else {
        //       that.refreshInformCount = ''
        //     }
        //   }
        // })
      }
    },
    beforeDestroy() {
      var that = this
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(that.refreshUnread)
        // clearTimeout(that.refreshInformCount)
      })
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.el-menu-item,.el-menu--horizontal,.el-menu--horizontal .el-menu-item{
  border:none;
}
.header .top-wrapper{
  width: 100%;
  height: 30px;
  line-height: 30px;
  @include bg-grey-color();
}
.header .top-wrapper .contain-wrapper{
  font-size:14px;
  overflow:hidden;
}
.header .top-wrapper .contain-wrapper .marLeft{
  display:inline-block;
  margin-left:20px;
  min-width:62px;
}
.header .top-wrapper .contain-wrapper .marLeft .el-badge{
  padding-right: 10px;
}
.header .top-wrapper .contain-wrapper .marLeft .el-badge .el-badge__content.is-fixed{
  top: 12px;
  right: 15px;
  border: none;
  line-height: 16px;
}
.header .top-wrapper .contain-wrapper .marLeft.marLeft_1{
  min-width:0;
}
.header .top-wrapper .contain-wrapper .wrapper-left{
  float:left;
}
.header .top-wrapper .contain-wrapper .wrapper-right{
  float:right;
}
.header .top-wrapper .contain-wrapper .wrapper-right .el-dropdown{
  color:#c4c3c3;
  margin-left:20px;
}
.header .top-wrapper .contain-wrapper .wrapper-right .el-menu-item,
.header .top-wrapper .contain-wrapper .wrapper-right .el-submenu__title{
  padding:0 10px;
  margin-left:20px;
  line-height:30px;
  height:30px;
}
.header .banner-wrapper{
  width:100%;
  height:200px;
  background-size:cover;
  background-position:center;
}
.header .nav-wrapper{
  @include bg-blue-color();
}
.header .nav-wrapper .nav-menu{
  display: flex;
}
.header .nav-wrapper .nav-menu a{
  display: inline-block;
  padding:0 25px;
  height:40px;
  line-height:40px;
  text-align: center;
  cursor: pointer;
  color: #fff;
}
.header .nav-wrapper .nav-menu .active{
  @include bg-blue-active-color();
}
</style>
