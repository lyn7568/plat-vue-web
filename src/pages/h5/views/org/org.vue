<template>
  <div class="browse-main">
    <div class="header-box">
      <div class="header_content">
        <div class="header_content_top">
          <div class="cmy_logo_box">
            <img :src="orgInfo.logo" alt="">
          </div>
        </div>
        <div class="header_content-footer">
          <p>
            <span class="cmpName">{{orgInfo.forShort ? orgInfo.forShort : orgInfo.name}}</span><em class="authicon" :class="{'icon-com': orgInfo.authStatus==='3'}"></em>
            <span v-if="orgInfo.type === '2'">{{compType[orgInfo.type]}} </span>
          </p>
          <p class="industry">{{orgInfo.industry ? orgInfo.industry.join(" | ") : ''}}</p>
          <p class="addressbox">
            <em class="address"></em> {{orgInfo.city}}</p>
        </div>
      </div>
    </div>
    <div class="content-wrapper split-other" v-if="platServices.length || platResources.length">
      <div class="inner-wrapper" v-if="platServices.length">
        <div class="content-title">
          <span>可提供服务</span>
        </div>
        <div class="content content-nf" v-if="platServices.length">
          <baseService v-for="item in platServices" :key="item.index" :itemSingle="item" :noBlank="true"></baseService>
          <p class="moretype" @click="moreService" v-show="loadingModalShow">查看更多服务</p>
        </div>
      </div>
      <div class="inner-wrapper" v-if="platResources.length">
        <div class="content-title">
          <span>可共享资源</span>
        </div>
        <div class="content content-nf" v-if="platResources.length">
          <baseResource v-for="item in platResources" :key="item.index" :itemSingle="item" :noBlank="true"></baseResource>
          <p class="moretype" @click="moreProduct" v-show="loadingModalShow2">查看更多资源</p>
        </div>
      </div>
    </div>
    <div class="content-wrapper" v-if="orgInfo.descp">
      <div class="inner-wrapper">
        <div class="content-title">
          <span>机构简介</span>
        </div>
        <div class="content">{{orgInfo.descp}}</div>
      </div>
      <div class="inner-wrapper" v-if="orgInfo.subject && orgInfo.subject.length">
        <div class="content-title">
          <span>专注领域</span>
        </div>
        <div class="content">
          <el-row class="tag-item">
            <el-tag v-for="sub in orgInfo.subject" :key="sub.index">{{sub}}</el-tag>
          </el-row>
        </div>
      </div>
    </div>
    <div class="content-wrapper" v-if="orgContents && orgContents.length">
      <div class="content-title">
        <span>相关文章</span>
      </div>
      <div class="content content-nf" v-if="orgContents.length">
        <baseContent v-for="item in orgContents" :key="item.index" :itemSingle="item" :noBlank="true"></baseContent>
      </div>
    </div>
    <div class="content-wrapper" v-if="likeOrgs && likeOrgs.length">
      <div class="content-title">
        <span>您可能感兴趣的机构</span>
      </div>
      <div class="content">
        <a v-for="item in likeOrgs" :key="item.index" class="list-item" :href="'org.html?id='+item.id">
          <div class="list-head" :style="{backgroundImage: 'url(' + item.logo + ')'}"></div>
          <div class="list-info">
            <div class="list-owner">{{item.name}}</div>
            <div class="list-desc">{{item.compType}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import { urlParse, ImageUrl, defaultSet, strToArr, TimeTr, commenTime } from '@/libs/util';
  import queryDict from '@/libs/queryDict';
  import queryBase from '@/libs/queryBase';

  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';
  import contactChat from '@/components/ContactChat';
  import baseService from '@/components/subTemplate/BaseService';
  import baseResource from '@/components/subTemplate/BaseResource';
  import baseContent from '@/components/subTemplate/BaseContent';

  export default {
    data() {
      return {
        activeName: 'first',
        numRanger: [],
        compType: [],
        orgInfo: '',
        orgId: '',
        elurl: '',
        platServices: [],
        serCount: 0,
        loadingModalShow: false, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false, // 是否缺省
        platResources: [],
        resCount: 0,
        loadingModalShow2: false,
        loadingComplete2: false,
        isFormSearch2: false,
        isLoading2: false,
        ifDefault2: false,
        dataO: {
          serModifyTime: '',
          resPublishTime: '',
          resShareId: ''
        },
        rows: 2,
        orgContents: '',
        likeOrgs: ''
      };
    },
    created() {
      this.orgId = urlParse('id');
      this.elurl = window.location.href;
      this.getDictoryData();
      this.getorgInfo();
      this.getOrgWave();
      this.getOrgResource();
      this.queryPubCount();
      this.getOrgContent();
      this.getLikeOrgs();
    },
    components: {
      shareOut,
      collectCo,
      contactChat,
      baseService,
      baseResource,
      baseContent
    },
    methods: {
      moreService() {
        this.getOrgWave()
      },
      moreProduct() {
        this.getOrgResource()
      },
      getDictoryData() {
        const that = this
        queryDict.applyDict('QYGM', function (dictData) {
          dictData.map(item => {
            that.numRanger[item.code] = item.caption
          })
        }) // 企业规模
        queryDict.applyDict('QYLX', function (dictData) {
          dictData.map(item => {
            that.compType[item.code] = item.caption
          })
        }) // 企业类型
      },
      getorgInfo() {
        this.$axios.getk('/ajax/org/' + this.orgId, {
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.hasOrgLogo) {
              $info.logo = ImageUrl(('org/' + $info.id + '.jpg'), true)
            } else {
              $info.logo = defaultSet.img.org
            }
            if ($info.subject) {
              $info.subject = strToArr($info.subject);
            }
            if ($info.industry) {
              $info.industry = strToArr($info.industry);
            }
            if ($info.qualification) {
              $info.qualification = strToArr($info.qualification);
            }
            if ($info.foundTime) {
              $info.foundTime = TimeTr($info.foundTime);
            }
            document.title = ($info.forShort ? $info.forShort : $info.name) + '-' + PLAT.info.title
            this.orgInfo = $info;
          };
        });
      },
      getOrgWave() {
        this.$axios.getk('/ajax/ware/publish', {
          category: '2',
          owner: this.orgId,
          modifyTime: this.dataO.serModifyTime,
          rows: this.rows
        }, (res) => {
          if (res.success && res.data) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.serModifyTime = $info[$info.length - 1].modifyTime;
              this.platServices = this.platServices.concat($info);
              this.isFormSearch = true;
              if ($info.length < this.rows) {
                this.loadingModalShow = false;
                this.isFormSearch = false;
              } else {
                this.loadingModalShow = true;
              }
            } else {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
            var liLen = this.platServices.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault = true;
            };
          };
        });
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.getOrgWave();
        }
      },
      getOrgResource() {
        this.$axios.getk('/ajax/resource/publish', {
          category: '2',
          owner: this.orgId,
          publishTime: this.dataO.resPublishTime,
          shareId: this.dataO.resShareId,
          rows: this.rows
        }, (res) => {
          if (res.success && res.data) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.resPublishTime = $info[$info.length - 1].publishTime;
              this.dataO.resShareId = $info[$info.length - 1].shareId;
              this.platResources =  this.platResources.concat($info);
              this.isFormSearch2 = true;
              if ($info.length < this.rows) {
                this.loadingModalShow2 = false;
                this.isFormSearch2 = false;
              } else {
                this.loadingModalShow2 = true;
              }
            } else {
              this.loadingModalShow2 = false;
              this.isFormSearch2 = false;
            };
            var liLen = this.platPatents.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault2 = true;
            };
          };
        });
      },
      searchLower2() {
        if (this.loadingModalShow2 && !this.isLoading2) {
          this.getOrgResource();
        }
      },
      queryPubCount() {
        var that = this
        this.$axios.getk('/ajax/ware/count/publish', {
          owner: that.orgId,
          category: '2'
        }, function (data) {
          if (data.data > 0 && data.data < 99) {
            that.serCount = data.data;
          }
          if (data.data > 99) {
            that.serCount = '99+';
          }
        });
        this.$axios.getk('/ajax/resource/count/publish', {
          owner: that.orgId,
          category: '2'
        }, function (data) {
          if (data.data > 0 && data.data < 99) {
            that.resCount = data.data;
          }
          if (data.data > 99) {
            that.resCount = '99+';
          }
        });
      },
      getOrgContent() {
        var that = this
        this.$axios.get('/ajax/article/lq/with/org', {
          oid: this.orgId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                (function (str) {
                  that.$axios.get('/ajax/article/qo', {
                    id: str.id
                  }, (data) => {
                    if (data.success) {
                      str.title = data.data.title
                      str.modifyTime = commenTime(data.data.modifyTime, true)
                      that.$forceUpdate()
                    };
                  });
                })($info[i])
              }
              that.orgContents = $info;
            };
          };
        });
      },
      getLikeOrgs() {
        var that = this
        this.$axios.getk('/ajax/org/ralateOrgs', {
          orgId: this.orgId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                (function (str) {
                  queryBase.getOrganization(str.id, function (sc, value) {
                    if (sc) {
                      str.name = value.name
                      str.orgType = that.compType[value.orgType]
                      if (str.hasOrgLogo) {
                        str.logo = ImageUrl(('org/' + value.id + '.jpg'), true)
                      } else {
                        str.logo = defaultSet.img.org
                      }
                      that.$forceUpdate()
                    }
                  })
                })($info[i])
              }
              that.likeOrgs = $info;
            }
          };
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../style/index';
</style>
