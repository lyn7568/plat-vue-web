<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="searchList">
      <BusTemplate></BusTemplate>
    </div>
  </div>
</template>

<script>
  import BusTemplate from '../BusTemplate.vue';
  export default {
    components: {
      BusTemplate
    }
  };
</script>
