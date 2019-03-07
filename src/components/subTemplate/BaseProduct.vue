<template>
  <a class="list-item" :href="urlHref" :target="noBlank ? '' : '_blank'">
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
      },
      noBlank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imgUrl: this.itemSingle.img ? strToArr(this.itemSingle.img)[0] : defaultSet.img.product,
        urlHref: ''
      };
    },
    created() {
      if (this.noBlank) {
        this.urlHref = `h5.html#/product?id=${this.itemSingle.id}`;
      } else {
        this.urlHref = `product.html?id=${this.itemSingle.id}`
      }
    },
    methods: {
    }
  };
</script>
