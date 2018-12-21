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
          </div>
          <div v-else>
            <router-link class="marLeft marLeft_1" to='loginPlat' tag="a">请登录</router-link>
            <router-link class="marLeft marLeft_1" to='loginPlat' tag="a">立即注册</router-link>
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
          <router-link to="/trends" active-class="active" tag="li">平台动态</router-link>
          <router-link to="/serve" active-class="active" tag="li">找服务</router-link>
          <router-link to='/reso' active-class="active" tag="li">找资源</router-link>
          <router-link to="/resu" active-class="active" tag="li">找成果</router-link>
          <router-link to='/exp' active-class="active" tag="li">专家库</router-link>
          <router-link to='/org' active-class="active" tag="li">服务机构</router-link>
          <router-link to='/comp' active-class="active" tag="li">入驻企业</router-link>
          <router-link to='/about' active-class="active" tag="li">关于平台</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
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
      ul{
        display: flex;
        li{
          display: inline-block;
          padding:0 25px;
          height:40px;
          line-height:40px;
          text-align: center;
          cursor: pointer;
        }
        .active{
          @include bg-blue-active-color();
        }
      }
    }
  }

</style>
