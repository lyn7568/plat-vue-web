<template>
  <div class="browse-main">
    <div class="header-box">
      <div class="header_content">
        <div class="header_content_top">
          <div class="show-head headimg-box" :style="{backgroundImage:'url('+ expertInfo.img +')'}"></div>
        </div>
        <div class="header_content-footer">
          <p>
            <span class="cmpName">{{expertInfo.name}}</span>
            <em class="authicon" :class="headIcon(expertInfo)"></em>
          </p>
          <p class="industry" v-if="expertInfo.title">{{expertInfo.title}}</p>
          <p class="addressbox">
            <em class="address"></em> {{expertInfo.address}}</p>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="left-main">
        <div class="content-wrapper split-other" v-if="platServices && platServices.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>可提供服务</span>
            </div>
            <div class="content content-nf" v-if="platServices.length">
              <baseService v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService>
              <p class="moretype" @click="moreService" v-show="loadingModalShow">查看更多服务</p>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="inner-wrapper" v-if="expertInfo.descp">
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
          <div class="inner-wrapper" v-if="platPatents && platPatents.length">
            <div class="content-title">
              <span>专利</span>
            </div>
            <div class="content" v-if="platPatents.length">
              <baseResult v-for="item in platPatents" :key="item.index" :itemSingle="item"></baseResult>
              <p class="moretype" @click="morePatent" v-show="loadingModalShow2">查看更多服务</p>
            </div>
          </div>
        </div>
        <div class="content-wrapper" v-if="coopExperts && coopExperts.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>合作专家</span>
            </div>
            <div class="content content-nf">
              <BaseExpert v-for="item in coopExperts" :key="item.index" :itemSingle="item"></BaseExpert>
            </div>
          </div>
        </div>
        <div class="content-wrapper" v-if="expContents && expContents.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>相关文章</span>
            </div>
            <div class="content content-nf">
              <baseContent v-for="item in expContents" :key="item.index" :itemSingle="item" :showOwner="false" :noBlank="true"></baseContent>
            </div>
          </div>
        </div>
        <div class="content-wrapper" v-if="likeExperts && likeExperts.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>您可能感兴趣的专家</span>
            </div>
            <div class="content content-nf">
              <BaseExpert v-for="item in likeExperts" :key="item.index" :itemSingle="item"></BaseExpert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { urlParse, ImageUrl, defaultSet, strToArr, formatOfft, autho } from '@/libs/util';
  import queryBase from '@/libs/queryBase';
  import baseService from '@/components/subTemplate/BaseService';
  import baseContent from '@/components/subTemplate/BaseContent';
  import baseResult from '@/components/subTemplate/BaseResult';
  import BaseExpert from '@/components/subTemplate/BaseExpert';

  export default {
    data() {
      return {
        activeIndex: '1',
        activeName: 'first',
        expertInfo: '',
        expertId: '',
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
        rows: 2,
        expContents: '',
        likeExperts: '',
        coopExperts: ''
      };
    },
    created() {
      this.expertId = urlParse('id');
      this.getExpertInfo();
      this.getExpertWave();
      this.getExpertPatent();
      this.queryPubCount();
      this.getExpContent();
      this.getLikeExperts();
      this.getCoopExperts();
    },
    components: {
      baseService,
      baseResult,
      baseContent,
      BaseExpert
    },
    methods: {
      morePatent() {
        this.getExpertPatent();
      },
      moreService() {
        this.getExpertWave();
      },
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
            document.title = $info.name + '-' + PLAT.info.title
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
              for (let i = 0; i < $info.length; i++) {
                $info[i].authors = $info[i].authors.substr(0, $info[i].authors.length - 1);
              }
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
        }, function (data) {
          if (data.data > 0 && data.data < 99) {
            that.serCount = data.data;
          }
          if (data.data > 99) {
            that.serCount = '99+';
          }
        });
        this.$axios.getk('/ajax/ppatent/count/publish', {
          owner: that.expertId
        }, function (data) {
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
              let j = 0;
              for (let i = 0; i < $info.length; ++i) {
                j++
                that.$axios.get('/ajax/article/qo', {
                  id: $info[i].id
                }, (data) => {
                  j--
                  if (data.success) {
                    $info[i].title = data.data.title
                    if (j === 0) {
                      that.expContents = $info;
                    }
                  };
                });
              }

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
                }, function (data) {
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
              let j = 0;
              for (let i = 0; i < $info.length; ++i) {
                j++;
                $info[i].id = $info[i].professorId
                queryBase.getProfessor($info[i].professorId, function (sc, value) {
                  j--
                  if (sc) {
                    $info[i].name = value.name
                    $info[i].title = value.title
                    $info[i].hasHeadImage = value.hasHeadImage
                    if (j === 0) {
                      that.coopExperts = $info;
                    }
                  }
                })
              }
            }
          };
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../style/index';

  .header-box {
    background-image: url('../../image/personal_bg.png');
  }

  .show-head {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-size: cover;
    margin: auto;
  }

  .content .list-item .list-head.list-circular-head {
    border-radius: 50%;
  }
</style>