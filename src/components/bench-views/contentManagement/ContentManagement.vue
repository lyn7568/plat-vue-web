<template>
  <div class="newsmMain">
    <Sidebar :manage='true' :compan='false' :searDemand='false' :servi='false'></Sidebar>
    <div class="newsRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="平台管理" name="first">
          <News></News>
        </el-tab-pane>
        <el-tab-pane label="企业动态" name="second">
          <Dynamic></Dynamic>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../Sidebar.vue';
  import News from '../contentManagement/News.vue';
  import Dynamic from '../contentManagement/Dynamic.vue';
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components: {
      Sidebar,
      News,
      Dynamic
    }
  };
</script>
