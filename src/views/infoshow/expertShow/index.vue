<template>
  <div class="browse-main">
		<div class="block-wrapper">
      <div class="content-wrapper">
        <div class="headcon-box">
          <div class="show-head headimg-box" :style="{backgroundImage:'url('+ headUrl(expertInfo) +')'}"></div>
          <div class="show-info reInfo-box">
            <div class="info-tit">{{expertInfo.name}}<em class="authicon" :class="headIcon(expertInfo)"></em></div>
            <div class="info-tag"><span v-if="expertInfo.title" style="margin-right:10px">{{expertInfo.title}}</span> {{expertInfo.offt}}</div>
            <div class="info-operate">
              <div class="addr">{{expertInfo.address}}</div>
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
            <div class="content-wrapper split-other" v-if="platServices.length">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>可提供服务</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content">
                  <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
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
              <div class="inner-wrapper" v-if="platPatents.lnegth">
                <div class="content-title">
                  <span>专利</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div class="content">
                  <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务" name="second">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </el-tab-pane>
          <el-tab-pane label="专利" name="third">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
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
        <div class="content-wrapper">
          <div class="content-title">
            <span>合作专家</span>
          </div>
          <div class="content">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content-title">
            <span>相关文章</span>
          </div>
          <div class="content">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content-title">
            <span>您可能感兴趣的专家</span>
          </div>
          <div class="content">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import '@/common/stylus/listitem.styl';
  import '@/common/stylus/browse.styl';
  import util from '@/libs/util';
  import httpUrl from '@/libs/http';

  import shareOut from '../components/ShareOut';
  import baseService from '@/views/sub-component/BaseService';

  export default {
    data() {
      return {
        activeIndex: '1',
        activeName: 'first',
        expertInfo: '',
        elurl: '',
        platServices: [],
        platPatents: []
      };
    },
    created() {
      this.expertId = util.urlParse('id');
      this.elurl = window.location.href;
      this.getExpertInfo();
    },
    components: {
      shareOut,
      baseService
    },
    methods: {
      getExpertInfo() {
        this.$axios.get(httpUrl.kxQurey.professor.query2 + this.expertId, {
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            $info.offt = util.formatOfft($info);
            if ($info.subject) {
              $info.subject = util.strToArr($info.subject);
            }
            if ($info.industry) {
              $info.industry = util.strToArr($info.industry);
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
      headUrl(item) {
        return item.hasHeadImage ? util.ImageUrl(('head/' + item.id + '_l.jpg'), true) : util.defaultSet.img.expert;
      },
      headIcon(item) {
        return util.autho(item.authType, item.orgAuth, item.authStatus);
      }
    }
  };
</script>
