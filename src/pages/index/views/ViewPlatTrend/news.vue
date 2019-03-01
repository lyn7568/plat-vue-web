<template>
	<div class="tab-contain">
    <div v-show="!ifDefault" v-if="paltNews.length">
      <baseContent v-for="item in paltNews" :key="item.index" :itemSingle="item" :showOwner="false"></baseContent>
		  <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower"></Loading>
    </div>
    <defaultPage v-show="ifDefault"></defaultPage>
  </div>
</template> 

<script>
  import { commenTime } from '@/libs/util';
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
        ifDefault: false
      };
    },
    components: {
      baseContent
    },
    created() {
      this.platId = localStorage.getItem('platId');
      this.queryPaltNews();
    },
    methods: {
      queryPaltNews() {
        var that = this
        that.$parent.loadState = true
        this.$axios.get('/ajax/article/pq', {
          catalog: that.activeTab,
          published: 1,
          pageSize: that.pageSize,
          pageNo: that.pageNo
        }, (res) => {
          that.$parent.loadState = false
          if (res.success && res.data) {
            if (res.data.pageNo !== that.pageNo) {
              that.loadingModalShow = false;
              that.isFormSearch = false;
              return;
            }
            var $info = res.data.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                if ($info[i].modifyTime) {
                  $info[i].modifyTime = commenTime($info[i].modifyTime, true)
                }
              }
              that.paltNews = that.isFormSearch ? that.paltNews.concat($info) : $info;
              that.isFormSearch = true;
              if ($info.length < that.pageSize) {
                that.loadingModalShow = false;
                that.isFormSearch = false;
              };
            } else {
              that.loadingModalShow = false;
              that.isFormSearch = true;
            }
            var liLen = that.paltNews.length;
            if ($info.length === 0 && liLen === 0) {
              that.ifDefault = true;
            };
          };
        });
      },
      loadLower() {
        if (this.loadingModalShow && this.isFormSearch) {
          this.pageNo++;
          this.queryPaltNews();
        }
      }
    }
  };
</script>
