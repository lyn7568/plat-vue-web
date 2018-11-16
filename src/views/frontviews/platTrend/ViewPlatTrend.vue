<template>
  <div class="main-content">
		<div class="wrapper-left">
			<div class="block-wrapper">
				<img :src="plat.platimgurl" width="800" height="280">
			</div>
			<div class="block-wrapper">
				<div class="content-wrapper tab-wrapper">
					<el-tabs v-model="activeName">
						<el-tab-pane label="平台新闻" name="first">
							<platNews></platNews>
						</el-tab-pane>
						<el-tab-pane label="采访专栏" name="second">
							<platTrends></platTrends>
						</el-tab-pane>
            <el-tab-pane label="政策法规" name="third">
              <platTrends></platTrends>
            </el-tab-pane>
            <el-tab-pane label="通知公告" name="fourth">
              <platTrends></platTrends>
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

<script type="text/ecmascript-6">
	import platNews from './ViewPlatTrendNews';
  import platTrends from './ViewPlatTrendTrends';

	export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    watch: {
     '$route' (to, from) {
        if (this.$route.query.flag) {
          this.activeName = this.$route.query.flag; // 监听flag变化
        }
      }
    },
    components: {
      platNews,
      platTrends
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .tab-wrapper
    padding:10px 20px
    color: $commonFont
    li
      display:inline-block
      margin-right:20px
      cursor: pointer
      &.active
        color: $mainColor
    .el-tabs
      width:100%
    .el-tabs__header
      margin: 0 0 4px
    .el-tabs__nav-wrap::after
      content:none
    .el-tabs__content
      margin:0 -20px
      .tab-contain
        width:100%
        border-top:20px solid #f4f6f8
</style>
