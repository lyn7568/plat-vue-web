<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="content-wrapper">
        <div class="headcon-box org-head">
          <div class="show-head headimg-box">
            <img :src="orgInfo.logo">
          </div>
          <div class="show-info reInfo-box">
            <div class="info-tit">{{orgInfo.name}}</div>
            <div class="info-tag"><span v-if="orgInfo.type === '2'" style="margin-right:10px">{{compType[orgInfo.type]}} </span>{{keywordObj[1] ? keywordObj[1].join(" | ") : ''}}</div>
            <div class="info-operate">
              <div class="addr">{{citys[orgInfo.addr]}}</div>
              <shareOut></shareOut>
              <pageView v-if="companyId" :pageObj="{ tn: 'company', id: companyId, src: '1', noShow: true}"></pageView>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">
            <div class="content-wrapper split-other" v-if="platThreeProducts && platThreeProducts.length">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>我们的产品</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content content-nf" v-if="platThreeProducts.length">
                  <baseProduct v-for="item in platThreeProducts" :key="item.index" :itemSingle="item"></baseProduct>
                </div>
              </div>
            </div>
            <div class="content-wrapper" v-if="orgInfo.descp">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>企业简介</span>
                </div>
                <div class="content">{{orgInfo.descp}}</div>
              </div>
              <div class="inner-wrapper" v-if="orgInfo.subject && orgInfo.subject.length">
                <div class="content-title">
                  <span>专注领域</span>
                </div>
                <div class="content">
                  <el-row class="tag-item">
                    <el-tag v-for="sub in keywordObj[2]" :key="sub.index">{{sub}}</el-tag>
                  </el-row>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'产品 ' + (productCount || '')" name="second">
            <div v-show="!ifDefault" v-if="platProducts.length">
              <baseProduct v-for="item in platProducts" :key="item.index" :itemSingle="item"></baseProduct>
              <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
            </div>
            <defaultPage v-show="ifDefault"></defaultPage>
          </el-tab-pane>
          <el-tab-pane label="资料" name="third">
            <div class="content-wrapper">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>企业详情</span>
                </div>
                <div class="content">
                  <el-row style="width:100%" :gutter="10">
                    <el-col :span="12" v-if="orgInfo.name">
                      <el-col :span="6">企业名称：</el-col>
                      <el-col :span="18">{{orgInfo.name}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.size">
                      <el-col :span="6">企业规模：</el-col>
                      <el-col :span="18">{{numRanger[orgInfo.size]}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.type">
                      <el-col :span="6">企业类型：</el-col>
                      <el-col :span="18">{{compType[orgInfo.type]}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.location">
                      <el-col :span="6">企业地址：</el-col>
                      <el-col :span="18">{{orgInfo.location}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.foundYear">
                      <el-col :span="6">创立时间：</el-col>
                      <el-col :span="18">{{orgInfo.foundYear}}</el-col>
                    </el-col>
                    <el-col :span="12" v-if="orgInfo.url">
                      <el-col :span="6">企业官网：</el-col>
                      <el-col :span="18">{{orgInfo.url}}</el-col>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="inner-wrapper" v-if="keywordObj[2] && keywordObj[2].length">
                <div class="content-title">
                  <span>企业资质</span>
                </div>
                <div class="content">
                   <div class="ulM">
                    <div class="liM" v-for="item in keywordObj[2]" :key="item.index">
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
        <div class="content-wrapper" v-if="compContents && compContents.length">
          <div class="content-title">
            <span>相关文章</span>
          </div>
          <div class="content">
            <div class="ulM">
              <a class="liM" v-for="item in compContents" :key="item.index" :href="'content.html?id='+item.id" target="_blank">
                <div class="liM-tit">{{item.title}}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { urlParse, defaultSet } from '@/libs/util';
  import queryDict from '@/libs/queryDict';

  import shareOut from '@/components/ShareOut';
  import pageView from '@/components/pageView';
  import baseProduct from '@/components/subTemplate/BaseProduct';

  export default {
    data() {
      return {
        activeName: 'first',
        orgInfo: '',
        pageSize: 10,
        pageNo: 1,
        productCount: 0,
        total: 0,
        keywordObj: [],
        numRanger: [],
        compType: [],
        citys: [],
        platProducts: [],
        loadingModalShow: true,
        loadingComplete: false,
        isFormSearch: false,
        isLoading: false,
        ifDefault: false,
        compContents: ''
      };
    },
    created() {
      this.companyId = urlParse('id');
      this.getDictoryData();
      this.getorgInfo();
      this.getCompanyKeyword();
      this.getProductlist();
      this.getCompContent();
    },
    computed: {
      platThreeProducts() {
        var pt = this.platProducts
        var str = []
        if (pt.length > 3) {
          for (let i = 0; i < 3; ++i) {
            str[i] = pt[i]
          }
        } else {
          str = pt
        }
        return str
      }
    },
    components: {
      shareOut,
      pageView,
      baseProduct
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
        queryDict.applyDict('XZQH', function(dictData) {
          dictData.map(item => {
            that.citys[item.code] = item.caption
          })
        })
      },
      getorgInfo() {
        this.$axios.get('/ajax/company/qo', {
          id: this.companyId
        }, (res) => {
          if (res.success) {
            const obj = res.data
            if (!obj.logo) {
              obj.logo = defaultSet.img.org
            }
            document.title = obj.name + '-' + PLAT.info.title
            this.orgInfo = obj
          };
        });
      },
      getCompanyKeyword() {
        var that = this
        that.$axios.get('/ajax/company/qo/keyword', {
          id: that.companyId
        }, function(res) {
          if (res.success && res.data) {
            const str = res.data
            var objKey = {}
            if (str.length > 0) {
              str.map(item => {
                if (!objKey[item.type]) {
                  objKey[item.type] = []
                  objKey[item.type].push(item.value)
                } else {
                  objKey[item.type].push(item.value)
                }
              })
            }
            that.keywordObj = objKey
          }
        })
      },
      getProductlist() {
        var that = this
        this.$axios.get('/ajax/product/pq', {
          companyId: that.companyId,
          pageSize: that.pageSize,
          pageNo: that.pageNo
        }, function(res) {
          if (res.success) {
            const obj = res.data.data
            if (obj.length > 0) {
              that.isFormSearch = true;
              if (res.data.total > 0 && res.data.total < 99) {
                that.productCount = res.data.total;
              }
              if (res.data.total > 99) {
              that.productCount = '99+';
              }
              that.total = res.data.total;
              that.platProducts = that.platProducts.concat(obj);
              if (obj.length < that.pageSize) {
                that.loadingModalShow = false;
                that.isFormSearch = false;
              };
            }
            var liLen = that.platProducts.length;
            if (res.data.total === 0 && liLen === 0) {
              that.ifDefault = true;
            };
          }
        })
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.pageNo++;
          this.getProductlist();
        }
      },
      getCompContent() {
        var that = this
        this.$axios.get('/ajax/article/lq/with/company', {
          cid: this.companyId
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
              that.compContents = $info;
            };
          };
        });
      }
    }
  };
</script>
