<template>
  <a class="list-item" :href="urlHref" :target="noBlank ? '' : '_blank'">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-owner" v-if="itemSingle.authors">发明人：{{itemSingle.authors.substring(0, itemSingle.authors.length - 1)}}</div>
      <div class="list-desc">申请人：{{itemSingle.reqPerson}}</div>
    </div>
  </a>
</template>

<script>
  import { defaultSet } from '@/libs/util';

  export default {
    props: {
      itemSingle: {
        type: Object
      },
      noBlank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imgUrl: defaultSet.img.patent,
        urlHref: ''
      };
    },
    created() {
      if (this.noBlank) {
        this.urlHref = `h5.html#/result?id=${this.itemSingle.id}`;
      } else {
        this.urlHref = `result.html?id=${this.itemSingle.id}`
      }
    },
    methods: {
    }
  };
</script>
