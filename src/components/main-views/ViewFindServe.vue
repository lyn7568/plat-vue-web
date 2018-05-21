<template>
  <div class="main-content">
		<div class="wrapper-left">
			<div class="block-wrapper search-wrapper">
				<el-input placeholder="请输入服务内容、发布者或相关关键词" class="input-with-select">
					<el-button slot="append" icon="el-icon-search">搜索</el-button>
				</el-input>
			</div>
			<div class="block-wrapper">
				<div class="content-wrapper tab-wrapper">
					<div class="tab-lable">服务类型：</div>
					<ul class="tab-sort">
						<li>不限</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
						<li>检测服务</li>
					</ul>
				</div>
				<div class="tab-contain">
					<baseService v-for="item in 10" :key="item"></baseService>
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
  import baseService from '../sub-component/BaseService';

	export default {
    props: {
      plat: {
        type: Object
      }
    },
    components: {
      baseService
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin';

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

	.el-input-group__append
		background:$mainColor
		color:#fff
		padding:10px 40px
		border-color:$mainColor
</style>
