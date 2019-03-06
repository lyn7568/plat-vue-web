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
            <span class="cmpName">{{orgInfo.name}}</span>
            <span v-if="orgInfo.type === '2'">{{compType[orgInfo.type]}} </span>
          </p>
          <p class="industry">{{keywordObj[1] ? keywordObj[1].join(" | ") : ''}}</p>
          <p class="addressbox">
            <em class="address"></em> {{citys[orgInfo.addr]}}</p>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="left-main">
        <div class="content-wrapper" v-if="platProducts && platProducts.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>我们的产品</span>
            </div>
            <div class="content content-nf" v-if="platProducts.length">
              <baseProduct v-for="item in platProducts" :key="item.index" :itemSingle="item" :noBlank="true"></baseProduct>
              <p class="moretype" @click="moreProduct" v-show="loadingModalShow">查看更多产品</p>
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
          <div class="inner-wrapper" v-if="keywordObj && keywordObj[2].length">
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
        <div class="content-wrapper" v-if="compContents && compContents.length">
          <div class="content-title">
            <span>相关文章</span>
          </div>
          <div class="content content-nf" v-if="compContents.length">
              <baseContent v-for="item in compContents" :key="item.index" :itemSingle="item" :noBlank="true"></baseContent>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { urlParse, defaultSet, commenTime } from '@/libs/util';
  import queryDict from '@/libs/queryDict';
  import baseContent from '@/components/subTemplate/BaseContent';
  import shareOut from '@/components/ShareOut';
  import baseProduct from '@/components/subTemplate/BaseProduct';

  export default {
    data() {
      return {
        orgInfo: {},
        pageSize: 2,
        pageNo: 1,
        keywordObj: [],
        numRanger: [],
        compType: [],
        citys: [],
        platProducts: [],
        loadingModalShow: false,
        isLoading: false,
        compContents: []
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
    components: {
      shareOut,
      baseProduct,
      baseContent
    },
    methods: {
      moreProduct() {
        this.pageNo++
        this.getProductlist();
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
        queryDict.applyDict('XZQH', function (dictData) {
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
        }, function (res) {
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
        }, function (res) {
          if (res.success) {
            const obj = res.data.data
            if (obj.length > 0) {
              if (res.data.pageNo !== that.pageNo) {
                that.loadingModalShow = false;
                return;
              }
              that.platProducts = that.platProducts.concat(obj);
              if (obj.length < that.pageSize) {
                that.loadingModalShow = false;
              } else {
                that.loadingModalShow = true;
              }
            } else {
              that.loadingModalShow = false;
            }
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
            let $info = res.data;
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
              that.compContents = $info;
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