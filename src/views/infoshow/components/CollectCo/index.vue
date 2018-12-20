<template>
  <div class="collect-block">
    <span>收藏</span>
    <em style="cursor: pointer;" class="icon-font" :class="ifCollect ? 'icon-yishoucang' : 'icon-shoucang'" @click="collectFun"></em>
  </div>
</template>
<script>
  export default {
    props: {
      ifCollect: {
        type: Boolean
      }
    },
    mounted() {
    },
    methods: {
      collectFun() {
        this.ifCollect = !this.ifCollect;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.collect-block{
  margin-right:15px;
  font-size: 15px;
  line-height: 15px;
  .icon-font{
    display: inline-block;
    width:16px;
    height:16px;
    margin-left:6px;
    background-size: cover;
    &.icon-shoucang{
      @include bg-image('/static/comimg/g_all_icon_shoucang_nor.png');
    }
    &.icon-yishoucang{
      @include bg-image('/static/comimg/g_all_icon_shoucang_hig.png');
    }
  }
}
</style>
