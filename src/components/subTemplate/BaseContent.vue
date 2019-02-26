<template>
  <a class="list-item" :class="isShowImg(itemSingle.catalog)" :href="'content.html?id='+itemSingle.id" target="_blank">
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
      }
    },
    data() {
      return {
        imgUrl: this.itemSingle.imgUrl || defaultSet.img.article
      };
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
