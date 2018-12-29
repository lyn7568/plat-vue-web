<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper split-other">
          <div class="headcon-box hdetail-box">
            <div class="zoom-box">
              <previewMagnify v-if="serveInfo.img && serveInfo.img.length" :previewImg="serveInfo.img"></previewMagnify>
            </div>
            <div class="show-info reInfo-box">
              <div class="info-tit info-tit-big">{{serveInfo.name}}</div>
              <div class="info-tag">服务内容：{{serveInfo.cnt}}</div>
              <div class="info-operate zoom-operate">
                <collectCo :watchOptions="{oid: serveId, type: 3}"></collectCo>
                <shareOut :tUrl="elurl" :tPosition="tPosition"></shareOut>
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">
            <el-row :gutter="10" class="rel-detail">
              <el-col class="rel-item" :span="24" v-if="serveInfo.cooperation">
                <div class="rel-tit">合作备注：</div>
                <div v-html="serveInfo.cooperation"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="serveInfo.descp">
                <div class="rel-tit">详细介绍：</div>
                <div v-html="serveInfo.descp"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="serveInfo.keywords && serveInfo.keywords.length">
                <el-row class="tag-item">
                  <el-tag v-for="sub in serveInfo.keywords" :key="sub.index">{{sub}}</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="content-wrapper" v-if="likeserves && likeserves.length">
          <div class="content-title">
            <span>您可能感兴趣的服务</span>
          </div>
          <div class="content content-nf">
            <baseService v-for="item in likeserves" :key="item.index" :itemSingle="item"></baseService>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper">
          <div class="right-split">
            <beyondTo :ownerId="owner.id" :ownerType="owner.type"></beyondTo>
          </div>
          <div class="right-split" v-if="hotserves && hotserves.length">
            <div class="content-title">
              <span>热门服务</span>
            </div>
            <div class="content">
              <a v-for="item in hotserves" :key="item.index" class="list-item" :href="'serve.html?id='+item.id" target="_blank">
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
  import { urlParse, ImageUrl, defaultSet, strToArr } from '@/libs/util';

  import previewMagnify from '@/components/previewMagnify';
  import shareOut from '@/components/ShareOut';
  import collectCo from '@/components/CollectCo';
  import beyondTo from '@/components/BeyondTo';

  import baseService from '@/components/subTemplate/BaseService';

  export default {
    data() {
      return {
        serveInfo: '',
        serveId: '',
        elurl: '',
        tPosition: 'top-start',
        owner: {
          id: '',
          type: ''
        },
        hotserves: '',
        likeserves: ''
      };
    },
    created() {
      this.serveId = urlParse('id');
      this.elurl = window.location.href;
      this.getserveInfo();
      this.getLikeserves();
    },
    components: {
      previewMagnify,
      shareOut,
      collectCo,
      beyondTo,
      baseService
    },
    methods: {
      getserveInfo() {
        this.$axios.getk('/ajax/ware/qo', {
          id: this.serveId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.keywords) {
              $info.keywords = strToArr($info.keywords);
            }
            if ($info.category === '1') {
              this.owner = {
                id: $info.owner,
                type: $info.category
              };
              this.getHotserves($info.category, $info.owner)
            }
            this.serveInfo = $info;
          };
        });
      },
      getHotserves(catagory, owner) {
        var that = this
        that.$axios.getk('/ajax/ware/byOwnerWithPageViews', {
          id: that.serveId,
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
                  $data[i].img = ImageUrl('ware/' + strToArr($data[i].images))
                } else {
                  $data[i].img = defaultSet.img.serve
                }
              }
            }
            that.hotserves = $data
          }
        })
      },
      getLikeserves() {
        var that = this
        that.$axios.getk('/ajax/ware/ralateWare', {
          id: that.serveId,
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
              that.likeserves = data.data
            })
          }
        })
      }
    }
  };
</script>
