<template>
  <div class="app-main">
      <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        isRouterAlive: true
      };
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    width: 100%;
    height: 100%;
  }
</style>
