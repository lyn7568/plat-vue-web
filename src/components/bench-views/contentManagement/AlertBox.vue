<template>
  <div>
    <div class="search">
       <div class="search-wrapper">
         <el-input placeholder="输入关键词"></el-input>
         <el-button type="primary" icon="el-icon-search">搜索</el-button>
       </div>
    </div>
    <div class="searchList">
      <ul>
        <ArticleTemplate></ArticleTemplate>
      </ul>
      <div class="taglist">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticleTemplate from '../ArticleTemplate.vue';
   export default {
     components: {
      ArticleTemplate
     }
	};
</script>
