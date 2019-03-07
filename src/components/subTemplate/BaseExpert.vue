<template>
  <a class="list-item" :href="urlHref" :target="noBlank ? '' : '_blank'">
    <div class="list-head list-circular-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
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
      },
      noBlank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        urlHref: ''
      };
    },
    computed: {
      imgUrl() {
        if (this.itemSingle && this.itemSingle.hasHeadImage) {
          return ImageUrl(('head/' + this.itemSingle.id + '_l.jpg'), true)
        } else {
          return defaultSet.img.expert
        }
      }
    },
    created() {
      if (this.noBlank) {
        this.urlHref = `h5.html#/expert?id=${this.itemSingle.id}`;
      } else {
        this.urlHref = `expert.html?id=${this.itemSingle.id}`
      }
    },
    methods: {
    }
  };
</script>

