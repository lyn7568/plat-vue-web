<template>
	<div class="cooperation">
		<div class="content-wrapper block-wrapper">
			<div class="block-container">
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
			</div>
			<Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower" v-if="!num"></Loading>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import util from '@/libs/util';

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        pageSize: 30,
        pageNo: 1,
        orgData: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    created() {
       this.ResidentOrgs();
    },
    methods: {
      ResidentOrgs() {
        var that = this
        this.$axios.get('/ajax/company/pq', {
          pageSize: that.pageSize,
          pageNo: that.pageNo
        }, (res) => {
          if (res.success) {
            var $info = res.data.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                if ($info[i].logo === '') {
                  $info[i].logo = util.defaultSet.img.org
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
