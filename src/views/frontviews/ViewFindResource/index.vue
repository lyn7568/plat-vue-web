<template>
  <div>
    <router-view :plat="plat"></router-view>
  </div>
</template>
<script>
  export default {
    props: {
      plat: {
        type: Object
      }
    }
  };
</script>
