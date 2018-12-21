<template>
  <router-link class="list-item" :to="{name:'resu_show',query:{id:itemSingle.id}}" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-owner">发明人：{{itemSingle.authors.substring(0, itemSingle.authors.length - 1)}}</div>
      <div class="list-desc">申请人：{{itemSingle.reqPerson}}</div>
    </div>
  </router-link>
</template>

<script>
  import util from '@/libs/util';

  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {
        imgUrl: util.defaultSet.img.patent
      };
    },
    created() {
    },
    methods: {
    }
  };
</script>
