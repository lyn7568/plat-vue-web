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
            <div class="info-tag"><span v-if="orgInfo.type === '1'" style="margin-right:10px">{{compType[orgInfo.type]}}</span> {{keywordObj[1] ? keywordObj[1].join(" | ") : ''}}</div>
            <div class="info-operate">
              <div class="addr">{{orgInfo.addr}}</div>
              <shareOut :tUrl="elurl"></shareOut>
            </div>
          </div>
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
                  <span>我们的产品</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content">
                  <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
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
          <el-tab-pane label="产品" name="second">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </el-tab-pane>
          <el-tab-pane label="资料" name="third">
            <div class="content-wrapper">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>企业详情</span>
                </div>
                <div class="content">
                  <el-row :gutter="10">
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
            <span>您可能感兴趣的企业</span>
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
        activeIndex: '1',
        activeName: 'first',
        orgInfo: '',
        elurl: '',
        keywordObj: [],
        numRanger: [],
        compType: [],
        platServices: [],
        platResources: []
      };
    },
    created() {
      this.companyId = util.urlParse('id');
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
            that.numRanger.push({ value: item.code, label: item.caption })
          })
        }) // 企业规模
        queryDict.applyDict('QYLX', function(dictData) {
          dictData.map(item => {
            that.compType.push({ value: item.code, label: item.caption })
          })
        }) // 企业类型
      },
      getorgInfo() {
        this.$axios.get('/ajax/company/qo', {
          id: this.companyId
        }, (res) => {
          if (res.success) {
            const obj = res.data
            if (obj.logo === '') {
              obj.logo = util.defaultSet.img.org
            }
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
      }
    }
  };
</script>
