<template>
  <div class="main-content">
    <div class="wrapper-left">
      <div class="block-wrapper search-wrapper">
        <el-input v-model="keyVal" @keyup.enter.native="keywordSearch" placeholder="请输入专利名称、发明人或相关关键词" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="keywordSearch">搜索</el-button>
        </el-input>
      </div>
      <div class="block-wrapper">
        <div class="tab-contain">
          <div v-show="!ifDefault" v-if="platResources.length">
            <baseResult v-for="item in platResources" :key="item.index" :itemSingle="item"></baseResult>
            <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
          </div>
          <defaultPage v-show="ifDefault"></defaultPage>
        </div>
      </div>
    </div>
    <div class="wrapper-right" v-if="adinfo.length">
      <div class="block-wrapper" v-for="item in adinfo" :key="item.index">
        <a class="ad-wrapper" :href="item.adUrl" target="_blank">
          <img :src="item.imgUrl" width="280" height="200">
        </a>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { urlParse } from '@/libs/util';

  import baseResult from '@/components/subTemplate/BaseResult';

  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        adinfo: PLAT.info.adinfo,
        rows: 20,
        dataO: {
          patSortNum: '',
          patCreateTime: '',
          patId: ''
        },
        keyVal: '',
        platResources: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false // 是否缺省
      };
    },
    created() {
      this.keyVal = urlParse('key');
      this.searchResource();
    },
    methods: {
      searchResource() {
        this.$axios.getk('/ajax/ppatent/index/search', {
          key: this.keyVal,
          sortNum: this.dataO.patSortNum,
          createTime: this.dataO.patCreateTime,
          id: this.dataO.patId,
          rows: this.rows
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.patSortNum = $info[$info.length - 1].sortNum;
              this.dataO.patCreateTime = $info[$info.length - 1].createTime;
              this.dataO.patId = $info[$info.length - 1].id;
              this.platResources = this.isFormSearch ? this.platResources.concat($info) : $info;
              this.isFormSearch = true;
              if ($info.length < this.rows) {
                this.loadingModalShow = false;
                this.isFormSearch = false;
              };
            } else {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
            var liLen = this.platResources.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault = true;
            };
          };
        });
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          // this.loadingModalShow = false;
          // this.isLoading = false;
          // this.isFormSearch = false;
          this.searchResource();
        }
      },
      keywordSearch() {
        if (this.keyVal) {
          this.dataO.patSortNum = '',
          this.dataO.patCreateTime = '',
          this.dataO.patId = '',
          this.isFormSearch = true;
          this.loadingModalShow = false;
          this.loadingComplete = true;
          this.isLoading = false;
          this.platResources = [];
          this.ifDefault = false;
          this.searchResource();
        } else {
          this.keyVal = '';
          this.$message({
            message: '请填写搜索资源的关键词',
            type: 'warning'
          });
        }
      }
    },
    components: {
      baseResult
    }
  };
</script>

<style>
 @import '../ViewFindResource/css.css';
</style>
