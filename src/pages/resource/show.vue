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
                <collectCo :watchOptions="{oid: resourceId, type: 4}"></collectCo>
                <shareOut :tPosition="tPosition"></shareOut>
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
        <div class="content-wrapper" v-if="likeResources && likeResources.length">
          <div class="content-title">
            <span>您可能感兴趣的资源</span>
          </div>
          <div class="content content-nf">
            <baseResource v-for="item in likeResources" :key="item.index" :itemSingle="item"></baseResource>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper">
          <div class="right-split">
            <beyondTo v-if="owner.id" :ownerId="owner.id" :ownerType="owner.type"></beyondTo>
          </div>
          <div class="right-split" v-if="reslinkmans.length">
            <div class="content-title">
              <span>联系人</span>
            </div>
            <div class="content">
              <a v-for="item in reslinkmans" :key="item.index" class="list-item">
                <div class="list-head" style="border-radius: 50%" :style="{backgroundImage: 'url(' + item.uimg + ')'}"></div>
                <div class="list-info">
                  <div class="list-owner">{{item.professor.name}}</div>
                  <div class="list-desc">{{item.professor.title || item.professor.office}}</div>
                </div>
                <div class="list-link">
                  <contactChat :contactOptions="{oid: item.professorId }"></contactChat>
                </div>
              </a>
            </div>
          </div>
          <div class="right-split" v-if="hotResources && hotResources.length">
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
  import { urlParse, ImageUrl, defaultSet, strToArr } from '@/libs/util';

  import previewMagnify from '@/components/previewMagnify';
  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';
  import beyondTo from '@/components/BeyondTo';
  import contactChat from '@/components/ContactChat';

  import baseResource from '@/components/subTemplate/BaseResource';

  export default {
    data() {
      return {
        resourceInfo: '',
        resourceId: '',
        tPosition: 'top-start',
        owner: {
          id: '',
          type: ''
        },
        hotResources: '',
        likeResources: '',
        reslinkmans: []
      };
    },
    created() {
      this.resourceId = urlParse('id');
      this.getResourceInfo();
      this.getLikeResources();
      this.getLinkmans();
    },
    components: {
      previewMagnify,
      shareOut,
      collectCo,
      beyondTo,
      contactChat,
      baseResource
    },
    methods: {
      getResourceInfo() {
        var that = this
        this.$axios.getk('/ajax/resource/queryOne', {
          resourceId: that.resourceId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.subject) {
              $info.subject = strToArr($info.subject);
            }
            var ImgUrl = []
            if ($info.images && $info.images.length) {
              for (let i = 0; i < $info.images.length; ++i) {
                ImgUrl.push(ImageUrl('resource/' + $info.images[i].imageSrc))
              }
            } else {
              ImgUrl.push(defaultSet.img.resource)
            }
            $info.img = ImgUrl
            if ($info.resourceType === '1') {
              that.owner = {
                id: $info.professorId,
                type: $info.resourceType
              };
              that.getHotResources({ 'professorId': $info.professorId })
            } else if ($info.resourceType === '2') {
              that.owner = {
                id: $info.orgId,
                type: $info.resourceType
              };
              that.getHotResources({ 'orgId': $info.orgId }, true)
            }
            document.title = $info.resourceName + '-' + PLAT.info.title
            that.resourceInfo = $info;
          };
        });
      },
      getHotResources(obj, num) {
        var that = this
        var ourl = num ? '/ajax/resource/qaOrgPublish' : '/ajax/resource/qaProPublish'
        that.$axios.getk(ourl, obj, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            var hotRes = []
            if ($data.length > 1) {
              for (var i = 0; i < $data.length; i++) {
                if ($data[i].images && $data[i].images.length) {
                  $data[i].img = ImageUrl('resource/' + $data[i].images[0].imageSrc)
                } else {
                  $data[i].img = defaultSet.img.resource
                }
                if (that.resourceId !== $data[i].resourceId) {
                  hotRes.push($data[i])
                }
              }
            }
            hotRes.splice(5)
            that.hotResources = hotRes
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
      },
      getLinkmans() {
        var that = this
        this.$axios.getk('/ajax/resource/qaLinkman',{
          resourceId: that.resourceId
        }, function(data) {
          if (data.success) {
            var $data = data.data;
            if ($data.length > 0) {
              for (var i = 0; i < $data.length; i++) {
                if ($data[i].professor.hasHeadImage) {
                  $data[i].uimg = ImageUrl(('head/' + $data[i].professorId + '_l.jpg'), true)
                } else {
                  $data[i].uimg = defaultSet.img.expert
                }
              }
              that.reslinkmans = $data
            }
          }
        })
      }
    }
  };
</script>
