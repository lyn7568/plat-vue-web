<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="专家" name="first">专家</el-tab-pane>
    <el-tab-pane label="机构" name="second">机构</el-tab-pane>
    <el-tab-pane label="服务" name="third">服务</el-tab-pane>
    <el-tab-pane label="资源" name="fourth">资源</el-tab-pane>
    <el-tab-pane label="专利" name="fiveth">专利</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
