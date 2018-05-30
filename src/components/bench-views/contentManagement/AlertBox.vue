<template>
  <div>
    <div class="search">
       <div class="search-wrapper">
         <el-input placeholder="输入关键词" v-model="inValue"></el-input>
         <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
       </div>
    </div>
    <ArticleTemplate :url='url' :keyValue='keyValue' :flag='3'></ArticleTemplate>
  </div>
</template>

<script>
  import ArticleTemplate from '../ArticleTemplate.vue';
   export default {
     data() {
      return {
        keyValue: '',
        url: '/ajax/article/pgPublishNotInPlatform',
        inValue: ''
       };
     },
     components: {
      ArticleTemplate
     },
     methods: {
       search() {
         this.keyValue = this.inValue;
       }
     }
	};
</script>
