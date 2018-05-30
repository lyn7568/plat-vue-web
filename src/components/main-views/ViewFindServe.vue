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
				<div class="tab-contain">
          <div v-show="!ifDefault">
            <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemServices="item"></baseService>
            <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
          </div>
          <defaultPage v-show="ifDefault"></defaultPage>
				</div>
			</div>
		</div>
		<div class="wrapper-right">
			<div class="block-wrapper" v-if="plat.adinfo">
				<a class="ad-wrapper" :href="plat.adinfo[0].adUrl" target="_blank">
					<img :src="plat.adinfo[0].imgUrl" width="280" height="200">
				</a>
			</div>
		</div>
		<BackTop></BackTop>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';

  import baseService from '../sub-component/BaseService';

	export default {
		props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        platId: '',
        rows: 20,
        dataO: {
          bShareId: '',
          bTime: ''
        },
        keyVal: '',
        platServices: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false // 是否缺省
      };
    },
    created() {
      this.platId = Cookies.get('platId');
      this.keyVal = util.urlParse('key');
      this.searchService();
    },
    methods: {
      searchService() {
        this.$axios.get(httpUrl.hQuery.queryWare, {
          params: {
            key: this.keyVal,
            pid: this.platId,
            shareId: this.dataO.bShareId,
            time: this.dataO.bTime,
            rows: this.rows
          }
        }).then((res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.bShareId = $info[$info.length - 1].shareId;
              this.dataO.bTime = $info[$info.length - 1].time;
              this.platServices = this.isFormSearch ? this.platServices.concat($info) : $info;
              this.isFormSearch = true;
            };
            var liLen = this.platServices.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault = true;
            };
            if ($info.length < this.rows) {
              this.loadingModalShow = false;
              this.isFormSearch = false;
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
          this.dataO.bShareId = '';
          this.dataO.bTime = '';
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

<style lang="stylus" rel="stylesheet/stylus">
  .tab-wrapper
    display:flex
    align-items:baseline
    padding:15px 20px
    color: $commonFont
    .tab-lable
      width:100px
    .tab-sort
      display:flex
      flex-wrap:wrap
      margin-right:-10px
      margin-bottom:-10px
      li
        display:inline-block
        margin-right:10px
        margin-bottom:10px
        padding:2px 10px
        border: 1px solid $borderColor
        border-radius(10px)
        cursor: pointer
        &.active
          color: $mainColor

  .tab-contain
    margin-top:20px
    background:#fff
  .el-input-group__append
    background:$mainColor
    color:#fff
    padding:10px 40px
    border-color:$mainColor
</style>
