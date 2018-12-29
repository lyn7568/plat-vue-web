<template>
  <a class="list-item" :href="'org.html?id='+itemSingle.orgId" target="_blank">
    <div class="list-head">
      <div class="item-pic-org">
        <img :src="itemSingle.logo">
      </div>
    </div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-desc" v-if="itemSingle.industry">{{itemSingle.industry.join(' | ')}}</div>
    </div>
  </a>
</template>

<script>
  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {
    }
  };
</script>
