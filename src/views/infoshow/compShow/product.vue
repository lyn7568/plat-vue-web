<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper split-other">
          <div class="headcon-box hdetail-box">
            <div class="zoom-box">
              <previewMagnify v-if="productInfo.img && productInfo.img.length" :previewImg="productInfo.img"></previewMagnify>
            </div>
            <div class="show-info reInfo-box">
              <div class="info-tit">{{productInfo.name}}</div>
              <div class="info-tag">简介：{{productInfo.cnt}}</div>
              <div class="info-operate zoom-operate">
                <!-- <div class="addr">浏览量 10</div> -->
                <shareOut :tUrl="elurl" :tPosition="tPosition"></shareOut>
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">
            <el-row :gutter="10" class="rel-detail">
              <el-col class="rel-item" :span="24" v-if="productInfo.spec">
                <div class="rel-tit">厂商型号：</div>
                <div>{{productInfo.spec}}</div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="productInfo.producingArea">
                <div class="rel-tit">产地：</div>
                <div>{{productInfo.producingArea}}</div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="productInfo.price">
                <div class="rel-tit">官方价格：</div>
                <div>{{productInfo.price}}</div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="productInfo.parameter">
                <div class="rel-tit">性能参数：</div>
                <div v-html="productInfo.parameter"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="productInfo.descp">
                <div class="rel-tit">详细介绍：</div>
                <div v-html="productInfo.descp"></div>
              </el-col>
              <el-col class="rel-item" :span="24" v-if="keywords && keywords.length">
                <el-row class="tag-item">
                  <el-tag v-for="sub in keywords" :key="sub.index">{{sub}}</el-tag>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="content-wrapper">
          <div class="right-split">
            <beyondTo :ownerId="productInfo.companyId"></beyondTo>
          </div>
          <div class="right-split">
            <div class="content-title">
              <span>其他产品</span>
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

  import previewMagnify from '../components/previewMagnify';
  import shareOut from '../components/ShareOut';
  import beyondTo from '../components/BeyondTo';

  export default {
    data() {
      return {
        productInfo: '',
        keywords: '',
        elurl: '',
        tPosition: 'top-start',
        platServices: []
      };
    },
    created() {
      this.productId = util.urlParse('id');
      this.elurl = window.location.href;
      this.getproductInfo();
      this.getProductKeyword();
    },
    components: {
      previewMagnify,
      shareOut,
      beyondTo
    },
    methods: {
      getproductInfo() {
        this.$axios.get('/ajax/product/qo', {
          id: this.productId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.img) {
              $info.img = util.strToArr($info.img);
            }
            this.productInfo = $info;
          };
        });
      },
      getProductKeyword() {
        var that = this
        that.$axios.get('/ajax/product/qo/keyword', {
          id: that.productId
        }, function(res) {
          if (res.success && res.data) {
            const str = res.data
            var objKey = []
            if (str.length > 0) {
              str.map(item => {
                objKey.push(item.keyword)
              })
            }
            that.keywords = objKey
          }
        })
      }
    }
  };
</script>
