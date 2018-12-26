<template>
	<div class="tab-contain">
		<baseContent v-for="item in paltNews" :key="item.index" :itemSingle="item" :showOwner="false"></baseContent>
		<Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower"></Loading>
	</div>
</template>

<script>
  import Cookies from 'js-cookie';
  import util from '@/libs/util';
	import baseContent from '@/components/subTemplate/BaseContent';

	export default {
    props: ['activeTab'],
    data() {
      return {
        platId: '',
        pageSize: 20,
        pageNo: 1,
        paltNews: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    components: {
      baseContent
    },
    created() {
      this.platId = Cookies.get('platId');
      this.queryPaltNews();
    },
    methods: {
      queryPaltNews() {
        var that = this
        this.$axios.get('/ajax/article/pq', {
          catalog: that.activeTab,
          published: 1,
          pageSize: that.pageSize,
          pageNo: that.pageNo
        }, (res) => {
          if (res.success) {
            var $info = res.data.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                if ($info[i].modifyTime) {
                  $info[i].modifyTime = util.commenTime($info[i].modifyTime, true)
                }
              }
              that.paltNews = that.isFormSearch ? that.paltNews.concat($info) : $info;
              that.isFormSearch = true;
            }
            if ($info.length < that.pageSize) {
              that.loadingModalShow = false;
              that.isFormSearch = false;
            };
          };
        });
      },
      loadLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.pageNo++;
          this.queryPaltNews();
        }
      }
    }
  };
</script>
