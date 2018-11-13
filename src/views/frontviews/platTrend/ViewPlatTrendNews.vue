<template>
	<div class="tab-contain">
		<baseArticle v-for="item in paltNews" :key="item.index" :itemSingle="item" :showOwner="false"></baseArticle>
		<Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower"></Loading>
	</div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';

	import baseArticle from '@/views/sub-component/BaseArticle';

	export default {
    data() {
      return {
        platId: '',
        rows: 20,
        dataO: {
          bId: '',
          bTime: ''
        },
        paltNews: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    created() {
       this.platId = Cookies.get('platId');
       this.queryPaltNews();
    },
    methods: {
      queryPaltNews() {
        this.$axios.get(httpUrl.hQuery.platNews.nopq, {
          params: {
            ownerId: this.platId,
            articleType: '3',
            status: 1,
            rows: this.rows,
            publishTime: this.dataO.bTime,
            articleId: this.dataO.bId
          }
        }).then((res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.bId = $info[$info.length - 1].articleId;
              this.dataO.bTime = $info[$info.length - 1].publishTime;
              this.paltNews = this.isFormSearch ? this.paltNews.concat($info) : $info;
              this.isFormSearch = true;
            };
            if ($info.length < this.rows) {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
          };
        });
      },
      loadLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.queryPaltNews();
        }
      }
    },
    components: {
      baseArticle
    }
  };
</script>
