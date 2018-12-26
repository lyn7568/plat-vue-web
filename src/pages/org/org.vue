<template>
  <div class="main Site">
    <TheHeader></TheHeader>
    <div class="Site-content">
      <div class="contain-wrapper">
        <showTemplate></showTemplate>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import { TheHeader, TheFooter } from '@/layout';
  import showTemplate from './show';

  export default {
    name: 'layout',
    components: {
      TheHeader,
      TheFooter,
      showTemplate
    }
  };
</script>
