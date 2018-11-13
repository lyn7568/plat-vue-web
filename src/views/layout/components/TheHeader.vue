<template>
  <div class="header">
    <div class="top-wrapper minw-block">
      <div class="contain-wrapper">
        <div class="wrapper-left">
          <a :href="plat.website" class="a-link" target="_blank">{{plat.name}}</a>
          <span> X </span>
          <a :href="kexiuLink" target="_blank" class="a-link">科袖网</a>
          <span>联合为您服务</span>
          <!-- <a :href="kexiuLink + '/cmp-portal/cmp-settled-log.html'" class="a-link marLeft" target="_blank">进入企业版</a> -->
        </div>
        <div class="wrapper-right">
          <div v-if="plf_user && plf_user!=='null' && plf_user!==null">
            <router-link class="marLeft" to='/loginPlat' tag="a">通知(99+)</router-link>
            <router-link class="marLeft" to='/loginPlat' tag="a">消息(99+)</router-link>
            <el-dropdown>
              <span class="el-dropdown-link">
                用户名称<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改资料</el-dropdown-item>
                <el-dropdown-item>我的需求</el-dropdown-item>
                <el-dropdown-item>我的企业</el-dropdown-item>
                <el-dropdown-item>首都创新券</el-dropdown-item>
                <el-dropdown-item>账户设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-menu
              router
              class="el-menu-demo menu-top"
              mode="horizontal"
              background-color="#373d41"
              text-color="#c4c3c3"
              active-text-color="#ffffff">
              <el-menu-item index="/loginPlat">通知(99+)</el-menu-item>
              <el-menu-item index="/regPlat">消息(99+)</el-menu-item>
              <el-submenu index="3" background-color="#ffffff">
                <template slot="title">用户名称</template>
                <el-menu-item index="2-1">修改资料</el-menu-item>
                <el-menu-item index="2-2">我的需求</el-menu-item>
                <el-menu-item index="2-3">我的企业</el-menu-item>
                <el-menu-item index="2-4">首都创新券</el-menu-item>
                <el-menu-item index="2-5">账户设置</el-menu-item>
                <el-menu-item index="2-6">退出登录</el-menu-item>
              </el-submenu>
            </el-menu> -->
          </div>
          <div v-else>
            <router-link class="marLeft" to='loginPlat' tag="a">请登录</router-link>
            <router-link class="marLeft" to='loginPlat' tag="a">立即注册</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-wrapper minw-block" :style="{backgroundImage: 'url(' + plat.bannerurl + ')'}">
    </div>
    <div class="nav-wrapper minw-block">
      <div class="contain-wrapper">
        <ul>
          <router-link to="/home" active-class="active" tag="li">首页</router-link>
          <router-link to="/platTrends" active-class="active" tag="li">平台动态</router-link>
          <router-link to="/findServe" active-class="active" tag="li">找服务</router-link>
          <router-link to='/findResource' active-class="active" tag="li">找资源</router-link>
          <router-link to="/findResult" active-class="active" tag="li">找成果</router-link>
          <router-link to='/expertPool' active-class="active" tag="li">专家库</router-link>
          <router-link to='/cooperationAgency' active-class="active" tag="li">服务机构</router-link>
          <router-link to='/regAgency' active-class="active" tag="li">入驻企业</router-link>
          <router-link to='/about' active-class="active" tag="li">关于平台</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import util from '@/libs/util';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        kexiuLink: util.ekexiuUrl,
        plat: '',
        plf_user: ''
      };
    },
    mounted () {
      /* eslint-disable no-undef */
      this.plat = PLAT.info;
      this.plf_user = Cookies.get('plf_user');
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-menu-item,.el-menu--horizontal,.el-menu--horizontal .el-menu-item
    border:none
  .header
    .top-wrapper
      width: 100%
      height: 30px
      line-height: 30px
      bg-grey-color()
      .contain-wrapper
        font-size:14px
        overflow:hidden
        .marLeft
          display:inline-block
          margin-left:20px
          min-width:62px
        .wrapper-left
          float:left
        .wrapper-right
          float:right
          .el-dropdown
            color:#c4c3c3
            margin-left:20px
          .el-menu-item,.el-submenu__title
            padding:0 10px
            margin-left:20px
            line-height:30px
            height:30px
    .banner-wrapper
      width:100%
      height:200px
      background-size:cover
      background-position:center
    .nav-wrapper
      bg-blue-color()
      ul
        display: flex
        li
          display: inline-block
          padding:0 25px
          height:40px
          line-height:40px
          text-align: center
          cursor: pointer
        .active
          bg-blue-active-color()

</style>
