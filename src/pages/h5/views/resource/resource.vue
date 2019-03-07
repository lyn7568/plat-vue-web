<template>
  <div class="browse-main">
    <div class="block-wrapper">
        <div style="width:100%" class="left-main">
        <div class="content-wrapper" style="padding:0">
            <div class="content-wrapper" style="padding:0">
                <previewMagnify v-if="resourceInfo.img && resourceInfo.img.length" :previewImg="resourceInfo.img"></previewMagnify>
              </div>
              <div class="content-wrapper">
                  <div class="show-info">
                      <div class="info-tit info-tit-big" style="font-size: 20px; line-height:30px; margin-bottom: 4px;">{{resourceInfo.resourceName}}</div>
                      <div class="info-tag">应用用途：{{resourceInfo.supportedServices}}</div>
                    </div>
              </div>
        </div>
        <div class="content-wrapper">
            <beyondTo v-if="owner.id" :ownerId="owner.id" :ownerType="owner.type" :styFlag="true"></beyondTo>
        </div>
        
        <div class="content-wrapper">
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
        <div class="content-wrapper" v-if="likeResources && likeResources.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>您可能感兴趣的资源</span>
            </div>
            <div class="content content-nf">
              <baseResource v-for="item in likeResources" :key="item.index" :itemSingle="item" :noBlank="true"></baseResource>
            </div>
           </div> 
        </div>
        <div class="content-wrapper" v-if="hotResources && hotResources.length">
            <div class="inner-wrapper">
              <div class="content-title">
                <span>热门资源</span>
              </div>
              <div class="content">
                  <baseResource v-for="item in hotResources" :key="item.index" :itemSingle="item" :noBlank="true"></baseResource>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { urlParse, ImageUrl, defaultSet, strToArr } from '@/libs/util';

  import previewMagnify from '../components/swiperImg';
  import beyondTo from '@/components/BeyondTo';
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
      beyondTo,
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
        that.$axios.getk(ourl, obj, function (res) {
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
        }, function (res) {
          if (res.success && res.data) {
            const $data = res.data
            that.likeResources = $data
          }
        })
      },
      getLinkmans() {
        var that = this
        this.$axios.getk('/ajax/resource/qaLinkman', {
          resourceId: that.resourceId
        }, function (data) {
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
<style lang="scss" rel="stylesheet/scss">
  @import '../../style/index';
  .browse-main .block-wrapper .content-wrapper{
    padding: 8px 20px;
  }
</style>