<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{contentInfo.title}}</div>
                <div class="info-tag">
                  <span>{{contentInfo.modifyTime}}</span>
                  <pageView v-if="contentId" :pageObj="{ tn: 'article', id: contentId, src: '2'}"></pageView>
                  <span>作者/来源：{{contentInfo.source}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="block-wrapper" v-if="adinfo.shareAdTop.length">
            <a class="ad-wrapper" v-for="item in adinfo.shareAdTop" :key="item.index" :href="item.adUrl" target="_blank">
              <img :src="item.imgUrl" width="100%">
            </a>
          </div>
          <div class="inner-wrapper">
            <div class="content">
              <div class="content-uditor" v-html="contentInfo.cnt"></div>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platExperts && platExperts.length">
            <div class="content-title">
              <span>相关专家</span>
            </div>
            <div class="content contentPro">
              <baseExpert v-for="item in platExperts" :key="item.index" :itemSingle="item" :noBlank="true"></baseExpert>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platOrgs && platOrgs.length">
            <div class="content-title">
              <span>相关机构</span>
            </div>
            <div class="content">
              <baseOrg v-for="item in platOrgs" :key="item.index" :itemSingle="item" :noBlank="true"></baseOrg>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platCompanys && platCompanys.length">
            <div class="content-title">
              <span>相关企业</span>
            </div>
            <div class="content">
              <baseCompany v-for="item in platCompanys" :key="item.index" :itemSingle="item" :noBlank="true"></baseCompany>
            </div>
          </div>
          <div class="block-wrapper" v-if="adinfo.shareAdCenter.length">
            <a class="ad-wrapper" v-for="item in adinfo.shareAdCenter" :key="item.index" :href="item.adUrl" target="_blank">
              <img :src="item.imgUrl" width="100%">
            </a>
          </div>
          <div class="inner-wrapper" v-if="paltNews && paltNews.length">
            <div class="content-title">
              <span>最新文章</span>
            </div>
            <div class="content content-nf">
              <baseContent v-for="item in paltNews" :key="item.index" :itemSingle="item" :showOwner="false" :noBlank="true"></baseContent>
            </div>
          </div>
          <div class="block-wrapper" v-if="adinfo.shareAdBottom.length">
            <a class="ad-wrapper" v-for="item in adinfo.shareAdBottom" :key="item.index" :href="item.adUrl" target="_blank">
              <img :src="item.imgUrl" width="100%">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { urlParse, commenTime } from '@/libs/util';
  import queryBase from '@/libs/queryBase';
  import baseExpert from '@/components/subTemplate/BaseExpert';
  import baseOrg from '@/components/subTemplate/BaseOrg';
  import baseCompany from '@/components/subTemplate/BaseCompany';
  import baseContent from '@/components/subTemplate/BaseContent';
  import pageView from '@/components/pageView';
  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        paltNews: [],
        adinfo: PLAT.info.adinfo,
        contentInfo: '',
        platExperts: '',
        platOrgs: '',
        platCompanys: ''
      };
    },
    created() {
      this.contentId = urlParse('id');
      this.getContentInfo();
      this.getPlatExperts();
      this.getPlatOrgs();
      this.getPlatCompanys();
      this.queryPaltNews();
    },
    components: {
      pageView,
      baseExpert,
      baseOrg,
      baseCompany,
      baseContent
    },
    methods: {
      queryPaltNews() {
        this.$axios.get('/ajax/article/pq', {
          published: 1,
          pageSize: 6,
          pageNo: 1
        }, (res) => {
          if (res.success && res.data) {
            var $info = res.data.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                if ($info[i].id === this.contentId) {
                  $info.splice(i, 1)
                  i--
                  continue
                }
                if ($info[i].modifyTime) {
                  $info[i].modifyTime = commenTime($info[i].modifyTime, true)
                }
              }
              this.paltNews = $info.slice(0, 5)
            }
          };
        });
      },
      getContentInfo() {
        this.$axios.get('/ajax/article/qo', {
          id: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.modifyTime) {
              $info.modifyTime = commenTime($info.modifyTime, true)
            }
            document.title = $info.title + '-' + PLAT.info.title
            this.contentInfo = $info;
          };
        });
      },
      getPlatExperts() {
        var that = this
        this.$axios.get('/ajax/article/professor', {
          articleId: that.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            var arr = []
            for (let i in $info) {
              arr[i] = $info[i].professorId;
            }
            if (arr.length) {
              that.$axios.getk('/ajax/professor/qm', {
                id: arr
              }, function (data) {
                if (data.success && data.data) {
                  if (data.data.length > 0) {
                    that.platExperts = data.data
                    that.$forceUpdate()
                  }
                }
              })
            }
          };
        });
      },
      getPlatOrgs() {
        var that = this
        this.$axios.get('/ajax/article/org', {
          articleId: that.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            var arr = []
            for (let i in $info) {
              arr[i] = $info[i].orgId;
            }
            if (arr.length) {
              that.$axios.getk('/ajax/org/qm', {
                id: arr
              }, function (data) {
                if (data.success && data.data) {
                  if (data.data.length > 0) {
                    that.platOrgs = data.data
                    that.$forceUpdate()
                  }
                }
              })
            }
          };
        });
      },
      getPlatCompanys() {
        var that = this
        this.$axios.get('/ajax/article/company', {
          articleId: that.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            var hData = { m: 0, data: $info }
            for (let i = 0; i < $info.length; ++i) {
              queryBase.getCompany($info[i].compId, function (sc, value) {
                if (sc) {
                  $info[i] = value
                  that.$forceUpdate()
                }
              })
            }
            that.platCompanys = $info;
          };
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../style/index';

  .info-tag span {
    display: inline-block;
    margin-right: 15px;
    color: #999;
    font-size: 14px;
  }
</style>
