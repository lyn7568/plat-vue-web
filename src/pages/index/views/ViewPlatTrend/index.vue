<template>
  <div class="main-content">
		<div class="wrapper-left">
			<div class="block-wrapper">
				<img :src="plat.platimgurl" width="800" height="280">
			</div>
			<div class="block-wrapper">
				<div class="content-wrapper tab-wrapper" style="min-height:300px;" v-loading="loadState">
					<el-tabs v-model="activeName">
            <el-tab-pane v-for="cata in conCatalog" :key="cata.index" :label="cata.tit" :name="cata.val">
              <platNews :activeTab="cata.val"></platNews>
            </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<div class="wrapper-right">
      <div class="block-wrapper" v-if="plat.adinfo.searchAd.length">
        <a class="ad-wrapper" v-for="item in plat.adinfo.searchAd" :key="item.index" :href="item.adUrl" target="_blank">
          <img :src="item.imgUrl" width="280" height="200">
        </a>
      </div>
    </div>
		<BackTop></BackTop>
  </div>
</template>

<script>
  import platNews from './news';
  import { platTrend } from '@/libs/util';

	export default {
    mounted() {
      sessionStorage.setItem('isSelect', '1')
    },
    data() {
      return {
        /* eslint-disable no-undef */
        plat: PLAT.info,
        activeName: '1',
        loadState: false,
        conCatalog: platTrend
      };
    },
    components: {
      platNews
    }
  };
</script>

<style>
.tab-wrapper{
  padding:10px 20px;
  color: #606266;
}
.tab-wrapper li{
  display:inline-block;
  margin-right:20px;
  cursor: pointer;
}
.tab-wrapper li.active{
  color: #2693ec;
}
.tab-wrapper .el-tabs{
  width:100%;
}
.tab-wrapper .el-tabs__header{
  margin: -4px 0 4px;
}
.tab-wrapper .el-tabs__nav-wrap::after{
  content:none;
}
.tab-wrapper .el-tabs__item{
  font-size: 16px;
  font-weight: bold;
}
.tab-wrapper .el-tabs__content{
  margin:0 -20px;
  border-top:20px solid #f4f6f8;
}
.tab-wrapper .el-tabs__content .tab-contain{
  width:100%;
}
</style>
