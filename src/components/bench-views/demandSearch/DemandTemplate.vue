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
        <li class="list-item">
          <div class="list-info">
            <div class="list-tit list-tig">2017年“浙江杰出青年”揭晓，祝贺中科院宁波材料所王立平研究员上榜中科院宁波材料所王立平研究员上榜！</div>
            <ul class="list-tag">
              <li>北京科袖科技有限公司</li>
              <li>发布于</li>
              <li>5月8日 18:00</li>
              <li>浏览量 1000</li>
            </ul>
            <ul class="list-tag list-tagl">
              <li>北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司北京科袖科技有限公司11</li>
            </ul>
            <ul class="list-tag list-tagy">
              <li>所在城市：北京市</li>
              <li>预计周期：1个月内</li>
              <li>费用预算：1万元以内</li>
              <li class="coRed">有效期至：2018年8月17日</li>
            </ul>
          </div>
        </li>
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
