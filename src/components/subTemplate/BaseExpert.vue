<template>
  <a class="list-item" :href="'expert.html?id='+itemSingle.id" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-desc">{{itemSingle.title}}</div>
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
      return {};
    },
    computed: {
      imgUrl() {
        if (this.itemSingle.hasHeadImage) {
          return util.ImageUrl(('head/' + this.itemSingle.id + '_l.jpg'), true)
        } else {
          return util.defaultSet.img.expert
        }
      }
    },
    created() {
    },
    methods: {
    }
  };
</script>
