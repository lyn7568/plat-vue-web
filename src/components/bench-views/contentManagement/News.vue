<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词" v-model="inValue"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="goPublishArt">发布文章</el-button>
      </div>
    </div>
    <ArticleTemplate :url='url' :keyValue='keyValue' :flag='1'></ArticleTemplate>
  </div>
</template>

<script>
  import ArticleTemplate from '../ArticleTemplate.vue';
   export default {
     data() {
      return {
        keyValue: '',
        url: '/ajax/article/pageQuery',
        inValue: ''
       };
     },
     components: {
          ArticleTemplate
     },
     methods: {
     	 goPublishArt() {
         this.$router.push({path: '/PublishArticle'});
       },
       search() {
         this.keyValue = this.inValue;
       }
     }
   };
</script>
