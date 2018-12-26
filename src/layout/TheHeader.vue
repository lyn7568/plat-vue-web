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
            <!-- <router-link class="marLeft" to='/loginPlat' tag="a">通知(99+)</router-link>
            <router-link class="marLeft" to='/loginPlat' tag="a">消息(99+)</router-link> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <a href="center.html#/modifyData" target="_blank"><el-dropdown-item>修改资料</el-dropdown-item></a>
                <a href="center.html#/myDemand"><el-dropdown-item>我的需求</el-dropdown-item></a>
                <a href="center.html#/companyInformation"><el-dropdown-item>我的企业</el-dropdown-item></a>
                <a href="center.html#/modifyData"><el-dropdown-item>首都创新券</el-dropdown-item></a>
                <a href="center.html#/modifyPassword"><el-dropdown-item>账户设置</el-dropdown-item></a>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
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
          <a v-for="item in navArr" :key="item.url" :href="'/#/'+item.url" :class="{'active': currentPath === item.url}">{{item.tit}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ekexiuUrl } from '@/libs/util';
  import Cookies from 'js-cookie';
  import { mapGetters } from 'vuex'

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
        currentPath: 'home',
        kexiuLink: ekexiuUrl,
        plat: '',
        plf_user: ''
      };
    },
    computed: {
      ...mapGetters([
        'account'
      ])
    },
    mounted () {
      /* eslint-disable no-undef */
      this.plat = PLAT.info;
      document.title = this.plat.title;
      Cookies.set('platId', process.env.PLAT_ID);
      Cookies.set('platSource', this.plat.source);
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu-item,.el-menu--horizontal,.el-menu--horizontal .el-menu-item{
    border:none;
  }
  .header{
    .top-wrapper{
      width: 100%;
      height: 30px;
      line-height: 30px;
      @include bg-grey-color();
      .contain-wrapper{
        font-size:14px;
        overflow:hidden;
        .marLeft{
          display:inline-block;
          margin-left:20px;
          min-width:62px;
          &.marLeft_1{
            min-width:0;
          }
        }
        .wrapper-left{
          float:left;
        }
        .wrapper-right{
          float:right;
          .el-dropdown{
            color:#c4c3c3;
            margin-left:20px;
          }
          .el-menu-item,.el-submenu__title{
            padding:0 10px;
            margin-left:20px;
            line-height:30px;
            height:30px;
          }
        }
      }
    }
    .banner-wrapper{
      width:100%;
      height:200px;
      background-size:cover;
      background-position:center;
    }
    .nav-wrapper{
      @include bg-blue-color();
      .nav-menu{
        display: flex;
        a{
          display: inline-block;
          padding:0 25px;
          height:40px;
          line-height:40px;
          text-align: center;
          cursor: pointer;
          color: #fff;
        }
        .active{
          @include bg-blue-active-color();
        }
      }
    }
  }

</style>
