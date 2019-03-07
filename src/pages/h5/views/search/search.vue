<template>
  <div>
    <div class="fixedBlock">
      <div class="searchBox">
        <el-input placeholder="请输入关键词" v-model="searchText" @keyup.enter.native="clearToFun"></el-input>
      </div>
      <div class="tabBox">
        <div class="swiper-container-tab" ref="swiperNavTab">
          <div class="swiper-wrapper swiper-wrapper-tab">
            <div class="swiper-slide swiper-slide-tab"
              :class="item.tab===activeTab?'active-tab':''"
              v-for="item in navList"
              :key="item.index"
              @click.stop="slideChanged(item.tab)"
            >{{item.tit}}</div>
          </div>
        </div>
      </div>
      <div class="tabBox columnTab" v-if="activeTab==='1'">
        <div class="swiper-container-tab" ref="swiperColumnTab">
          <div class="swiper-wrapper swiper-wrapper-tab">
            <div class="swiper-slide swiper-slide-tab"
              :class="item.val===activeColumn?'active-tab':''"
              v-for="item in platTrend"
              :key="item.index"
              @click.stop="slideChangedColumn(item.val)"
            >{{item.tit}}</div>
          </div>
        </div>
      </div>
    </div>
    <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData" :topVal="activeTab==='1'? '122' : '84'">
      <div v-if="activeTab==='1'">
        <template v-if="contentList.length">
          <baseContent v-for="watc in contentList" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseContent>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
      <div v-if="activeTab==='2'">
        <template v-if="searchExpert.length">
          <baseExpert v-for="watc in searchExpert" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseExpert>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
      <div v-if="activeTab==='3'">
        <template v-if="serviceList.length">
          <baseService v-for="watc in serviceList" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseService>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
      <div v-if="activeTab === '4'">
        <template v-if="resourceList.length">
          <baseResource v-for="watc in resourceList" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseResource>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
      <div v-if="activeTab === '5'">
        <template v-if="resultList.length">
          <baseResult v-for="watc in resultList" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseResult>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
      <div v-if="activeTab === '6'">
        <template v-if="searchOrg.length">
          <baseOrg v-for="watc in searchOrg" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseOrg>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
      <div v-if="activeTab === '7'">
        <template v-if="companyList.length">
          <baseCompany v-for="watc in companyList" :key="watc.index" :itemSingle="watc" :noBlank="true"></baseCompany>
        </template>
        <defaultPage v-else></defaultPage>
      </div>
    </v-scroll>
  </div>
</template>

<script>
import { urlParse, commenTime, formatOfft, ImageUrl, defaultSet, autho, platTrend } from '@/libs/util';
import baseExpert from '@/components/subTemplate/BaseExpert';
import baseOrg from '@/components/subTemplate/BaseOrg';
import baseCompany from '@/components/subTemplate/BaseCompany';
import baseService from '@/components/subTemplate/BaseService';
import baseResource from '@/components/subTemplate/BaseResource';
import baseResult from '@/components/subTemplate/BaseResult';
import baseContent from '@/components/subTemplate/BaseContent';

