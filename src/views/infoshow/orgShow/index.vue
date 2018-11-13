<template>
  <div>
		<div class="block-wrapper">
      <div class="content-wrapper">
        ghdfgfhdhfd
      </div>
    </div>
		<BackTop></BackTop>
  </div>
</template>

<script>
	export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    watch: {
     '$route' (to, from) {
        if (this.$route.query.flag) {
          this.activeName = this.$route.query.flag; // 监听flag变化
        }
      }
    },
    components: {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .tab-wrapper
    padding:10px 20px
    color: $commonFont
    li
      display:inline-block
      margin-right:20px
      cursor: pointer
      &.active
        color: $mainColor
    .el-tabs
      width:100%
    .el-tabs__header
      margin: 0 0 4px
    .el-tabs__nav-wrap::after
      content:none
    .el-tabs__content
      margin:0 -20px
      .tab-contain
        width:100%
        border-top:20px solid #f4f6f8
</style>
