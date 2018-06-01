<template>
  <div class="newsLeft">
    <ul>
      <li>工作台</li>
      <li :class='{bg:manage}' @click="content1">内容管理</li>
      <li :class='{bg:compan}' @click="com1">企业管理</li>
      <li :class='{bg:searDemand}' @click="demand1">需求查询</li>
      <li :class='{bg:servi}' @click="serice1">对接服务</li>
      <li @click="goHome">返回</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['manage', 'compan', 'searDemand', 'servi'],
    methods: {
      content1() {
        this.$router.push({ path: '/ContentManagement' });
      },
      com1() {
        this.$router.push({ path: '/BusinessManagement' });
      },
      demand1() {
        this.$router.push({ path: '/DemandSearch' });
      },
      serice1() {
        this.$router.push({ path: '/ButtService' });
      },
      goHome() {
        this.$router.push({ path: '/home' });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './Siderbar.styl'
  .newsLeft
    ul
      .bg
        background-color: $mainColor
        color: #fff
</style>
