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
							<div class="tab-contain">
								<baseArticle v-for="item in 5" :key="item"></baseArticle>
							</div>
						</el-tab-pane>
						<el-tab-pane label="企业动态" name="second">
							<div class="tab-contain">
								<baseArticle v-for="item in 1" :key="item"></baseArticle>
							</div>
						</el-tab-pane>
					</el-tabs>
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
  </div>
</template>

<script type="text/ecmascript-6">
import baseArticle from '../sub-component/BaseArticle';

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
    components: {
      baseArticle
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin';

	.tab-wrapper
		padding:10px 20px
		color: $commonFont
		li
			display:inline-block
			margin-right:20px
			cursor: pointer
			&.active
				color: $mainColor
		.el-tabs__nav-wrap::after
			content:none
		.el-tabs__content
			margin:0 -20px
			.tab-contain
				border-top:20px solid #f4f6f8

</style>
