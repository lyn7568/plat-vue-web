<template>
  <a class="list-item" :href="'company.html?id='+itemSingle.id" target="_blank">
    <div class="list-head">
      <div class="item-pic-org">
        <img :src="item.logo">
      </div>
    </div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-desc" v-if="item.industry">{{item.industry.join(' | ')}}</div>
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
