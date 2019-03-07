<template>
  <a class="list-item" :class="isShowImg(itemSingle.catalog)" :href="urlHref" :target="noBlank ? '' : '_blank'">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit">{{itemSingle.title}}</div>
      <ul class="list-tag">
        <li>{{itemSingle.modifyTime}}</li>
      </ul>
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
        imgUrl: this.itemSingle.imgUrl || defaultSet.img.article,
        urlHref: ''
      };
    },
    created() {
      if (this.noBlank) {
        this.urlHref = `h5.html#/content?id=${this.itemSingle.id}`;
      } else {
        this.urlHref = `content.html?id=${this.itemSingle.id}`
      }
    },
    methods: {
      isShowImg(catalog) {
        if (catalog === '1' || catalog === '2' || catalog === '5') {
          return ''
        } else {
          return 'list-item-info'
        }
      }
    }
  };
</script>
