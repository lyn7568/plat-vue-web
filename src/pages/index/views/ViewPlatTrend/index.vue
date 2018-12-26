<template>
  <div class="main-content">
		<div class="wrapper-left">
			<div class="block-wrapper">
				<img :src="plat.platimgurl" width="800" height="280">
			</div>
			<div class="block-wrapper">
				<div class="content-wrapper tab-wrapper">
					<el-tabs v-model="activeName">
            <el-tab-pane v-for="cata in conCatalog" :key="cata.index" :label="cata.tit" :name="cata.val">
              <platNews :activeTab="cata.val"></platNews>
            </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<div class="wrapper-right">
      <div class="block-wrapper" v-if="plat.adinfo.length" v-for="item in plat.adinfo" :key="item.index">
        <a class="ad-wrapper" :href="item.adUrl" target="_blank">
          <img :src="item.imgUrl" width="280" height="200">
        </a>
      </div>
    </div>
		<BackTop></BackTop>
  </div>
</template>

<script>
	import platNews from './news';

	export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        activeName: '1',
        conCatalog: [
          {
            val: '1',
            tit: '平台新闻'
          },
          {
            val: '2',
            tit: '采访专栏'
          },
          {
            val: '3',
            tit: '政策法规'
          },
          {
            val: '4',
            tit: '通知公告'
          }
        ]
      };
    },
    components: {
      platNews
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .tab-wrapper{
    padding:10px 20px;
    color: $commonFont;
    li{
      display:inline-block;
      margin-right:20px;
      cursor: pointer;
      &.active{
        color: $mainColor;
      }
    }
    .el-tabs{
      width:100%;
    }
    .el-tabs__header{
      margin: 0 0 4px;
    }
    .el-tabs__nav-wrap::after{
      content:none;
    }
    .el-tabs__content{
      margin:0 -20px;
      .tab-contain{
        width:100%;
        border-top:20px solid #f4f6f8;
      }
    }
  }
</style>
