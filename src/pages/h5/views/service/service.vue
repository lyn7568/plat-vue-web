<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div style="width:100%" class="left-main">
        <div class="content-wrapper" style="padding:0">
          <previewMagnify v-if="serveInfo.img && serveInfo.img.length" :previewImg="serveInfo.img"></previewMagnify>
        </div>
        <div class="content-wrapper">
          <div class="show-info">
            <div class="info-tit info-tit-big" style="font-size: 20px; line-height:30px; margin-bottom: 4px;">{{serveInfo.name}}</div>
            <div class="info-tag">内容：{{serveInfo.cnt}}</div>
          </div>
        </div>
        <div class="content-wrapper">
          <beyondTo v-if="ownerB.id" :ownerId="ownerB.id" :ownerType="ownerB.type" :styFlag="true"></beyondTo>
        </div>
        <div class="content-wrapper">
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
                <el-tag v-for="sub in serveInfo.keywords" :key="sub.index"><a :href="'h5.html#/search?n=3&k='+ sub">{{sub}}</a></el-tag>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="content-wrapper" v-if="likeserves && likeserves.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>您可能感兴趣的服务</span>
            </div>
            <div class="content content-nf">
              <baseService v-for="item in likeserves" :key="item.index" :itemSingle="item" :noBlank="true"></baseService>
            </div>
          </div>
        </div>
        <div class="content-wrapper" v-if="hotserves && hotserves.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>热门服务</span>
            </div>
            <div class="content content-nf">
              <baseService v-for="item in hotserves" :key="item.index" :itemSingle="item" :noBlank="true"></baseService>
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

  import baseService from '@/components/subTemplate/BaseService';

  export default {
    data() {
      return {
        serveInfo: '',
        serveId: '',
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
      this.getserveInfo();
      this.getLikeserves();
      this.getLinkmans();
    },
    components: {
      previewMagnify,
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
            var arr = []
            if ($info.images) {
              arr = strToArr($info.images)
              for (let i = 0; i < arr.length; ++i) {
                arr[i] = ImageUrl('ware' + arr[i])
              }
              $info.img = arr
            } else {
              arr[0] = defaultSet.img.service
              $info.img = arr
            }
            if ($info.category) {
              this.ownerB = {
                id: $info.owner,
                type: $info.category
              }
              this.getHotserves($info.category, $info.owner)
            }
            document.title = $info.name + '-' + PLAT.info.title
            this.serveInfo = $info
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
        }, function (res) {
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
                if (that.serveId !== $data[i].id) {
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
        }, function (res) {
          if (res.success && res.data) {
            const $data = res.data
            var arr = [];
            for (var i = 0; i < $data.length; i++) {
              arr.push($data[i].id)
            }
            if (arr.length) {
              that.$axios.getk('/ajax/ware/qm', {
                id: arr
              }, function (data) {
                that.likeserves = data.data
              })
            }
          }
        })
      },
      getLinkmans() {
        var that = this
        this.$axios.getk('/ajax/ware/pro', {
          id: that.serveId
        }, function (res) {
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
                }, function (data) {
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
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../style/index';

  .browse-main .block-wrapper .content-wrapper {
    padding: 8px 20px;
  }
</style>