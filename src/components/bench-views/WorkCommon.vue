<template>
  <div class="main Site">
    <TheHeader></TheHeader>
    <div class="Site-content paddingTop">
      <div class="contain-wrapper">
        <transition name="router-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <TheFooter :plat="plat"></TheFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import TheHeader from './WorkHead.vue';
  import TheFooter from '../main-views/TheFooter.vue';

  export default {
    data() {
      return {
        plat: ''
      };
    },
    mounted() {
      /* eslint-disable no-undef */
      this.plat = PLAT.info;
    },
    components: {
      TheHeader,
      TheFooter
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './workCommon'
  .Site
    display: flex
    min-height: 100vh
    flex-direction: column
    .Site-content
      flex: 1
      &.paddingTop
        padding-top:80px
      .router-fade-enter-active,
      .router-fade-leave-active
        transition: opacity 0.2s

      .router-fade-enter,
      .router-fade-leave-active
        opacity: 0
</style>
