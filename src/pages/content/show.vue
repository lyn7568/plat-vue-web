<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{contentInfo.title}}</div>
                <div class="info-tag">
                  <span>{{contentInfo.modifyTime}}</span>
                  <span>作者/来源：{{contentInfo.source}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content" v-html="contentInfo.cnt"></div>
          </div>
          <div class="inner-wrapper" v-if="platExperts && platExperts.length">
            <div class="content-title">
              <span>相关专家</span>
            </div>
            <div class="content">
              <baseExpert v-for="item in platExperts" :key="item.index" :itemSingle="item"></baseExpert>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platOrgs && platOrgs.length">
            <div class="content-title">
              <span>相关机构</span>
            </div>
            <div class="content">
              <baseOrg v-for="item in platOrgs" :key="item.index" :itemSingle="item"></baseOrg>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platCompanys && platCompanys.length">
            <div class="content-title">
              <span>相关企业</span>
            </div>
            <div class="content">
              <baseCompany v-for="item in platCompanys" :key="item.index" :itemSingle="item"></baseCompany>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="wrapper-right">
          <div class="block-wrapper" v-if="adinfo.length" v-for="item in adinfo" :key="item.index">
            <a class="ad-wrapper" :href="item.adUrl" target="_blank">
              <img :src="item.imgUrl" width="280" height="200">
            </a>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { urlParse, commenTime } from '@/libs/util';

  import queryBase from '@/libs/queryBase';
  import baseExpert from '@/components/subTemplate/BaseExpert';
  import baseOrg from '@/components/subTemplate/BaseOrg';
  import baseCompany from '@/components/subTemplate/BaseCompany';
  export default {
    data() {
      return {
        /* eslint-disable no-undef */
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
    },
    components: {
      baseExpert,
      baseOrg,
      baseCompany
    },
    methods: {
      getContentInfo() {
        this.$axios.get('/ajax/article/qo', {
          id: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.modifyTime) {
              $info.modifyTime = commenTime($info.modifyTime, true)
            }
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
              }, function(data) {
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
              }, function(data) {
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
            for (let i = 0; i < $info.length; ++i) {
              (function(item) {
                queryBase.getCompany(item.compId, function(sc, value) {
                  if (sc) {
                    item.name = value.name
                    item.logo = value.logo
                    that.$forceUpdate()
                  }
                })
              })($info[i])
            }
            that.platCompanys = $info;
          };
        });
      }
    }
  };
</script>

<style scoped>
  .info-tag span{
    display: inline-block;
    margin-right:15px;
    color: #999;
    font-size: 14px;
  }
</style>
