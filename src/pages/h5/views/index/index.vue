<template>
	<div>
    <div class="bannerA">
      <div class="logoA">
        <h2>{{plat.title}}</h2>
        <span>www.xttjpt.cn</span>
      </div>
      <img width="100%" src="../../image/bg1218.jpg" />
      <div class="search-wrap">
        <el-input class="search-input" placeholder="搜索专家、服务、资源" prefix-icon="el-icon-search"
        v-model="searchInput" @keyup.enter.native="enterSearch()"> </el-input>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="mainbox">
        <div class="maintit">热门</div>
        <el-row class="gridbg">
          <el-col :span="8" v-for="item in navList" :key="item.index">
            <a :href="LinkToSearch(item.tab)">
              <i class="media-icon" :class="'icon-'+ item.icon"></i>
              <span class="media-body">{{item.name}}</span>
            </a>
          </el-col>
        </el-row>
      </div>
      <div class="mainbox">
        <div class="maintit">特约专家</div>
        <div class="content content-nf" v-if="platExperts && platExperts.length">
          <baseExpert v-for="item in platExperts" :key="item.index" :itemSingle="item" :noBlank="true"></baseExpert>
        </div>
        <a class="seeMore" :href="LinkToSearch('2')"><em>查看更多</em></a>
      </div>
      <div class="mainbox">
        <div class="maintit">热门资源</div>
        <div class="content content-nf" v-if="platResources && platResources.length">
          <baseResource v-for="item in platResources" :key="item.index" :itemSingle="item" :noBlank="true"></baseResource>
        </div>
        <a class="seeMore" :href="LinkToSearch('4')"><em>查看更多</em></a>
      </div>
      <div class="mainbox">
        <div class="maintit">最新入驻企业</div>
        <div class="content content-nf" v-if="residentComps && residentComps.length">
          <baseCompany v-for="item in residentComps" :key="item.index" :itemSingle="item" :noBlank="true"></baseCompany>
        </div>
        <a class="seeMore" :href="LinkToSearch('7')"><em>查看更多</em></a>
      </div>
    </div>
	</div>
</template>

