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
            <beyondTo v-if="ownerB.id" :ownerId="ownerB.id" :ownerType="ownerB.type"></beyondTo>
          </div>
          <div class="right-split" v-if="reslinkmans.length">
            <div class="content-title">
              <span>联系人</span>
            </div>
            <div class="content">
              <a v-for="item in reslinkmans" :key="item.index" class="list-item">
                <div class="list-head" style="border-radius: 50%" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div class="list-info">
                  <div class="list-owner">{{item.name}}</div>
                  <div class="list-desc">{{item.title || item.office}}</div>
                </div>
                <div class="list-link">
                  <contactChat :contactOptions="{oid: item.id }"></contactChat>
                </div>
              </a>
            </div>
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
  import contactChat from '@/components/ContactChat';

  import baseService from '@/components/subTemplate/BaseService';

  export default {
    data() {
      return {
        serveInfo: '',
        serveId: '',
        elurl: '',
        tPosition: 'top-start',
        ownerB: {
          id: '',
          type: ''
        },
        hotserves: '',
        likeserves: '',
        reslinkmans: []
      };
    },
    created() {
      this.serveId = urlParse('id');
      this.elurl = window.location.href;
      this.getserveInfo();
      this.getLikeserves();
      this.getLinkmans();
    },
    components: {
      previewMagnify,
      shareOut,
      collectCo,
      beyondTo,
      contactChat,
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
            if ($info.images) {
              var arr = strToArr($info.images)
              for (let i = 0; i < arr.length; ++i) {
                arr[i] = ImageUrl('ware' + arr[i])
              }
              $info.img = arr
            }
            if ($info.category) {
              this.ownerB = {
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
            var hotRes = []
            if ($data.length > 1) {
              for (var i = 0; i < $data.length; i++) {
                if ($data[i].images) {
                  $data[i].img = ImageUrl('ware/' + strToArr($data[i].images)[0])
                } else {
                  $data[i].img = defaultSet.img.service
                }
                if (that.resourceId !== $data[i].resourceId) {
                  hotRes.push($data[i])
                }
              }
            }
            hotRes.splice(5)
            that.hotserves = hotRes
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
            if (arr.length) {
              that.$axios.getk('/ajax/ware/qm', {
                id: arr
              }, function(data) {
                that.likeserves = data.data
              })
            }
          }
        })
      },
      getLinkmans() {
        var that = this
        this.$axios.getk('/ajax/ware/pro',{
          id: that.serveId
        }, function(res) {
          if (res.success) {
            var $data = res.data;
            var arr = []
            if ($data.length > 0) {
              for (var i = 0; i < $data.length; i++) {
                arr.push($data[i].professor)
              }
              if (arr.length) {
                that.$axios.getk('/ajax/professor/qm', {
                  id: arr
                }, function(data) {
                  if (data.success && data.data) {
                    if (data.data.length > 0) {
                      var str = data.data
                      for (var j = 0; j < str.length; j++) {
                        if (str[j].hasHeadImage) {
                          str[j].img = ImageUrl(('head/' + str[j].id + '_l.jpg'), true)
                        } else {
                          str[j].img = defaultSet.img.expert
                        }
                      }
                      that.reslinkmans = data.data
                    }
                  }
                })
              }
            }
          }
        })
      }
    }
  };
</script>
