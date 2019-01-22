<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{patentInfo.name}}</div>
                <div class="info-operate zoom-operate">
                  <collectCo :watchOptions="{oid: patentId, type: 5}"></collectCo>
                  <shareOut :tUrl="elurl"></shareOut>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content">
              <el-row :gutter="10" class="rel-detail">
                <el-col :span="12" v-if="patentInfo.code">
                  <el-col :span="4">专利号:</el-col>
                  <el-col :span="20">{{patentInfo.code}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.pubDay">
                  <el-col :span="4">公开日:</el-col>
                  <el-col :span="20">{{patentInfo.pubDay}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.reqCode">
                  <el-col :span="4">申请号:</el-col>
                  <el-col :span="20">{{patentInfo.reqCode}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.pubDay">
                  <el-col :span="4">申请日:</el-col>
                  <el-col :span="20">{{patentInfo.pubDay}}</el-col>
                </el-col>
                <el-col :span="12" v-if="patentInfo.reqPerson">
                  <el-col :span="4">申请人:</el-col>
                  <el-col :span="20">{{patentInfo.reqPerson}}</el-col>
                </el-col>
                <el-col :span="24" v-if="patentInfo.summary">
                  <el-col :span="24">摘要:</el-col>
                  <el-col :span="24" v-html="patentInfo.summary"></el-col>
                </el-col>
                <el-col :span="24" v-if="patentInfo.cooperation">
                  <el-col :span="24">合作备注:</el-col>
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
          <div class="inner-wrapper" v-if="patentAuthors && patentAuthors.length">
            <div class="content-title">
              <span>发明人{{authorCount > 0 ? `(${authorCount})` : ''}}</span>
            </div>
            <div class="content">
              <el-row :gutter="10" style="width:100%">
                <el-col :span="12" class="item-col" v-for="item in patentAuthors" :key="item.index">
                  <div v-if="item.professorId.substring(0, 1) !== '#' && item.owner" class="list-item">
                    <a :href="'expert.html?id='+item.professorId" target="_blank"><div class="list-head" style="border-radius:50%" :style="{backgroundImage: 'url(' + item.owner.img + ')'}"></div></a>
                    <div class="list-info">
                      <div class="list-tit">{{item.owner.name}}</div>
                      <div class="list-desc">{{item.owner.title}}</div>
                    </div>
                    <div class="list-link" style="right: 0">
                      <contactChat :contactOptions="{oid: item.professorId }"></contactChat>
                    </div>
                  </div>
                  <div class="list-item" v-else>
                    <div class="list-head" style="border-radius:50%" :style="{backgroundImage: 'url(' + defaultExpertImg + ')'}"></div>
                    <div class="list-info">
                      <div class="list-tit">{{item.name}}</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="inner-wrapper" v-if="likePatents && likePatents.length">
            <div class="content-title">
              <span>您可能感兴趣的专利</span>
            </div>
            <div class="content content-nf">
              <baseResult v-for="item in likePatents" :key="item.index" :itemSingle="item"></baseResult>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="wrapper-right">
          <div class="block-wrapper" v-if="adinfo.length">
            <a class="ad-wrapper" v-for="item in adinfo" :key="item.index" :href="item.adUrl" target="_blank">
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
  import { urlParse, ImageUrl, defaultSet, strToArr, TimeTr } from '@/libs/util';

  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';
  import contactChat from '@/components/ContactChat';

  import baseResult from '@/components/subTemplate/BaseResult';
  import queryBase from '@/libs/queryBase';

  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        adinfo: PLAT.info.adinfo,
        activeName: 'first',
        patentInfo: '',
        patentId: '',
        elurl: '',
        likePatents: '',
        patentAuthors: '',
        defaultExpertImg: defaultSet.img.expert
      };
    },
    created() {
      this.patentId = urlParse('id');
      this.elurl = window.location.href;
      this.getPatentInfo();
      this.getLikePatents();
      this.getPatentAuthors();
    },
    components: {
      shareOut,
      collectCo,
      contactChat,
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
              $info.keywords = strToArr($info.keywords);
            }
            if ($info.reqDay) {
              $info.reqDay = TimeTr($info.reqDay);
            }
            if ($info.pubDay) {
              $info.pubDay = TimeTr($info.pubDay);
            }
            this.patentInfo = $info;
          };
        });
      },
      getPatentAuthors() {
        var that = this
        that.$axios.getk('/ajax/ppatent/authors', {
          id: that.patentId
        }, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            if ($data.length > 0) {
              that.authorCount = $data.length
              for (let i = 0; i < $data.length; ++i) {
                if ($data[i].professorId.substring(0, 1) !== '#') {
                  queryBase.getProfessor($data[i].professorId, function(sc, value) {
                    if (sc) {
                      if (value.hasHeadImage) {
                        value.img = ImageUrl(('head/' + value.id + '_l.jpg'), true)
                      } else {
                        value.img = defaultSet.img.expert
                      }
                      $data[i].owner = value
                      that.$forceUpdate();
                    }
                  });
                }
              }
              that.patentAuthors = $data
            }
          }
        })
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

<style lang="scss" scoped>
.browse-main .block-wrapper .left-main .inner-wrapper .content
.item-col{
  margin-bottom: 10px;
  .list-item{
    border:1px solid #eaeaea;
    padding:10px 16px;
    .list-head{
      @include center-items(50px,50px);
    }
    .list-info{
      flex: 1 1 60px;
      padding-left: 10px;
    }
  }
}
</style>
