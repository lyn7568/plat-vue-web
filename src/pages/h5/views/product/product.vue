<template>
  <div class="browse-main">
    <div class="block-wrapper">
        <div style="width:100%" class="left-main">
            <div class="content-wrapper" style="padding:0">
                <div class="content-wrapper" style="padding:0">
                    <previewMagnify v-if="productInfo.img && productInfo.img.length" :previewImg="productInfo.img"></previewMagnify>
                  </div>
                  <div class="content-wrapper">
                      <div class="show-info">
                          <div class="info-tit info-tit-big" style="font-size: 20px; line-height:30px; margin-bottom: 4px;">{{productInfo.name}}</div>
                          <div class="info-tag">简介：{{productInfo.cnt}}</div>
                        </div>
                  </div>
            </div>
            <div class="content-wrapper">
                <beyondTo v-if="companyId" :ownerId="companyId" :ownerType="'00'" :styFlag="true"></beyondTo>
            </div>
        <div class="content-wrapper">
          
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
        <div class="content-wrapper" v-if="otherProducts && otherProducts.length">
          <div class="inner-wrapper">
            <div class="content-title">
              <span>其他产品</span>
            </div>
            <div class="content">
              <BaseProduct v-for="item in otherProducts" :key="item.index" :itemSingle="item" :noBlank="true"></BaseProduct>
            </div>
          </div>
         </div> 
      </div>
    </div>
    
  </div>
</template>

<script>
  import { urlParse, strToArr, defaultSet } from '@/libs/util';

  import previewMagnify from '../components/swiperImg';
  import beyondTo from '@/components/BeyondTo';
  import BaseProduct from '@/components/subTemplate/BaseProduct';

  export default {
    data() {
      return {
        productInfo: '',
        companyId: '',
        keywords: '',
        tPosition: 'top-start',
        otherProducts: ''
      };
    },
    created() {
      this.productId = urlParse('id');
      this.getproductInfo();
      this.getProductKeyword();
    },
    components: {
      previewMagnify,
      beyondTo,
      BaseProduct
    },
    methods: {
      getproductInfo() {
        this.$axios.get('/ajax/product/qo', {
          id: this.productId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.img) {
              $info.img = strToArr($info.img);
            }
            document.title = $info.name + '-' + PLAT.info.title
            this.companyId = $info.companyId;
            this.productInfo = $info;
            this.getOtherProducts($info.companyId);
          };
        });
      },
      getProductKeyword() {
        var that = this
        that.$axios.get('/ajax/product/qo/keyword', {
          id: that.productId
        }, function (res) {
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
      },
      getOtherProducts(id) {
        var that = this
        that.$axios.get('/ajax/product/pq', {
          companyId: id,
          pageSize: 6,
          pageNo: 1
        }, function (res) {
          if (res.success && res.data) {
            const obj = res.data.data
            if (obj.length > 0) {
              var arr = []
              for (let i = 0; i < obj.length; ++i) {
                if (obj[i].id !== that.productId) {
                  if (obj[i].img) {
                    obj[i].img = strToArr(obj[i].img)[0]
                  } else {
                    obj[i].img = defaultSet.img.product
                  }
                  arr.push(obj[i])
                }
              }
            }
            if (arr.length > 5) {
              arr.splice(5)
            }
            that.otherProducts = arr
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