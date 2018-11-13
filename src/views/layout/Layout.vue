<template>
  <div class="main Site">
    <TheHeader></TheHeader>
    <Navbar></Navbar>
    <div class="Site-content">
      <div class="contain-wrapper">
        <AppMain></AppMain>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import { TheHeader, TheFooter, AppMain, Navbar } from './components';

  export default {
    name: 'layout',
    components: {
      TheHeader,
      TheFooter,
      AppMain,
      Navbar
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

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
