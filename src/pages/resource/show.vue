<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper split-other">
          <div class="headcon-box hdetail-box">
            <div class="zoom-box">
              <previewMagnify v-if="resourceInfo.img && resourceInfo.img.length" :previewImg="resourceInfo.img"></previewMagnify>
            </div>
            <div class="show-info reInfo-box">
              <div class="info-tit info-tit-big">{{resourceInfo.resourceName}}</div>
              <div class="info-tag">应用用途：{{resourceInfo.supportedServices}}</div>
              <div class="info-operate zoom-operate">
                <!-- <div class="addr">浏览量 10</div> -->
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
        <div class="content-wrapper" v-if="likeResources">
          <div class="content-title">
            <span>您可能感兴趣的资源</span>
          </div>
          <div class="content">
            <baseResource v-for="item in likeResources" :key="item.index" :itemSingle="item"></baseResource>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper">
          <div class="right-split">
            <beyondTo :ownerId="owner.id" :ownerType="owner.type"></beyondTo>
          </div>
          <div class="right-split" v-if="hotResources">
            <div class="content-title">
              <span>热门资源</span>
            </div>
            <div class="content">
              <a v-for="item in hotResources" :key="item.index" class="list-item" :href="'resource.html?id='+item.resourceId" target="_blank">
                <div class="list-head" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div class="list-info">
                  <div class="list-descp">{{item.resourceName}}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import util from '@/libs/util';

  import previewMagnify from '@/components/previewMagnify';
  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';
  import beyondTo from '@/components/BeyondTo';

  import baseResource from '@/components/subTemplate/BaseResource';

  export default {
    data() {
      return {
        resourceInfo: '',
        elurl: '',
        tPosition: 'top-start',
        owner: {
          id: '',
          type: ''
        },
        hotResources: '',
        likeResources: ''
      };
    },
    created() {
      this.resourceId = util.urlParse('id');
      this.elurl = window.location.href;
      this.getResourceInfo();
      this.getLikeResources();
    },
    components: {
      previewMagnify,
      shareOut,
      collectCo,
      beyondTo,
      baseResource
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
            var ImgUrl = []
            if ($info.images && $info.images.length) {
              for (let i = 0; i < $info.images.length; ++i) {
                ImgUrl.push(util.ImageUrl('resource/' + $info.images[i].imageSrc))
              }
            } else {
              ImgUrl.push(util.defaultSet.img.resource)
            }
            $info.img = ImgUrl
            if ($info.resourceType === '1') {
              this.owner = {
                id: $info.professorId,
                type: $info.resourceType
              };
              this.getHotResources({ 'professorId': $info.professorId })
            } else if ($info.resourceType === '2') {
              this.owner = {
                id: $info.orgId,
                type: $info.resourceType
              };
              this.getHotResources({ 'orgId': $info.orgId }, true)
            }
            this.resourceInfo = $info;
          };
        });
      },
      getHotResources(obj, num) {
        var that = this
        var ourl = num ? '/ajax/resource/qaOrgPublish' : '/ajax/resource/qaProPublish'
        that.$axios.getk(ourl, obj, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            var only = false
            if ($data.length > 1) {
              var oLeng = $data.length < 5 ? $data.length : 5
              for (var i = 0; i < oLeng; i++) {
                if (that.resourceId === $data[i].resourceId) {
                  only = true;
                  continue;
                }
                if (only) {
                  if (oLeng >= 5) {
                    oLeng = 6;
                  }
                }
                if ($data[i].images.length) {
                  $data[i].img = util.ImageUrl('resource/' + $data[i].images[0].imageSrc)
                } else {
                  $data[i].img = util.defaultSet.img.resource
                }
              }
            }
            that.hotResources = $data
          }
        })
      },
      getLikeResources() {
        var that = this
        that.$axios.getk('/ajax/resource/ralateResources', {
          resourceId: that.resourceId
        }, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            that.likeResources = $data
          }
        })
      }
    }
  };
</script>
