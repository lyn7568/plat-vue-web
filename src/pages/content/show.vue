<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{contentInfo.title}}</div>
                <div class="info-operate zoom-operate">
                  <ul class="list-tag">
                    <li>{{contentInfo.modifyTime}}</li>
                    <li>作者/来源：{{contentInfo.source}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content" v-html="contentInfo.cnt"></div>
          </div>
          <div class="inner-wrapper" v-if="platExperts">
            <div class="content-title">
              <span>相关专家</span>
            </div>
            <div class="content">
              <baseExpert v-for="item in platExperts" :key="item.index" :itemSingle="item"></baseExpert>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platOrgs">
            <div class="content-title">
              <span>相关机构</span>
            </div>
            <div class="content">
              <baseOrg v-for="item in platOrgs" :key="item.index" :itemSingle="item"></baseOrg>
            </div>
          </div>
          <div class="inner-wrapper" v-if="platCompanys">
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
          <div class="block-wrapper" v-if="plat.adinfo.length" v-for="item in plat.adinfo" :key="item.index">
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
  import util from '@/libs/util';

  import baseExpert from '@/components/subTemplate/BaseExpert';
  import baseCompany from '@/components/subTemplate/BaseCompany';
  import baseOrg from '@/components/subTemplate/BaseOrg';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        contentInfo: '',
        platExperts: '',
        platOrgs: '',
        platCompanys: ''
      };
    },
    created() {
      this.contentId = util.urlParse('id');
      this.getContentInfo();
      this.getPlatExperts();
      this.getPlatOrgs();
      this.getPlatCompanys();
    },
    components: {
      baseExpert,
      baseCompany,
      baseOrg
    },
    methods: {
      getContentInfo() {
        this.$axios.get('/ajax/article/qo', {
          id: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.modifyTime) {
              $info.modifyTime = util.commenTime($info.modifyTime, true)
            }
            this.contentInfo = $info;
          };
        });
      },
      getPlatExperts() {
        this.$axios.get('/ajax/article/professor', {
          articleId: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            this.platExperts = $info;
          };
        });
      },
      getPlatOrgs() {
        this.$axios.get('/ajax/article/org', {
          articleId: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            this.platOrgs = $info;
          };
        });
      },
      getPlatCompanys() {
        this.$axios.get('/ajax/article/company', {
          articleId: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            this.platCompanys = $info;
          };
        });
      }
    }
  };
</script>
