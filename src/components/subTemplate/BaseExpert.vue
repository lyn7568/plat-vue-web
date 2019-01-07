<template>
  <a class="list-item" :href="'expert.html?id='+itemSingle.id" target="_blank">
    <div class="list-head" style="border-radius: 50%" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-desc">{{itemSingle.title}}</div>
    </div>
  </a>
</template>

<script>
  import { ImageUrl, defaultSet } from '@/libs/util';

  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {};
    },
    computed: {
      imgUrl() {
        if (this.itemSingle.hasHeadImage) {
          return ImageUrl(('head/' + this.itemSingle.id + '_l.jpg'), true)
        } else {
          return defaultSet.img.expert
        }
      }
    },
    created() {
    },
    methods: {
    }
  };
</script>
