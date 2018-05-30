<template>
  <a class="list-item" :href="linkArticle(itemInfo)">
    <div class="list-head" :style="{backgroundImage: 'url(' + articleUrl(itemInfo) + ')'}"></div>
    <div class="list-info">
      <div class="list-tit">{{itemInfo.articleTitle}}</div>
      <ul class="list-tag">
        <li>发布者</li>
        <li>{{formTime(itemInfo)}}</li>
        <li>阅读量 1000</li>
        <li>赞 99</li>
        <li>留言 109</li>
      </ul>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
  import util from '@/libs/util';

  export default {
    props: {
      itemInfo: {
        type: Object
      }
    },
    methods: {
      articleUrl(item) {
        return item.articleImg ? util.ImageUrl('article/' + item.articleImg) : util.defaultSet.img.article;
      },
      linkArticle(item) {
        return util.defaultSet.link.article + item.articleId;
      },
      formTime(item) {
        return util.commenTime(item.publishTime);
      }
    }
  };
</script>