import loadmore from './scrollMore.vue';
export default {
  data() {
    return {
      activeTab: '1',
      activeColumn: '1',
      platTrend,
      navList: [
        {
          tit: '动态',
          tab: '1'
        },
        {
          tit: '专家',
          tab: '2'
        },
        {
          tit: '服务',
          tab: '3'
        },
        {
          tit: '资源',
          tab: '4'
        },
        {
          tit: '成果',
          tab: '5'
        },
        {
          tit: '机构',
          tab: '6'
        },
        {
          tit: '企业',
          tab: '7'
        }
      ],
      contentList: [],
      expertList: [],
      serviceList: [],
      resourceList: [],
      resultList: [],
      orgList: [],
      companyList: [],
      dataO: {
        resSortNum: '',
        resTime: '',
        resId: '',
        serSortFirst: '',
        serTime: '',
        serId: '',
        patSortNum: '',
        patCreateTime: '',
        patId: ''
      },
      searchText: '',
      pageNo: 1,
      rows: 10,
      scrollData:{
        noFlag: false, //暂无更多数据显示
        loading: false
      }
    };
  },
  components: {
    'v-scroll': loadmore,
    baseExpert,
    baseOrg,
    baseCompany,
    baseService,
    baseResource,
    baseResult,
    baseContent
  },
  computed: {
    searchExpert: function() {
      var search = this.searchText;
      if (search) {
        return this.expertList.filter(function(item) {
          return Object.keys(item).some(function(key) {
            return String(item[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.expertList;
    },
    searchOrg: function() {
      var search = this.searchText;
      if (search) {
        return this.orgList.filter(function(item) {
          return Object.keys(item).some(function(key) {
            return String(item[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.orgList;
    }
  },
  watch: {
    activeTab(val) {
      var num = parseInt(val) - 1
      if (num < 3) {
        num = 0
      }
      this.mySwiperTab.slideTo(num, 500, false)
      this.clearToFun()
    },
    activeColumn(val) {
      this.contentList = []
      this.pageNo = 1
      this.contentListFun()
    }
  },
  created() {
    if (urlParse('n')) {
      this.activeTab = urlParse('n');
    }
    if (urlParse('k')) {
      this.searchText = urlParse('k');
    }
    this.tabTofun()
  },
  mounted() {
    var that = this
    this.mySwiperTab = new Swiper(that.$refs.swiperNavTab, {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true
    });
    this.swiperColumnTab = new Swiper(that.$refs.swiperColumnTab, {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true
    });
  },
  methods: {
    slideChanged(val) {
      this.activeTab = val;
    },
    slideChangedColumn(val) {
      this.activeColumn = val
    },
    clearToFun() {
      this.contentList = []
      this.expertList = []
      this.serviceList = []
      this.resourceList = []
      this.resultList = []
      this.orgList = []
      this.companyList = []
      this.dataO = {
        resSortNum: '',
        resTime: '',
        resId: '',
        serSortFirst: '',
        serTime: '',
        serId: '',
        patSortNum: '',
        patCreateTime: '',
        patId: ''
      }
      this.pageNo = 1
      this.tabTofun()
    },
    tabTofun() {
      const tab = this.activeTab
      if (tab === '1') {
        this.contentListFun()
      } else if (tab === '2') {
        this.expertListFun()
      } else if (tab === '3') {
        this.serviceListFun()
      } else if (tab === '4') {
        this.resourceListFun()
      } else if (tab === '5') {
        this.resultListFun()
      } else if (tab === '6') {
        this.orgListFun()
      } else if (tab === '7') {
        this.companyListFun()
      }
    },
    onLoadMore(done) {
      var that = this
      this.pageNo++;
      setTimeout(() => {
        that.tabTofun()
        done();
      }, 2000);
    },
    contentListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      this.$axios.get('/ajax/article/pq', {
        title: that.searchText,
        catalog: that.activeColumn,
        published: 1,
        pageSize: that.rows,
        pageNo: that.pageNo
      }, (res) => {
        if (res.success && res.data) {
          if (res.data.pageNo !== that.pageNo) {
            that.scrollData.loading = false
            that.scrollData.noFlag = true
            return;
          }
          var $info = res.data.data;
          if ($info.length > 0) {
            for (let i = 0; i < $info.length; ++i) {
              if ($info[i].modifyTime) {
                $info[i].modifyTime = commenTime($info[i].modifyTime, true)
              }
            }
            that.contentList = that.contentList.concat($info);
          }
        };
        that.scrollData.loading = false
      });
    },
    expertListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      that.$axios.get('/ajax/professor/list', {}, (res) => {
        if (res.success) {
          var $data = res.data;
          var arr = []
          var hdata = { num: 1, data: $data }
          if ($data.length > 0) {
            for (let i = 0; i < $data.length; ++i) {
              hdata.num++
              arr[i] = $data[i].id;
              hdata.num--
            }
            hdata.num--
            if (hdata.num === 0 && arr.length) {
              that.$axios.getk('/ajax/professor/qm', {
                id: arr
              }, function(data) {
                if (data.success && data.data) {
                  var obj = data.data
                  if (obj.length > 0) {
                    for (let m = 0; m < obj.length; ++m) {
                      obj[m].img = defaultSet.img.expert
                      if (obj[m].hasHeadImage) {
                        obj[m].img = ImageUrl(('head/' + obj[m].id + '_l.jpg'), true)
                      }
                      obj[m].auth = autho(obj[m].authType, obj[m].orgAuth, obj[m].authStatus)
                      obj[m].offt = formatOfft(obj[m], true)
                    }
                    setTimeout(() => {
                      for (let j = 0; j < obj.length; ++j) {
                        for (let n = 0; n < $data.length; ++n) {
                          if (obj[j].id === $data[n].id) {
                            if ($data[n].level) {
                              obj[j].level = $data[n].level
                            } else {
                              obj[j].level = 99999
                            }
                          }
                        }
                      }
                      obj.sort(function(a, b) {
                        return a.level > b.level ? 1 : (a.level === b.level ? 0 : -1)
                      })
                      that.expertList = obj
                      that.scrollData.loading = false
                      that.scrollData.noFlag = true
                    }, 1000)
                  }
                }
              })
            }
          }
        } else {
          that.scrollData.loading = false
        }
      })
    },
    orgListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      that.$axios.get('/ajax/org/list', {}, (res) => {
        if (res.success) {
          var $data = res.data;
          var arr = []
          var hdata = { num: 1, data: $data }
          if ($data.length > 0) {
            for (let i in $data) {
              hdata.num++
              arr[i] = $data[i].id;
              hdata.num--
            }
            hdata.num--
            if (hdata.num === 0 && arr.length) {
              that.$axios.getk('/ajax/org/qm', {
                id: arr
              }, function(data) {
                if (data.success && data.data) {
                  var obj = data.data
                  if (obj.length > 0) {
                    for (let m = 0; m < obj.length; ++m) {
                      obj[m].logo = defaultSet.img.org
                      if (obj[m].hasOrgLogo) {
                        obj[m].logo = ImageUrl(('org/' + obj[m].id + '.jpg'), true)
                      }
                      if (obj[m].industry) {
                        obj[m].industry = obj[m].industry.replace(/,/g, ' | ')
                      }
                    }
                    setTimeout(() => {
                      for (let j = 0; j < obj.length; ++j) {
                        for (let n = 0; n < $data.length; ++n) {
                          if (obj[j].id === $data[n].id) {
                            if ($data[n].level) {
                              obj[j].level = $data[n].level
                            } else {
                              obj[j].level = 99999
                            }
                          }
                        }
                      }
                      obj.sort(function(a, b) {
                        return a.level > b.level ? 1 : (a.level === b.level ? 0 : -1)
                      })
                      that.orgList = obj
                      that.scrollData.loading = false
                      that.scrollData.noFlag = true
                    }, 1000);
                  }
                }
              })
            }
          }
        } else {
          that.scrollData.loading = false
        }
      })
    },
    companyListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      this.$axios.get('/ajax/company/pq', {
        name: that.searchText,
        pageSize: that.rows,
        pageNo: that.pageNo
      }, (res) => {
        if (res.success) {
          if (res.data.pageNo !== that.pageNo) {
            that.scrollData.loading = false
            that.scrollData.noFlag = true
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
            that.companyList = that.companyList.concat($info);
          };
        };
        that.scrollData.loading = false
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
    resourceListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      this.$axios.getk('/ajax/resource/index/search', {
        key: that.searchText,
        sortNum: that.dataO.resSortNum,
        publishTime: that.dataO.resTime,
        id: that.dataO.resId,
        rows: that.rows
      }, (res) => {
        if (res.success) {
          var $info = res.data;
          if ($info.length > 0) {
            that.dataO.resSortNum = $info[$info.length - 1].sortNum;
            that.dataO.resTime = $info[$info.length - 1].publishTime;
            that.dataO.resId = $info[$info.length - 1].resourceId;
            that.resourceList = that.resourceList.concat($info);
          } else {
            that.scrollData.noFlag = true;
          }
        };
        that.scrollData.loading = false
      });
    },
    resultListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      this.$axios.getk('/ajax/ppatent/index/search', {
        key: that.searchText,
        sortNum: that.dataO.patSortNum,
        createTime: that.dataO.patCreateTime,
        id: that.dataO.patId,
        rows: that.rows
      }, (res) => {
        if (res.success) {
          var $info = res.data;
          if ($info.length > 0) {
            that.dataO.patSortNum = $info[$info.length - 1].sortNum;
            that.dataO.patCreateTime = $info[$info.length - 1].createTime;
            that.dataO.patId = $info[$info.length - 1].id;
            that.resultList = that.resultList.concat($info);
          } else {
            that.scrollData.noFlag = true;
          }
        };
        that.scrollData.loading = false
      });
    },
    serviceListFun() {
      var that = this
      that.scrollData.loading = true
      that.scrollData.noFlag = false
      this.$axios.getk('/ajax/ware/index/search', {
          key: that.searchText,
          sortFirst: that.dataO.serSortFirst,
          time: that.dataO.serTime,
          id: that.dataO.serId,
          rows: that.rows
      }, (res) => {
        if (res.success) {
          var $info = res.data;
          if ($info.length > 0) {
            that.dataO.serSortFirst = $info[$info.length - 1].sortFirst;
            that.dataO.serTime = $info[$info.length - 1].modifyTime;
            that.dataO.serId = $info[$info.length - 1].id;
            that.serviceList = that.serviceList.concat($info);
          } else {
            that.scrollData.noFlag = true;
          }
        };
        that.scrollData.loading = false
      });
    }
  },
  beforeDestroy() {
    this.mySwiperTab.destroy()
    this.swiperColumnTab.destroy()
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../style/index';
.fixedBlock {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  .searchBox {
    display: flex;
    justify-content: center;
    position: relative;
    height: 42px;
    background: $--color-primary;
    overflow: hidden;
    .el-input {
      width: 98%;
      margin: 6px auto;
      .el-input__inner {
        border-color: $--color-primary;
        height: 30px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
.tabBox {
  height: 40px;
  .swiper-slide-tab {
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background: #fff;
    width: auto;
    padding: 0 5%;
    &:after {
      position: absolute;
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
      z-index: 2;
      display: block;
      width: 100%;
      height: 1px;
      content: "";
      background-color: #dcdcdc;
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
      -webkit-transform: scaleY(0.5);
    }
    &.active-tab {
      color: $--color-primary;
      &:after {
        opacity: 1;
        background-color: $--color-primary;
        height: 4px;
      }
    }
  }
  &.columnTab{
    top: 80px;
    width: 100%;
    z-index: 4;
    .swiper-slide-tab{
      margin: 4px;
      line-height: 32px;
      padding:0 8px;
      &:after{
        content:none;
      }
      &.active-tab {
        background: $--color-primary;
        color:#fff;
        &:after {
          content:none;
        }
      }
    }
  }
}

</style>
