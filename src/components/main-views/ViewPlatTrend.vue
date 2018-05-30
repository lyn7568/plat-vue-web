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
								<baseArticle v-for="item in paltNews" :key="item.index" :itemInfo="item"></baseArticle>
								<Loading v-show="ifLoad" :isLoading="isLoading"></Loading>
							</div>
						</el-tab-pane>
						<el-tab-pane label="企业动态" name="second">
							<div class="tab-contain">
								<baseArticle v-for="item in orgTrends" :key="item.index" :itemInfo="item"></baseArticle>
								<Loading v-show="ifLoad" :isLoading="isLoading"></Loading>
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
		<BackTop></BackTop>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';

	import baseArticle from '../sub-component/BaseArticle';

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
        orgTrends: '',
        paltNews: '',
        ifLoad: true,
        isLoading: false,
        activeName: 'first'
      };
    },
    created() {
       this.platId = Cookies.get('platId');
       this.queryPaltNews(this.platId);
       this.queryOrgTrends(this.platId);
    },
    watch: {
     '$route' (to, from) {
        this.activeName = this.$route.query.flag; // 监听flag变化
      }
    },
    methods: {
      queryPaltNews(id) {
        this.$axios.get(httpUrl.hQuery.platNews.nopq, {
          params: {
            ownerId: id,
            articleType: '3',
            rows: 5
          }
        }).then((res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            this.paltNews = $info;
          };
        });
      },
      queryOrgTrends(id) {
        this.$axios.get(httpUrl.hQuery.orgTrends.nopq, {
          params: {
            pid: id,
            rows: 5
          }
        }).then((res) => {
          if (res.success) {
            var $info = res.data;
            this.orgTrends = $info;
          };
        });
      }
    },
    components: {
      baseArticle
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
