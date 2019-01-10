<template>
  <div class="browse-main">
		<div class="block-wrapper">
      <div class="content-wrapper">
        <div class="headcon-box">
          <div class="show-head headimg-box" :style="{backgroundImage:'url('+ expertInfo.img +')'}"></div>
          <div class="show-info reInfo-box">
            <div class="info-tit">{{expertInfo.name}}<em class="authicon" :class="headIcon(expertInfo)"></em></div>
            <div class="info-tag"><span v-if="expertInfo.title" style="margin-right:10px">{{expertInfo.title}}</span> {{expertInfo.offt}}</div>
            <div class="info-operate">
              <div class="addr">{{expertInfo.address}}</div>
              <shareOut :tUrl="elurl"></shareOut>
            </div>
          </div>
          <el-row class="goSpan" :gutter="10">
            <el-col :span="12"><collectCo :watchOptions="{oid: expertId, type: 1}"></collectCo></el-col>
            <!-- <el-col :span="12"><el-button type="primary">联系</el-button></el-col> -->
          </el-row>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">
            <div class="content-wrapper split-other" v-if="platThreeServices && platThreeServices.length">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>可提供服务</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content content-nf">
                  <baseService v-if="platThreeServices.length" v-for="item in platThreeServices" :key="item.index" :itemSingle="item"></baseService>
                </div>
              </div>
            </div>
            <div class="content-wrapper" v-if="expertInfo.descp">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>个人简介</span>
                </div>
                <div class="content">{{expertInfo.descp}}</div>
              </div>
              <div class="inner-wrapper" v-if="expertInfo.subject && expertInfo.subject.length">
                <div class="content-title">
                  <span>学术领域</span>
                </div>
                <div class="content">
                  <el-row class="tag-item">
                    <el-tag v-for="sub in expertInfo.subject" :key="sub.index">{{sub}}</el-tag>
                  </el-row>
                </div>
              </div>
              <div class="inner-wrapper" v-if="expertInfo.resAreas && expertInfo.resAreas.length">
                <div class="content-title">
                  <span>研究方向</span>
                </div>
                <div class="content">
                  <el-row class="tag-item">
                    <el-col :span="24" v-for="sub in expertInfo.resAreas" :key="sub.index">
                      <el-tag>{{sub}}</el-tag>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="inner-wrapper" v-if="expertInfo.industry && expertInfo.industry.length">
                <div class="content-title">
                  <span>行业领域</span>
                </div>
                <div class="content">
                  <el-row class="tag-item">
                    <el-tag v-for="sub in expertInfo.industry" :key="sub.index">{{sub}}</el-tag>
                  </el-row>
                </div>
              </div>
              <div class="inner-wrapper" v-if="platOnePatents && platOnePatents.lnegth">
                <div class="content-title">
                  <span>专利</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div class="content">
                  <baseResult v-if="platOnePatents.length" v-for="item in platOnePatents" :key="item.index" :itemSingle="item"></baseResult>
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
          <el-tab-pane :label="'专利 ' + (patCount>0 ? patCount : '')" name="third">
            <div v-show="!ifDefault2">
              <baseResult v-if="platPatents.length" v-for="item in platPatents" :key="item.index" :itemSingle="item"></baseResult>
              <Loading v-show="loadingModalShow2" :loadingComplete="loadingComplete2" :isLoading="isLoading2" v-on:upup="searchLower2"></Loading>
            </div>
            <defaultPage v-show="ifDefault2"></defaultPage>
          </el-tab-pane>
          <el-tab-pane label="资料" name="fourth">
            <div class="content-wrapper">
              <div class="inner-wrapper" v-if="expertInfo.projects && expertInfo.projects.length">
                <div class="content-title">
                  <span>项目经历</span>
                </div>
                <div class="content">
                   <div class="ulM">
                    <div class="liM" v-for="item in expertInfo.projects" :key="item.index">
                      <div class="liM-tit">{{item.name}}<small>{{item.startMonth ? item.startMonth.substr(0, 4) + '年' + item.startMonth.substr(4, 6) + '月':''}}{{item.startMonth?(item.stopMonth ? ' - ' + item.startMonth.substr(0, 4) + '年' + item.startMonth.substr(4, 6) + '月' : ' - 至今'):''}}</small></div>
                      <div class="liM-con">{{item.descp}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="inner-wrapper" v-if="expertInfo.honors && expertInfo.honors.length">
                <div class="content-title">
                  <span>荣誉奖项</span>
                </div>
                <div class="content">
                  <div class="ulM">
                    <div class="liM" v-for="item in expertInfo.honors" :key="item.index">
                      <div class="liM-tit">{{item.name}}<small>{{item.year ? item.year + '年' : ''}}</small></div>
                      <div class="liM-con">{{item.descp}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="inner-wrapper" v-if="expertInfo.jobs && expertInfo.jobs.length">
                <div class="content-title">
                  <span>工作经历</span>
                </div>
                <div class="content">
                  <div class="ulM">
                    <div class="liM" v-for="item in expertInfo.jobs" :key="item.index">
                      <div class="liM-tit">{{item.company}}{{item.department? ' - '+ item.department : ''}}{{item.title? ' - '+ item.title : ''}}<small>{{item.startMonth ? item.startMonth.substr(0, 4) + '年' + item.startMonth.substr(4, 6) + '月':''}}{{item.startMonth?(item.stopMonth ? ' - ' + item.startMonth.substr(0, 4) + '年' + item.startMonth.substr(4, 6) + '月' : ' - 至今'):''}}</small></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="inner-wrapper" v-if="expertInfo.edus && expertInfo.edus.length">
                <div class="content-title">
                  <span>教育背景</span>
                </div>
                <div class="content">
                  <div class="ulM">
                    <div class="liM" v-for="item in expertInfo.edus" :key="item.index">
                      <div class="liM-tit">{{item.school}}{{item.college? ' - '+ item.college : ''}}{{item.major? ' - '+ item.major : ''}}{{item.degree? ' - '+ item.degree : ''}}<small>{{item.year=='至今  '? item.year : item.year+'年'}}</small></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper" v-if="coopExperts && coopExperts.length">
          <div class="content-title">
            <span>合作专家</span>
          </div>
          <div class="content">
            <a v-for="item in coopExperts" :key="item.index" class="list-item" :href="'expert.html?id='+item.professorId" target="_blank">
              <div class="list-head" style="border-radius: 50%" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
              <div class="list-info">
                <div class="list-owner">{{item.name}}</div>
                <div class="list-owner">{{item.title}}</div>
                <div class="list-desc" v-if="item.patentCount>0">合作：{{item.patentCount}}项专利</div>
              </div>
            </a>
          </div>
        </div>
        <div class="content-wrapper" v-if="expContents && expContents.length">
          <div class="content-title">
            <span>相关文章</span>
          </div>
          <div class="content">
            <div class="ulM">
              <a class="liM" v-for="item in expContents" :key="item.index" :href="'content.html?id='+item.id" target="_blank">
                <div class="liM-tit">{{item.title}}</div>
              </a>
            </div>
          </div>
        </div>
        <div class="content-wrapper" v-if="likeExperts && likeExperts.length">
          <div class="content-title">
            <span>您可能感兴趣的专家</span>
          </div>
          <div class="content">
            <a v-for="item in likeExperts" :key="item.index" class="list-item" :href="'expert.html?id='+item.id" target="_blank">
              <div class="list-head" style="border-radius: 50%" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
              <div class="list-info">
                <div class="list-owner">{{item.name}}<em class="authicon" :class="item.auth"></em></div>
                <div class="list-desc">{{item.offt}}</div>
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
  import { urlParse, ImageUrl, defaultSet, strToArr, formatOfft, autho } from '@/libs/util';
  import queryBase from '@/libs/queryBase';

  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';
  import baseService from '@/components/subTemplate/BaseService';
  import baseResult from '@/components/subTemplate/BaseResult';

  export default {
    data() {
      return {
        activeIndex: '1',
        activeName: 'first',
        expertInfo: '',
        expertId: '',
        elurl: '',
        platServices: [],
        serCount: 0,
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false, // button style...
        ifDefault: false, // 是否缺省
        platPatents: [],
        patCount: 0,
        loadingModalShow2: true,
        loadingComplete2: false,
        isFormSearch2: false,
        isLoading2: false,
        ifDefault2: false,
        dataO: {
          serModifyTime: '',
          patTime: '',
          patId: ''
        },
        rows: 10,
        expContents: '',
        likeExperts: '',
        coopExperts: ''
      };
    },
    created() {
      this.expertId = urlParse('id');
      this.elurl = window.location.href;
      this.getExpertInfo();
      this.getExpertWave();
      this.getExpertPatent();
      this.queryPubCount();
      this.getExpContent();
      this.getLikeExperts();
      this.getCoopExperts();
    },
    computed: {
      platThreeServices() {
        var pt = this.platServices
        var str = []
        if (pt.length > 3) {
          for (let i = 0; i < 3; ++i) {
            str[i] = pt[i]
          }
        } else {
          str = pt
        }
        return str
      },
      platOnePatents() {
        var pt = this.platPatents
        var str = []
        if (pt.length > 1) {
          for (let i = 0; i < 1; ++i) {
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
      collectCo,
      baseService,
      baseResult
    },
    methods: {
      getExpertInfo() {
        this.$axios.getk('/ajax/professor/info/' + this.expertId, {
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            $info.offt = formatOfft($info);
            if ($info.subject) {
              $info.subject = strToArr($info.subject);
            }
            if ($info.industry) {
              $info.industry = strToArr($info.industry);
            }
            if ($info.hasHeadImage) {
              $info.img = ImageUrl(('head/' + $info.id + '_l.jpg'), true)
            } else {
              $info.img = defaultSet.img.expert
            }
            $info.resAreas = [];
            if ($info.researchAreas && $info.researchAreas.length > 0) {
              for (let i = 0; i < $info.researchAreas.length; ++i) {
                $info.resAreas.push($info.researchAreas[i].caption);
              }
            }
            this.expertInfo = $info;
          };
        });
      },
      getExpertWave() {
        this.$axios.getk('/ajax/ware/publish', {
          category: '1',
          owner: this.expertId,
          modifyTime: this.dataO.serModifyTime,
          rows: this.rows
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.serModifyTime = $info[$info.length - 1].modifyTime;
              this.platServices = this.isFormSearch ? this.platServices.concat($info) : $info;
              this.isFormSearch = true;
              if ($info.length < this.rows) {
                this.loadingModalShow = false;
                this.isFormSearch = false;
              };
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
          this.getExpertWave();
        }
      },
      getExpertPatent() {
        this.$axios.getk('/ajax/ppatent/professor', {
          owner: this.expertId,
          assTime: this.dataO.patTime,
          id: this.dataO.patId,
          rows: this.rows
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.patTime = $info[$info.length - 1].assTime;
              this.dataO.patId = $info[$info.length - 1].id;
              this.platPatents = this.isFormSearch2 ? this.platPatents.concat($info) : $info;
              this.isFormSearch2 = true;
              if ($info.length < this.rows) {
                this.loadingModalShow2 = false;
                this.isFormSearch2 = false;
              };
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
          this.getExpertPatent();
        }
      },
      queryPubCount() {
        var that = this
        this.$axios.getk('/ajax/ware/count/publish', {
          owner: that.expertId,
          category: '1'
        }, function(data) {
          if (data.data > 0 && data.data < 99) {
            that.serCount = data.data;
          }
          if (data.data > 99) {
           that.serCount = '99+';
          }
        });
        this.$axios.getk('/ajax/ppatent/count/publish', {
          owner: that.expertId
        }, function(data) {
          if (data.data > 0 && data.data < 99) {
            that.patCount = data.data;
          }
          if (data.data > 99) {
           that.patCount = '99+';
          }
        });
      },
      headIcon(item) {
        return autho(item.authType, item.orgAuth, item.authStatus);
      },
      getExpContent() {
        var that = this
        this.$axios.get('/ajax/article/lq/with/professor', {
          pid: this.expertId
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
              that.expContents = $info;
            };
          };
        });
      },
      getLikeExperts() {
        var that = this
        this.$axios.getk('/ajax/professor/ralateProfessors', {
          professorId: this.expertId
        }, (res) => {
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
                        that.likeExperts = obj
                      }, 1000);
                    }
                  }
                })
              }
            };
          };
        });
      },
      getCoopExperts() {
        var that = this
        this.$axios.getk('/ajax/professor/coadjutant', {
          id: this.expertId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              for (let i = 0; i < $info.length; ++i) {
                (function(str) {
                  queryBase.getProfessor(str.professorId, function(sc, value) {
                    if (sc) {
                      str.name = value.name
                      str.title = value.title
                      if (value.hasHeadImage) {
                        str.img = ImageUrl(('head/' + value.id + '_l.jpg'), true)
                      } else {
                        str.img = defaultSet.img.expert
                      }
                      that.$forceUpdate()
                    }
                  })
                })($info[i])
              }
              that.coopExperts = $info;
            }
          };
        });
      }
    }
  };
</script>
