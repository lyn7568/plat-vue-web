<template>
  <transition name="fade" mode="out-in">
    <router-view :key="key" :plat="plat"></router-view>
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      plat: {}
    };
  },
  mounted() {
    /* eslint-disable no-undef */
    this.plat = PLAT.info;
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
    }
  }
};
</script>
