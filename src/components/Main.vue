<template>
  <div class="main Site">
    <TheHeader :plat="plat"></TheHeader>
    <div class="Site-content">
      <div class="contain-wrapper">
        <transition name="router-fade" mode="out-in">
          <keep-alive>
            <router-view :plat="plat"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <TheFooter :plat="plat"></TheFooter>
  </div>
</template>

<script>
  import TheHeader from './main-views/TheHeader.vue';
  import TheFooter from './main-views/TheFooter.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        plat: {}
      };
    },
    created() {
      this.$http.get('./api/plat').then((response) => {
        response = response.body;
         if (response.errno === ERR_OK) {
          this.plat = response.data;
         };
      });
    },
    components: {
      TheHeader,
      TheFooter
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .Site
    display: flex
    min-height: 100vh
    flex-direction: column
    .Site-content
      flex: 1
      padding-top:20px
      .router-fade-enter-active,
      .router-fade-leave-active
        transition: opacity 0.2s

      .router-fade-enter,
      .router-fade-leave-active
        opacity: 0
</style>