<script>
  import { urlParse, commenTime, formatOfft, ImageUrl, defaultSet, autho } from '@/libs/util';
  import queryBase from '@/libs/queryBase';
  import baseExpert from '@/components/subTemplate/BaseExpert';
  import baseResource from '@/components/subTemplate/BaseResource';
  import baseCompany from '@/components/subTemplate/BaseCompany';

  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        plat: PLAT.info,
        searchInput: '',
        platExperts: '',
        platResources: '',
        residentComps: '',
        navList: [
          {
            icon: 'mai',
            name: '平台动态',
            tab: '1'
          },
          {
            icon: 'co',
            name: '找服务',
            tab: '3'
          },
          {
            icon: 'jiao',
            name: '找资源',
            tab: '4'
          },
          {
            icon: 'bow',
            name: '找成果',
            tab: '5'
          },
          {
            icon: 'peo',
            name: '专家库',
            tab: '2'
          },
          {
            icon: 'more',
            name: '更多领域',
            tab: ''
          }
        ]
      };
    },
    created() {
      this.buttedProfessors()
      this.queryPlatResources()
      this.queryResidentComps();
    },
    components: {
      baseExpert,
      baseResource,
      baseCompany
    },
    methods: {
      LinkToSearch(val) {
        return 'h5.html#/search?n=' + val
      },
      enterSearch() {
        location.href = 'h5.html#/search?k=' + this.searchInput
      },
      buttedProfessors() {
        var that = this
        that.$axios.get('/ajax/professor/list', {}, (res) => {
          if (res.success) {
            var $data = res.data;
            var arr = []
            var hdata = { num: 1, data: $data }
            if ($data.length > 0) {
              $data.sort(function(a, b) {
                return a.level > b.level ? 1 : (a.level === b.level ? 0 : -1)
              })
              for (let i = 0; i < ($data.length > 5 ? 5: $data.length); ++i) {
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
                        that.platExperts = obj
                      }, 1000)
                    }
                  }
                })
              }
            }
          }
        })
      },
      queryPlatResources() {
        this.$axios.getk('/ajax/resource/index/search', {
          rows: 5
        }, (res) => {
          var _this = this;
          if (res.success) {
            var $info = res.data;
            for (let i = 0; i < $info.length; i++) {
              if ($info[i].images.length > 0) {
                $info[i].img = ImageUrl('resource/' + $info[i].images[0].imageSrc)
              } else {
                $info[i].img = defaultSet.img.resource
              }
              (function(m) {
                _this.ownerByond($info[m]);
              }(i));
            };
            this.platResources = $info;
          };
        });
      },
      ownerByond(item) {
        var _this = this;
        var type, id;
        if (item.resourceType) {
          type = item.resourceType;
          id = item.professorId || item.orgId;
        }
        if (item.category) {
          type = item.category;
          id = item.owner;
        };
        if (type === '1') {
          queryBase.getProfessor(id, function(sc, value) {
            if (sc) {
              item.ownerName = value.name;
              _this.$forceUpdate();
            }
          });
        } else if (type === '2') {
          queryBase.getOrganization(id, function(sc, value) {
            if (sc) {
              item.ownerName = value.forShort ? value.forShort : value.name;
              _this.$forceUpdate();
            }
          });
        }
      },
      queryResidentComps() {
        this.$axios.get('/ajax/company/pq', {
          pageSize: 5,
          pageNo: 1
        }, (res) => {
          if (res.success) {
            var $info = res.data.data;
            for (let i = 0; i < $info.length; ++i) {
              if (!$info[i].logo) {
                $info[i].logo = defaultSet.img.org
              }
            }
            this.residentComps = $info;
          };
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../style/index';

  .bannerA {
    width: 100%;
    height:auto;
    position: relative;
    overflow: hidden;
    .logoA{
      text-align: center;
      width:100%;
      position: absolute;
      top:26%;
      z-index: 2;
      color: #fff;
      h2{
        font-size:30px;
        line-height: 38px;
      }
      span{
        font-size: 16px;
      }
    }
    img{
      display:block;
    }
  }

  .search-wrap{
    position: absolute;
    bottom: 16px;
    height: 40px;
    padding: 0 10px;
    width: 96%;
    left:50%;
    transform: translate(-50%, 0);
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    .search-input{
      position: absolute;
      left:0;
      top:0;
      width:100%;
      font-size:14px;
      height:40px;
      line-height:24px;
      input{
        border:none;
      }
    }
  }

  .gridbg{
    background: #FFFFFF;
    margin:auto;
    border-top: 1px solid #eee;
    .media-body{
      display: block;
      text-align: center;
      color: #333;
      font-size: 13px;
    } 
    .media-icon{
      display: block;
      margin:10px auto;
      width: 24px;
      height:24px;
      &.icon-bow{
        @include bg-image('../../image/field_icon/bow-icon.png');
      }
      &.icon-jiao{
        @include bg-image('../../image/field_icon/jiao-icon.png');
      }
      &.icon-co{
        @include bg-image('../../image/field_icon/co-icon.png');
      }
      &.icon-mai{
        @include bg-image('../../image/field_icon/mai-icon.png');
      }
      &.icon-more{
        @include bg-image('../../image/field_icon/more-icon.png');
      }
      &.icon-peo{
        @include bg-image('../../image/field_icon/peo-icon.png');
      }
    }
    .el-col{
      padding: 10px 4px;
      text-align:center;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
  }

  .mainbox{
    width:100%;
    margin:10px auto;
    padding: 0;
    background: #FFFFFF;
    .maintit{
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      color: #666;
    }
    .content{
      border-top: 1px solid #eee;
    }
  }

  .seeMore{
    display: block;
    cursor:pointer;
    text-align:center;
    font-size:14px;
    color:#999;
    line-height:40px;
    height:40px;
    border-top:1px solid #E5E5E5;
    position: relative;
    em{
      font-style: normal;
      position:relative;
      padding-right:5px;
      &:before{
        border: solid transparent;
        border-left-color:#ccc;
        border-width: 7px;
        content: " ";
        position: absolute;
        left: 100%;
        top: 1px;
      }
      &:after{
        border: solid transparent;
        border-left-color:#fff;
        border-width: 5px;
        content: " ";
        position: absolute;
        left: 100%;
        top: 3px;
      }
    }
    &:active{background: none;}
  }
</style>

