<template>
  <div class="main Site">
    <TheHeader></TheHeader>
    <div class="Site-content">
      <div class="contain-wrapper">
        <AppMain></AppMain>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import { TheHeader, TheFooter, AppMain } from '@/layout';

  export default {
    name: 'layout',
    components: {
      TheHeader,
      TheFooter,
      AppMain
    }
  };
</script>
