<template>
  <div class="newsmMain">
    <Sidebar></Sidebar>
    <div class="newsRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="发布中的需求" name="first">
          <DemandTemplate :flag='1'></DemandTemplate>
        </el-tab-pane>
        <el-tab-pane label="已完成的需求" name="second">
          <DemandTemplate :flag='2'></DemandTemplate>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../Sidebar.vue';
  import DemandTemplate from './DemandTemplate.vue';
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components: {
      Sidebar,
      DemandTemplate
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  ul
    .list-item
      cursor: pointer
      .list-info
        .list-tig
          height: 30px
        .list-tagl
          li
            text-ellipsis(2)
            color: $commonFont
        .list-tagy
          li
            margin-right: 70px
  .listMain
    .coGreen
      color: green
    .select
      margin-top: 20px
      .week
        display: inline-block
        margin-right: 40px
        .weekText
          margin: 0 8px
        .el-select
          width: 130px
</style>
