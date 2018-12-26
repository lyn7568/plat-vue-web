<template>
  <div class="browse-main">
		<div class="block-wrapper">
      <div class="content-wrapper">
        <div class="headcon-box org-head">
          <div class="show-head headimg-box">
            <img :src="orgInfo.logo">
          </div>
          <div class="show-info reInfo-box">
            <div class="info-tit">{{orgInfo.forShort ? orgInfo.forShort : orgInfo.name}}<em class="authicon" :class="{'icon-com': orgInfo.authStatus==='3'}"></em></div>
            <div class="info-tag"><span v-if="orgInfo.title" style="margin-right:10px">{{orgInfo.orgType}}</span></div>
            <div class="info-operate">
              <div class="addr">{{orgInfo.city}}</div>
              <shareOut :tUrl="elurl"></shareOut>
            </div>
          </div>
          <el-row class="goSpan">
            <el-button type="primary" icon="el-icon-plus">关注</el-button>
            <el-button type="primary">联系</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">
            <div class="content-wrapper split-other" v-if="platServices.length || platResources.length">
              <div class="inner-wrapper" v-if="platServices.length">
                <div class="content-title">
                  <span>可提供服务</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content">
                  <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService>
                </div>
              </div>
              <div class="inner-wrapper" v-if="platResources.length">
                <div class="content-title">
                  <span>可共享资源</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div>
                  <baseResource v-if="platResources.length" v-for="item in platResources" :key="item.index" :itemSingle="item"></baseResource>
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
          </el-tab-pane>
          <el-tab-pane :label="'服务 ' + (serCount>0 ? serCount : '')" name="second">
            <div v-show="!ifDefault">
              <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService>
              <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
            </div>
            <defaultPage v-show="ifDefault"></defaultPage>
          </el-tab-pane>
          <el-tab-pane :label="'资源 ' + (resCount>0 ? resCount : '')" name="third">
            <div v-show="!ifDefault2">
              <baseResource v-if="platResources.length" v-for="item in platResources" :key="item.index" :itemSingle="item"></baseResource>
              <Loading v-show="loadingModalShow2" :loadingComplete="loadingComplete2" :isLoading="isLoading2" v-on:upup="searchLower2"></Loading>
            </div>
            <defaultPage v-show="ifDefault2"></defaultPage>
          </el-tab-pane>
          <el-tab-pane label="资料" name="fourth">
            <div class="content-wrapper">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>机构详情</span>
                </div>
                <div class="content">
                  <el-row :gutter="10">
                    <el-col :span="12" v-if="orgInfo.name">
                      <el-col :span="6">机构名称：</el-col>
                      <el-col :span="18">{{orgInfo.name}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.orgSize">
                      <el-col :span="6">机构规模：</el-col>
                      <el-col :span="18">{{orgInfo.orgSize}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.orgType">
                      <el-col :span="6">机构类型：</el-col>
                      <el-col :span="18">{{orgInfo.orgType}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.addr">
                      <el-col :span="6">机构地址：</el-col>
                      <el-col :span="18">{{orgInfo.addr}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.foundTime">
                      <el-col :span="6">创立时间：</el-col>
                      <el-col :span="18">{{orgInfo.foundTime}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.orgUrl">
                      <el-col :span="6">机构官网：</el-col>
                      <el-col :span="18">{{orgInfo.orgUrl}}</el-col>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="inner-wrapper" v-if="orgInfo.qualification && orgInfo.qualification.length">
                <div class="content-title">
                  <span>机构资质</span>
                </div>
                <div class="content">
                   <div class="ulM">
                    <div class="liM" v-for="item in orgInfo.qualification" :key="item.index">
                      <div class="liM-tit">{{item}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper" v-if="orgContents">
          <div class="content-title">
            <span>相关文章</span>
          </div>
          <div class="content">
            <div class="ulM">
              <a class="liM" v-for="item in orgContents" :key="item.index" :href="'content.html?id='+item.id" target="_blank">
                <div class="liM-tit">{{item.title}}</div>
              </a>
            </div>
          </div>
        </div>
        <div class="content-wrapper" v-if="likeOrgs">
          <div class="content-title">
            <span>您可能感兴趣的机构</span>
          </div>
          <div class="content">
            <a v-for="item in likeOrgs" :key="item.index" class="list-item" :href="'org.html?id='+item.id" target="_blank">
              <div class="list-head" :style="{backgroundImage: 'url(' + item.logo + ')'}"></div>
              <div class="list-info">
                <div class="list-owner">{{item.name}}</div>
                <div class="list-desc">{{item.compType}}</div>
              </div>
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
  import queryDict from '@/libs/queryDict';
  import queryBase from '@/libs/queryBase';

  import shareOut from '@/components/ShareOut';
  import baseService from '@/components/subTemplate/BaseService';
  import baseResource from '@/components/subTemplate/BaseResource';

  export default {
    data() {
      return {
        activeName: 'first',
        numRanger: [],
        compType: [],
        orgInfo: '',
        elurl: '',
        platServices: [],
        serCount: 0,
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false, // 是否缺省
        platResources: [],
        resCount: 0,
        loadingModalShow2: true,
        loadingComplete2: false,
        isFormSearch2: false,
        isLoading2: false,
        ifDefault2: false,
        dataO: {
          serModifyTime: '',
          resPublishTime: '',
          resShareId: ''
        },
        rows: 10,
        orgContents: '',
        likeOrgs: ''
      };
    },
    created() {
      this.orgId = util.urlParse('id');
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
      baseService,
      baseResource
    },
    methods: {
      getDictoryData() {
        const that = this
        queryDict.applyDict('QYGM', function(dictData) {
          dictData.map(item => {
            that.numRanger[item.code] = item.caption
          })
        }) // 企业规模
        queryDict.applyDict('QYLX', function(dictData) {
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
              $info.logo = util.ImageUrl(('org/' + $info.id + '.jpg'), true)
            } else {
              $info.logo = util.defaultSet.img.org
            }
            if ($info.subject) {
              $info.subject = util.strToArr($info.subject);
            }
            if ($info.qualification) {
              $info.qualification = util.strToArr($info.qualification);
            }
            if ($info.foundTime) {
              $info.foundTime = util.TimeTr($info.foundTime);
            }
            if ($info.orgSize) {
              $info.orgSize = this.numRanger[$info.orgSize];
            }
            if ($info.orgType) {
              $info.orgType = this.compType[$info.orgType];
            }
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
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.serModifyTime = $info[$info.length - 1].modifyTime;
              this.platServices = this.isFormSearch ? this.platServices.concat($info) : $info;
              this.isFormSearch = true;
            };
            var liLen = this.platServices.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault = true;
            };
            if ($info.length < this.rows) {
              this.loadingModalShow = false;
              this.isFormSearch = false;
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
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.resPublishTime = $info[$info.length - 1].publishTime;
              this.dataO.resShareId = $info[$info.length - 1].shareId;
              this.platResources = this.isFormSearch2 ? this.platResources.concat($info) : $info;
              this.isFormSearch2 = true;
            };
            var liLen = this.platPatents.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault2 = true;
            };
            if ($info.length < this.rows) {
              this.loadingModalShow2 = false;
              this.isFormSearch2 = false;
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
        }, function(data) {
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
        }, function(data) {
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
                (function(str) {
                  that.$axios.get('/ajax/article/qo', {
                    id: str.id
                  }, (data) => {
                    if (data.success) {
                      str.title = data.data.title
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
                (function(str) {
                  queryBase.getOrganization(str.id, function(sc, value) {
                    if (sc) {
                      str.name = value.name
                      str.orgType = that.compType[value.orgType]
                      if (str.hasOrgLogo) {
                        str.logo = util.ImageUrl(('org/' + value.id + '.jpg'), true)
                      } else {
                        str.logo = util.defaultSet.img.org
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
