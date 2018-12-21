<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper split-other">
          <div class="headcon-box hdetail-box">
            <div class="zoom-box">
              <!-- <previewMagnify v-if="srcImg.length" :previewImg="srcImg"></previewMagnify> -->
              <previewMagnify></previewMagnify>
            </div>
            <div class="show-info reInfo-box">
              <div class="info-tit info-tit-big">{{resourceInfo.resourceName}}</div>
              <div class="info-tag">应用用途：{{resourceInfo.supportedServices}}</div>
              <div class="info-operate zoom-operate">
                <div class="addr">浏览量 10</div>
                <collectCo></collectCo>
                <shareOut :tUrl="elurl" :tPosition="tPosition"></shareOut>
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">
            <el-row :gutter="10" class="rel-detail">
              <el-col class="rel-item" :span="24" v-if="resourceInfo.orgName">
                <div class="rel-tit">所属机构：</div>
                <div>{{resourceInfo.orgName}}</div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.spec">
                <div class="rel-tit">厂商型号：</div>
                <div>{{resourceInfo.spec}}</div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.parameter">
                <div class="rel-tit">性能参数：</div>
                <div v-html="resourceInfo.parameter"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.cooperationNotes">
                <div class="rel-tit">合作备注：</div>
                <div v-html="resourceInfo.cooperationNotes"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.descp">
                <div class="rel-tit">详细介绍：</div>
                <div v-html="resourceInfo.descp"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.subject && resourceInfo.subject.length">
                <el-row class="tag-item">
                  <el-tag v-for="sub in resourceInfo.subject" :key="sub.index">{{sub}}</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content-title">
            <span>您可能感兴趣的资源</span>
          </div>
          <div class="content">
            <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper">
          <div class="right-split">
            <beyondTo :ownerId="owner.id" :ownerType="owner.type"></beyondTo>
          </div>
          <div class="right-split">
            <div class="content-title">
              <span>热门资源</span>
            </div>
            <div class="content">
              <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
            </div>
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
  import httpUrl from '@/libs/http';

  import previewMagnify from '../components/previewMagnify';
  import shareOut from '../components/ShareOut';
  import collectCo from '../components/CollectCo';
  import beyondTo from '../components/BeyondTo';

  export default {
    data() {
      return {
        resourceInfo: '',
        elurl: '',
        tPosition: 'top-start',
        platServices: [],
        srcImg: [],
        owner: {
          id: '',
          type: ''
        }
      };
    },
    created() {
      this.resourceId = util.urlParse('id');
      this.elurl = window.location.href;
      this.getResourceInfo();
    },
    components: {
      // PicZoom,
      previewMagnify,
      shareOut,
      collectCo,
      beyondTo
    },
    methods: {
      getResourceInfo() {
        this.$axios.getk('/ajax/resource/queryOne', {
          resourceId: this.resourceId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.subject) {
              $info.subject = util.strToArr($info.subject);
            }
            if ($info.images.length) {
              this.srcImg = $info.images;
            }
            this.owner = {
              id: $info.professorId,
              type: $info.resourceType
            };
            this.resourceInfo = $info;
          };
        });
      }
    }
  };
</script>
