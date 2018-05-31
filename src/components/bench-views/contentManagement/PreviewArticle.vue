<template>
  <div class="previewArticle block-wrapper main-content">
    <div class="wrapper-left content-wrapper">
      <div class="detail-info">
        <h2 class="article-title">{{articleInfo.articleTitle}}</h2>
        <div class="article-tip">此处将显示发布时间</div>
        <div class="article-head" :style="{backgroundImage: 'url(' + articleUrl(articleInfo) + ')'}"></div>
        <div class="article-content" v-html="articleInfo.articleContent"></div>
        <ul class="tagList">
          <li v-for="item in articleInfo.subject" :key="item.index">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="wrapper-right">
      <div class="block-wrapper content-wrapper article-owner">
        <div class="owner-head">
          <img :src="logoUrl" />
        </div>
        <div class="owner-name">{{platInfo.name}}</div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script type="text/ecmascript-6">
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';

  export default {
    data() {
      return {
        platInfo: '',
        logoUrl: '',
        articleId: '',
        ownerId: '',
        articleInfo: ''
      };
    },
    created() {
      this.articleId = util.urlParse('id');
      this.getArticleInfo();
    },
    methods: {
      getArticleInfo() {
        this.$axios.get(httpUrl.kxQurey.article.query, {
          params: {
            articleId: this.articleId
          }
        }).then((res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.subject) {
              $info.subject = $info.subject.split(',');
            };
            this.articleInfo = $info;
            this.ownerId = $info.ownerId;
            this.getPlatInfo();
          };
        });
      },
      getPlatInfo() {
        this.$axios.get(httpUrl.hQuery.baseInfo.query, {
          params: {
            id: this.ownerId
          }
        }).then((res) => {
          if (res.success) {
            var $info = res.data;
            this.platInfo = $info;
            this.logoUrl = util.ImageUrl('platform' + res.data.logo);
          };
        });
      },
      articleUrl(item) {
        return item.articleImg ? util.ImageUrl('article/' + item.articleImg) : util.defaultSet.img.article;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.previewArticle
  .detail-info
    .article-title
      font-size: 20px
      line-height: 32px
      color: #000
    .article-tip
      font-size: 14px
      color: $secondaryFont
      line-height: 30px
    .article-head
      width: 100%
      height: 300px
      margin: 24px 0
      background-position: center
      background-size: cover
      background-repeat: no-repeat
    .article-content
      font-size: 16px
      color: $mainFont
      line-height: 28px
      word-break: break-word
      p
        margin-bottom: 16px
    .tagList
      margin: 16px 0 2px
      display:flex;
      flex-wrap:wrap
      li
        margin-right: 10px
        margin-bottom: 10px
        padding: 0 12px
        color: $commonFont
        border: 1px solid $borderColor
        border-radius: 20px
        font-size: 14px
        line-height: 30px
  .article-owner
    display:flex
    justify-content:center
    flex-direction: column
    align-items: center
    text-align:center
    .owner-head
      center-items(210px,140px)
    .owner-name
      margin-top:10px
      font-size:16px
      color:$mainFont
</style>
