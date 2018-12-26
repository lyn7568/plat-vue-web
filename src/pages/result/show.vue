<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{patentInfo.title}}</div>
                <div class="info-operate zoom-operate">
                  <collectCo></collectCo>
                  <shareOut :tUrl="elurl"></shareOut>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content">
              <el-row :gutter="10" class="rel-detail">
                <el-col :span="12" v-if="patentInfo.code">
                  <el-col :span="5">专利号：</el-col>
                  <el-col :span="19">{{patentInfo.code}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.pubDay">
                  <el-col :span="5">公开日：</el-col>
                  <el-col :span="19">{{patentInfo.pubDay}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.reqCode">
                  <el-col :span="5">申请号：</el-col>
                  <el-col :span="19">{{patentInfo.reqCode}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.pubDay">
                  <el-col :span="5">申请日：</el-col>
                  <el-col :span="19">{{patentInfo.pubDay}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.reqPerson">
                  <el-col :span="5">申请人：</el-col>
                  <el-col :span="19">{{patentInfo.reqPerson}}</el-col>
                </el-col>
                <el-col :span="24" v-if="patentInfo.summary">
                  <el-col :span="24">摘要：</el-col>
                  <el-col :span="24" v-html="patentInfo.summary"></el-col>
                </el-col>
                <el-col :span="24" v-if="patentInfo.cooperation">
                  <el-col :span="24">合作备注：</el-col>
                  <el-col :span="24" v-html="patentInfo.cooperation"></el-col>
                </el-col>
                <el-col :span="24" v-if="patentInfo.keywords && patentInfo.keywords.length">
                  <el-row class="tag-item">
                    <el-tag v-for="sub in patentInfo.keywords" :key="sub.index">{{sub}}</el-tag>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content-title">
              <span>发明人</span>
            </div>
            <div class="content">
              <el-row :gutter="10">
                <el-col>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="inner-wrapper" v-if="likePatents">
            <div class="content-title">
              <span>您可能感兴趣的专利</span>
            </div>
            <div class="content">
              <baseResult v-for="item in likePatents" :key="item.index" :itemSingle="item"></baseResult>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="wrapper-right">
          <div class="block-wrapper" v-if="plat.adinfo.length" v-for="item in plat.adinfo" :key="item.index">
            <a class="ad-wrapper" :href="item.adUrl" target="_blank">
              <img :src="item.imgUrl" width="280" height="200">
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

  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';

  import baseResult from '@/components/subTemplate/BaseResult';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        activeName: 'first',
        patentInfo: '',
        elurl: '',
        likePatents: ''
      };
    },
    created() {
      this.patentId = util.urlParse('id');
      this.elurl = window.location.href;
      this.getPatentInfo();
      this.getLikePatents();
    },
    components: {
      shareOut,
      collectCo,
      baseResult
    },
    methods: {
      getPatentInfo() {
        this.$axios.getk('/ajax/ppatent/qo', {
          id: this.patentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.keywords) {
              $info.keywords = util.strToArr($info.keywords);
            }
            if ($info.reqDay) {
              $info.reqDay = util.TimeTr($info.reqDay);
            }
            if ($info.pubDay) {
              $info.pubDay = util.TimeTr($info.pubDay);
            }
            this.patentInfo = $info;
          };
        });
      },
      headUrl(item) {
        return item.hasHeadImage ? util.ImageUrl(('head/' + item.id + '_l.jpg'), true) : util.defaultSet.img.expert;
      },
      headIcon(item) {
        return util.autho(item.authType, item.orgAuth, item.authStatus);
      },
      getLikePatents() {
        var that = this
        that.$axios.getk('/ajax/ppatent/ralatePatents', {
          patentId: that.patentId
        }, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            that.likePatents = $data
          }
        })
      }
    }
  };
</script>
