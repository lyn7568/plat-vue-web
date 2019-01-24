<template>
  <div class="main-content">
    <div class="wrapper-left">
      <div class="block-wrapper search-wrapper">
        <el-input v-model="keyVal" @keyup.enter.native="keywordSearch" placeholder="请输入资源名称、用途、发布者或相关关键词" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="keywordSearch">搜索</el-button>
        </el-input>
      </div>
      <div class="block-wrapper">
        <!-- <div class="content-wrapper tab-wrapper">
          <div class="tab-lable">资源类型：</div>
          <ul class="tab-sort">
            <li>不限</li>
            <li>检测服务</li>
          </ul>
        </div> -->
        <div class="tab-contain" v-loading="loading">
          <div v-show="!ifDefault" v-if="platResources.length">
            <baseResource v-for="item in platResources" :key="item.index" :itemSingle="item"></baseResource>
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

  import baseResource from '@/components/subTemplate/BaseResource';

  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        adinfo: PLAT.info.adinfo,
        rows: 20,
        dataO: {
          resSortNum: '',
          resTime: '',
          resId: ''
        },
        keyVal: '',
        platResources: [],
        loading: true,
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false // 是否缺省
      };
    },
    components: {
      baseResource
    },
    created() {
      this.keyVal = urlParse('key');
      this.searchResource();
    },
    methods: {
      searchResource() {
        this.$axios.getk('/ajax/resource/index/search', {
          key: this.keyVal,
          sortNum: this.dataO.resSortNum,
          publishTime: this.dataO.resTime,
          id: this.dataO.resId,
          rows: this.rows
        }, (res) => {
          this.loading = false
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.resSortNum = $info[$info.length - 1].sortNum;
              this.dataO.resTime = $info[$info.length - 1].publishTime;
              this.dataO.resId = $info[$info.length - 1].resourceId;
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
          this.dataO.resSortNum = '';
          this.dataO.resTime = '';
          this.dataO.resId = '';
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
    }
  };
</script>

<style>
 @import './css.css';
</style>
