<template>
  <div>
    <div class="search">
       <div class="search-wrapper">
         <el-input placeholder="输入关键词" v-model="inValue"></el-input>
         <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
       </div>
    </div>
    <ArticleTemplate :url='url' :keyValue='keyValue' :flag='3' :date2='date2' :date1='date1' v-on:isLogFn = "lisLogFn($event)"></ArticleTemplate>
  </div>
</template>

<script>
  import ArticleTemplate from '../ArticleTemplate.vue';
   export default {
     props: ['date3'],
     data() {
      return {
        keyValue: '',
        url: '/ajax/article/pgPublishNotInPlatform',
        inValue: '',
        date2: false,
        date1:false
       };
     },
     components: {
      ArticleTemplate
     },
     watch: {
       date3: function () {
         this.date2 = this.date2;
       }
     },
     methods: {
     lisLogFn (par) {
        this.$emit('isLogFn', '1');
      },
       search() {
         this.keyValue = this.inValue;
       }
     }
	};
</script>
