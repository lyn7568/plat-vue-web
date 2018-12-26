<template>
  <div class="main-content">
    <div class="boxLeft">
        <div class="headPhoto">
          <div class="userInfo">
            <img :src="headPhoto" alt="">
            <p>专家姓名</p>
          </div>
        </div>
         <el-menu
      default-active="modifyData"
      router
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
       <el-menu-item index="modifyData">
        <i class="el-icon-menu"></i>
        <span slot="title">修改资料</span>
      </el-menu-item>
      <el-submenu index="demand">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的需求</span>
        </template>
         <el-menu-item index="myDemand">我的需求</el-menu-item>
        <el-menu-item index="modifyDemand">修改需求</el-menu-item>
        <el-menu-item index="examineDemand">查看需求</el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="bindCompany">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的企业</span>
        </template>
        <el-menu-item index="companyInformation">企业信息</el-menu-item>
        <el-menu-item index="companyProduct">企业产品</el-menu-item>
         <el-menu-item index="publishProduct">发布产品</el-menu-item>
      </el-submenu>
      <el-menu-item index="attentionCollect">
        <i class="el-icon-menu"></i>
        <span slot="title">关注收藏</span>
      </el-menu-item>
      <el-menu-item index="modifyPassword">
        <i class="el-icon-setting"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
    </el-menu>
    </div>
    <div class="boxRight">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        img: ''
      };
    },
    computed: {
      ...mapGetters([
        'bindCompany',
        'headPhoto'
      ])
    },
    created() {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .boxRight
    float: left
    width: 900px
    margin-left: 15px
    box-sizing: border-box
  .boxLeft
    float: left
    overflow: hidden
    width: 200px
    .headPhoto
      height: 146px
      margin-bottom: 10px
      border: 1px solid #ebebeb
      display: flex
      justify-content: center
      align-items: center
      .userInfo
        text-align: center
        color: #606266
        p
          margin-top: 10px
        img
          width: 80px
          height: 80px
          border-radius: 50%
</style>
