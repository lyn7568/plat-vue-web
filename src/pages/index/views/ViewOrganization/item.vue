<template>
  <a class="block-item org-item" :href="'org.html?id='+itemSinger.id" target="_blank">
    <div class="item-block-org">
      <div class="item-pic-org">
        <img :src="itemSinger.logo">
      </div>
      <div class="item-text-org">
        <div class="item-tit-org"><span>{{itemSinger.name}}</span><em class="authicon" :class="{'icon-com': itemSinger.authStatus==='3'}"></em></div>
        <p class="item-tag-org">{{itemSinger.industry}}</p>
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    props: ['itemSinger'],
    created() {
    },
    methods: {
    }
  };
</script>
