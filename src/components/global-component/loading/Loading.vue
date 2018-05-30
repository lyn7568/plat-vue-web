<template>
  <div class="loadSty">
    <el-button :type="loadingComplete?'text':'primary'" :class="{}" :loading="isLoading" @click="up">{{loadMessage()}}</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isLoading: {
        type: Boolean
      },
      loadingComplete: {
        type: Boolean
      }
    },
    data() {
      return {
        loadCon: '点击加载更多'
      };
    },
    methods: {
      loadMessage() {
        if (this.isLoading) {
          this.loadCon = '加载中';
        } else {
          if (this.loadingComplete) {
            this.loadCon = '没有更多数据了';
          } else {
            this.loadCon = '点击加载更多';
          }
        };
        return this.loadCon;
      },
      up() {
        this.$emit('upup', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loadSty
    display:flex
    justify-content: center
    padding:20px 0
</style>
