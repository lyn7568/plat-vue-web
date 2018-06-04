<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词" v-model="inValue"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">
        添加文章
        </el-button>
      </div>
    </div>
    <ArticleTemplate :url='url' :keyValue='keyValue' :flag='2' :date1='date1' :date2='date2' v-on:isLogFn = "lisLogFn($event)"></ArticleTemplate>
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
        dialogVisible: false,
        keyValue: '',
        url: '/ajax/article/pgPublishInPlatform',
        inValue: '',
        date1: false,
        date2: false
      };
    },
    components: {
      ArticleTemplate,
      AlertBox
    },
    methods: {
      lisLogFn (par) {
        
        if (par === '1') {
          this.date1 = !this.date1;
           console.log(this.date1);
        } else {
          alert(par)
          this.date2 = !this.date2;
          console.log(this.date2);
        }
      },
      search() {
        this.keyValue = this.inValue;
      }
    }
 };
</script>
