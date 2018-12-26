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
              <div class="info-tit info-tit-big">{{resourceInfo.name}}</div>
              <div class="info-tag">服务内容：{{resourceInfo.cnt}}</div>
              <div class="info-operate zoom-operate">
                <collectCo></collectCo>
                <shareOut :tUrl="elurl" :tPosition="tPosition"></shareOut>
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">
            <el-row :gutter="10" class="rel-detail">
              <el-col class="rel-item" :span="24" v-if="resourceInfo.cooperation">
                <div class="rel-tit">合作备注：</div>
                <div v-html="resourceInfo.cooperation"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.descp">
                <div class="rel-tit">详细介绍：</div>
                <div v-html="resourceInfo.descp"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="resourceInfo.keywords && resourceInfo.keywords.length">
                <el-row class="tag-item">
                  <el-tag v-for="sub in resourceInfo.keywords" :key="sub.index">{{sub}}</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="content-wrapper" v-if="likeResources">
          <div class="content-title">
            <span>您可能感兴趣的服务</span>
          </div>
          <div class="content">
            <baseService v-for="item in likeResources" :key="item.index" :itemSingle="item"></baseService>
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
              <span>热门服务</span>
            </div>
            <div class="content">
              <a v-for="item in hotResources" :key="item.index" class="list-item" :href="'serve.html?id='+item.id" target="_blank">
                <div class="list-head" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div class="list-info">
                  <div class="list-descp">{{item.name}}</div>
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

  import baseService from '@/components/subTemplate/BaseService';

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
      baseService
    },
    methods: {
      getResourceInfo() {
        this.$axios.getk('/ajax/ware/qo', {
          id: this.resourceId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.keywords) {
              $info.keywords = util.strToArr($info.keywords);
            }
            if ($info.category === '1') {
              this.owner = {
                id: $info.owner,
                type: $info.category
              };
              this.getHotResources($info.category, $info.owner)
            }
            this.resourceInfo = $info;
          };
        });
      },
      getHotResources(catagory, owner) {
        var that = this
        that.$axios.getk('/ajax/ware/byOwnerWithPageViews', {
          id: that.resourceId,
          category: catagory,
          owner: owner,
          rows: 5
        }, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            if ($data.length > 1) {
              var oLeng = $data.length < 5 ? $data.length : 5
              for (var i = 0; i < oLeng; i++) {
                if ($data[i].images) {
                  $data[i].img = util.ImageUrl('ware/' + util.strToArr($data[i].images))
                } else {
                  $data[i].img = util.defaultSet.img.serve
                }
              }
            }
            that.hotResources = $data
          }
        })
      },
      getLikeResources() {
        var that = this
        that.$axios.getk('/ajax/ware/ralateWare', {
          id: that.resourceId,
          rows: 5
        }, function(res) {
          if (res.success && res.data) {
            const $data = res.data
            var arr = [];
            for (var i = 0; i < $data.length; i++) {
              arr.push($data[i].id)
            }
            that.$axios.getk('/ajax/ware/qm', {
              id: arr
            }, function(data) {
              that.likeResources = data.data
            })
          }
        })
      }
    }
  };
</script>
