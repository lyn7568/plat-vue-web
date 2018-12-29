<template>
  <div class="main Site">
    <TheHeader></TheHeader>
    <div class="Site-content">
      <div class="contain-wrapper">
        <el-menu class="navbar" mode="horizontal">
          <div class="tag-breadcrumb">当前位置：</div><breadcrumb></breadcrumb>
        </el-menu>
        <com></com>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import { TheHeader, TheFooter } from '@/layout';
  import com from '../common/index';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'layout',
    components: {
      TheHeader,
      TheFooter,
      com,
      Breadcrumb
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar{
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  border-radius: 0px !important;
  background:none;
  overflow:hidden;
  margin:-20px 0;
  border-bottom: none;
  .hamburger-container{
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .tag-breadcrumb{
    float:left;
    font-size: 14px;
    line-height: 50px;
    margin-left: -10px;
  }
}
</style>
