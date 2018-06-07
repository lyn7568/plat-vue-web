<template>
  <div class="newsmMain">
    <Sidebar :manage='false' :compan='true' :searDemand='false' :servi='false'></Sidebar>
    <div class="newsRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="入驻企业" name="first">
          <BusRight></BusRight>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../Sidebar.vue';
  import BusRight from './BusRight.vue';
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components: {
      Sidebar,
      BusRight
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  ul
    .list-item
      .list-info
        .list-tig
          height: 30px
</style>
