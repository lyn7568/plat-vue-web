<template>
  <router-link class="list-item" :class="isShowImg(itemSingle.catalog)" :to="{name:'con_show',query:{id:itemSingle.id}}" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit">{{itemSingle.title}}</div>
      <ul class="list-tag">
        <li>{{itemSingle.modifyTime}}</li>
      </ul>
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
        imgUrl: this.itemSingle.imgUrl || util.defaultSet.img.article
      };
    },
    methods: {
      isShowImg(catalog) {
        if (catalog === '1' || catalog === '2') {
          return ''
        } else {
          return 'list-item-info'
        }
      }
    }
  };
</script>
