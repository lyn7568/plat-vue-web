<template>
  <div class="main Site">
    <TheHeader></TheHeader>
    <Navbar></Navbar>
    <div class="Site-content">
      <div class="contain-wrapper">
        <con></con>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import { TheHeader, TheFooter, Navbar } from './components';
  import con from '../personalCenter/common/index';

  export default {
    name: 'layout',
    components: {
      TheHeader,
      TheFooter,
      con,
      Navbar
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .Site{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    .Site-content{
      flex: 1;
      padding-top:20px;
      .router-fade-enter-active,
      .router-fade-leave-active{
        transition: opacity 0.2s;
      }

      .router-fade-enter,
      .router-fade-leave-active{
        opacity: 0;
      }
    }
  }
</style>
