<template>
  <a class="list-item" :href="'product.html?id='+itemSingle.id" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-desc" v-if="itemSingle.cnt">简介：{{itemSingle.cnt}}</div>
    </div>
  </a>
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
        imgUrl: this.itemSingle.img ? util.strToArr(this.itemSingle.img)[0] : util.defaultSet.img.product
      };
    },
    created() {
    },
    methods: {
    }
  };
</script>
