<template>
  <div class="newsmMain">
    <Sidebar></Sidebar>
    <div class="newsRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="专家顾问" name="first">
          <ExpertAdvisor></ExpertAdvisor>
        </el-tab-pane>
        <el-tab-pane label="合作机构" name="second">
          <BusTemplate></BusTemplate>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../Sidebar.vue';
  import BusTemplate from '../BusTemplate.vue';
  import ExpertAdvisor from './ExpertAdvisor.vue';
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components: {
      Sidebar,
      BusTemplate,
      ExpertAdvisor
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../workCommon'
  ul
    .list-item
      .list-info
        .list-tig
          height: 30px
        .headerTag
          li
            text-ellipsis(1)
</style>
