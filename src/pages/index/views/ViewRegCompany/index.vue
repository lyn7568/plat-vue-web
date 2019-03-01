<template>
	<div class="cooperation">
		<div class="content-wrapper block-wrapper" style="min-height:410px" v-loading="loading">
			<div class="block-container">
        <template v-show="!ifDefault" v-if="orgData.length">
          <a class="block-item org-item" v-for="item in orgData" :key="item.index" :href="'company.html?id='+item.id" target="_blank">
            <div class="item-block-org">
              <div class="item-pic-org">
                <img :src="item.logo">
              </div>
              <div class="item-text-org">
                <div class="item-tit-org"><span>{{item.name}}</span></div>
                <p class="item-tag-org" v-if="item.industry">{{item.industry.join(' | ')}}</p>
              </div>
            </div>
          </a>
          <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower"></Loading>
        </template>
        <defaultPage v-show="ifDefault"></defaultPage>
      </div>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
  import { defaultSet } from '@/libs/util';

  export default {
    data() {
      return {
        pageSize: 30,
        pageNo: 1,
        orgData: [],
        loading: true,
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false
      };
    },
    created() {
       this.ResidentOrgs();
    },
    methods: {
      ResidentOrgs() {
        var that = this
        that.loading = true
        this.$axios.get('/ajax/company/pq', {
          pageSize: that.pageSize,
          pageNo: that.pageNo
        }, (res) => {
          that.loading = false
          if (res.success) {
            if (res.data.pageNo !== that.pageNo) {
              that.loadingModalShow = false;
              that.isFormSearch = false;
              return;
            }
            var $info = res.data.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                if (!$info[i].logo) {
                  $info[i].logo = defaultSet.img.org
                }
                $info[i].industry = that.getCompanyKeyword($info[i].id)
                that.$forceUpdate()
              }
              that.isFormSearch = true;
              that.orgData = that.orgData.concat($info);
            };
            if ($info.length < that.pageSize) {
              that.loadingModalShow = false;
              that.isFormSearch = false;
            };
            var liLen = that.orgData.length;
            if ($info.length === 0 && liLen === 0) {
              that.ifDefault = true;
            };
          };
        });
      },
      getCompanyKeyword(id) {
        var that = this
        var objKey = []
        that.$axios.get('/ajax/company/qo/keyword', {
          id: id,
          type: 1
        }, function(res) {
          if (res.success && res.data) {
            const str = res.data
            if (str.length > 0) {
              str.map(item => {
                objKey.push(item.value)
              })
            }
          }
        })
        return objKey
      },
      loadLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.pageNo++;
          this.ResidentOrgs();
        }
      }
    }
  };
</script>
