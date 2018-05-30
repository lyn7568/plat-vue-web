<template>
  <a class="list-item" :href="linkResource(itemResources)">
    <div class="list-head" :style="{backgroundImage: 'url(' + resourcesUrl(itemResources) + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemResources.name}}</div>
      <div class="list-owner">发布者<em class="authicon icon-pro"></em></div>
      <div class="list-desc">用途：{{itemResources.cnt}}</div>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
  import util from '@/libs/util';

  export default {
    props: {
      itemResources: {
        type: Object
      }
    },
    methods: {
      resourcesUrl(item) {
        return item.images ? util.ImageUrl('resource/' + item.images.split(',')[0]) : util.defaultSet.img.resource;
      },
      linkResource(item) {
        return util.defaultSet.link.resource + item.id;
      }
    }
  };
</script>
