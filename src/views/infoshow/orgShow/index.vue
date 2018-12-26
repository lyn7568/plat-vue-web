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
                  <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
                </div>
              </div>
              <div class="inner-wrapper" v-if="platResources.length">
                <div class="content-title">
                  <span>可共享资源</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div class="content">
                  <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
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
          <el-tab-pane label="服务" name="second">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </el-tab-pane>
          <el-tab-pane label="资源" name="third">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
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
            <span>您可能感兴趣的机构</span>
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
  import '@/styles/listitem.scss';
  import '@/styles/browse.scss';
  import util from '@/libs/util';
  import queryDict from '@/libs/queryDict';

  import shareOut from '../components/ShareOut';
  import baseService from '@/views/sub-component/BaseService';

  export default {
    data() {
      return {
        activeName: 'first',
        numRanger: [],
        compType: [],
        orgInfo: '',
        elurl: '',
        platServices: [],
        platResources: []
      };
    },
    created() {
      this.orgId = util.urlParse('id');
      this.elurl = window.location.href;
      this.getDictoryData();
      this.getorgInfo();
    },
    components: {
      shareOut,
      baseService
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
      }
    }
  };
</script>
