<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">
        添加文章
        </el-button>
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
    <el-dialog title="添加企业发布的文章至【企业动态】栏目" :visible.sync="dialogVisible" width="930px">
        <AlertBox></AlertBox>
    </el-dialog>
  </div>
</template>

<script>
  import ArticleTemplate from '../ArticleTemplate.vue';
  import AlertBox from './AlertBox.vue';
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    components: {
      ArticleTemplate,
      AlertBox
    },
    methods: {
    }
 };
</script>
