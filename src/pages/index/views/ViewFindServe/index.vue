<template>
  <div class="main-content">
    <div class="wrapper-left">
      <div class="block-wrapper search-wrapper">
        <el-input v-model="keyVal" @keyup.enter.native="keywordSearch" placeholder="请输入服务内容、发布者或相关关键词" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="keywordSearch">搜索</el-button>
        </el-input>
      </div>
      <div class="block-wrapper">
        <!-- <div class="content-wrapper tab-wrapper">
          <div class="tab-lable">服务类型：</div>
          <ul class="tab-sort">
            <li>不限</li>
            <li>检测服务</li>
          </ul>
        </div> -->
        <div class="tab-contain" v-loading="loading">
          <div v-show="!ifDefault" v-if="platServices.length">
            <baseService v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService>
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

  import baseService from '@/components/subTemplate/BaseService';

  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        adinfo: PLAT.info.adinfo,
        rows: 20,
        dataO: {
          serSortFirst: '',
          serTime: '',
          serId: ''
        },
        keyVal: '',
        platServices: [],
        loading: true,
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false // 是否缺省
      };
    },
    created() {
      this.keyVal = urlParse('key');
      this.searchService();
    },
    methods: {
      searchService() {
        this.$axios.getk('/ajax/ware/index/search', {
            key: this.keyVal,
            sortFirst: this.dataO.serSortFirst,
            time: this.dataO.serTime,
            id: this.dataO.serId,
            rows: this.rows
        }, (res) => {
          this.loading = false
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.serSortFirst = $info[$info.length - 1].sortFirst;
              this.dataO.serTime = $info[$info.length - 1].modifyTime;
              this.dataO.serId = $info[$info.length - 1].id;
              this.platServices = this.isFormSearch ? this.platServices.concat($info) : $info;
              this.isFormSearch = true;
              if ($info.length < this.rows) {
                this.loadingModalShow = false;
                this.isFormSearch = false;
              };
            } else {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
            var liLen = this.platServices.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault = true;
            };
          };
        });
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.searchService();
        }
      },
      keywordSearch() {
        if (this.keyVal) {
          this.dataO.serSortFirst = '';
          this.dataO.serTime = '';
          this.dataO.serId = '';
          this.isFormSearch = true;
          this.loadingModalShow = false;
          this.loadingComplete = true;
          this.isLoading = false;
          this.platServices = [];
          this.ifDefault = false;
          this.searchService();
        } else {
          this.keyVal = '';
          this.$message({
            message: '请填写搜索服务的关键词',
            type: 'warning'
          });
        }
      }
    },
    components: {
      baseService
    }
  };
</script>

<style>
 @import '../ViewFindResource/css.css';
</style>
