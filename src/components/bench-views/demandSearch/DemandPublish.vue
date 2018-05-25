<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="select">
      <div class="week">
        <span class="weekText">周期：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="week">
        <span class="weekText">预算：</span>
        <el-select v-model="budgetValue" placeholder="请选择">
          <el-option
            v-for="item in budget"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="week">
        <span class="weekText">排序：</span>
        <el-select v-model="sortValue" placeholder="请选择">
          <el-option
            v-for="item in sort"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="searchList">
      <ul>
        <DemandTemplate></DemandTemplate>
      </ul>
      <div class="taglist">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
   import DemandTemplate from './DemandTemplate.vue';
   export default {
     data() {
       return {
         options: [{
           value: '选项1',
           label: '全部'
         }, {
           value: '选项2',
           label: '1个月内'
         }, {
           value: '选项3',
           label: '1-3个月'
         }, {
           value: '选项4',
           label: '3-6个月'
         }, {
           value: '选项5',
           label: '6-12个月'
         }, {
           value: '选项6',
           label: '1年以上'
         }],
         value: '全部',
         budget: [{
           value: '选项1',
           label: '1万元以内'
         }, {
           value: '选项2',
           label: '5-10万元'
         }, {
           value: '选项3',
           label: '10-20万元'
         }, {
           value: '选项4',
           label: '20-50万元'
         }, {
           value: '选项5',
           label: '50万元以上'
         }, {
           value: '选项6',
           label: '全部'
         }],
         budgetValue: '全部',
         sort: [{
           value: '选项1',
           label: '最新发布'
         }, {
           value: '选项2',
           label: '即将到期'
         }],
         sortValue: '最新发布'
       };
     },
     components: {
         DemandTemplate
     }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .listMain
    .select
      margin-top: 10px
      .week
        border: 1px solid #e4e7ed
        display: inline-block
        margin-right: 40px
        .weekText
          margin: 0 8px
          .el-select
            width: 130px
</style>
