<template>
  <div class="contain-wrapper">
    <el-menu class="navbar" mode="horizontal">
      <div class="tag-breadcrumb">当前位置：</div><breadcrumb></breadcrumb>
    </el-menu>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';

export default {
  data() {
    return {
      showBol: false
    };
  },
  watch: {
    $route(to, from) {
      const whiteList = ['/home', '/platTrends', '/findServe', '/findResource', '/findResult', '/expertPool', '/cooperationAgency', '/regAgency', '/about'];
      if (whiteList.indexOf(to.path) === -1) {
        this.showBol = true;
      };
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
  }
};
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.navbar
  height: 50px
  line-height: 50px
  padding: 0 12px
  border-radius: 0px !important
  background:none
  overflow:hidden
  margin-bottom:-20px
  .hamburger-container
    line-height: 58px
    height: 50px
    float: left
    padding: 0 10px
  .tag-breadcrumb
    float:left
    font-size: 14px
    line-height: 50px
    margin-left: -10px
</style>
