<template>
	<div class="tab-contain">
		<baseArticle v-for="item in orgTrends" :key="item.index" :itemSingle="item" :showOwner="true"></baseArticle>
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
          bShareId: '',
          bTime: ''
        },
        orgTrends: '',
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    created() {
      this.platId = Cookies.get('platId');
      this.queryOrgTrends();
    },
    methods: {
      queryOrgTrends(id) {
        this.$axios.get(httpUrl.hQuery.orgTrends.nopq, {
          pid: this.platId,
          rows: this.rows,
          publishTime: this.dataO.bTime,
          shareId: this.dataO.bShareId
        }, (res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.bShareId = $info[$info.length - 1].shareId;
              this.dataO.bTime = $info[$info.length - 1].publishTime;
              this.orgTrends = this.isFormSearch ? this.orgTrends.concat($info) : $info;
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
          this.queryOrgTrends();
        }
      }
    },
    components: {
      baseArticle
    }
  };
</script>
