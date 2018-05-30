<template>
  <a class="list-item" :href="linkWare(itemServices)">
    <div class="list-head" :style="{backgroundImage: 'url(' + waresUrl(itemServices) + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemServices.name}}</div>
      <div class="list-owner">发布者<em class="authicon icon-pro"></em></div>
      <div class="list-desc">内容：{{itemServices.cnt}}</div>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
  import util from '@/libs/util';

  export default {
    props: {
      itemServices: {
        type: Object
      }
    },
    methods: {
      waresUrl(item) {
        return item.images ? util.ImageUrl('ware/' + item.images.split(',')[0]) : util.defaultSet.img.service;
      },
      linkWare(item) {
        return util.defaultSet.link.service + item.id;
      }
    }
  };
</script>
