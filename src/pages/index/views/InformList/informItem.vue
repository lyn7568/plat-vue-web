<template>
  <a class="list-item" :href="'product.html?id='+itemSingle.id" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-tag" v-if="showTime">{{itemSingle.createTime}}</div>
      <div class="list-desc" v-if="itemSingle.cnt && !showTime">简介：{{itemSingle.cnt}}</div>
    </div>
  </a>
</template>

<script>
  import { defaultSet, strToArr } from '@/libs/util';

  export default {
    props: {
      itemSingle: {
        type: Object
      },
      showTime: {
        type: Boolean
      }
    },
    data() {
      return {
        imgUrl: this.itemSingle.img ? strToArr(this.itemSingle.img)[0] : defaultSet.img.product
      };
    },
    created() {
    },
    methods: {
    }
  };
</script>
