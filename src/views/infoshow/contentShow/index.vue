<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{contentInfo.title}}</div>
                <div class="info-operate zoom-operate">
                  <ul class="list-tag">
                    <li>{{contentInfo.modifyTime}}</li>
                    <li>作者/来源：{{contentInfo.source}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content" v-html="contentInfo.cnt"></div>
          </div>
          <div class="inner-wrapper">
            <div class="content-title">
              <span>您可能感兴趣的专利</span>
            </div>
            <div class="content">
              <!-- <baseService v-if="platServices.length" v-for="item in platServices" :key="item.index" :itemSingle="item"></baseService> -->
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="wrapper-right">
          <div class="block-wrapper" v-if="plat.adinfo.length" v-for="item in plat.adinfo" :key="item.index">
            <a class="ad-wrapper" :href="item.adUrl" target="_blank">
              <img :src="item.imgUrl" width="280" height="200">
            </a>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import '@/common/stylus/listitem.styl';
  import '@/common/stylus/browse.styl';
  import util from '@/libs/util';

  import baseService from '@/views/sub-component/BaseService';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        contentInfo: '',
        platServices: [],
        platPatents: []
      };
    },
    created() {
      this.contentId = util.urlParse('id');
      this.getContentInfo();
    },
    components: {
      baseService
    },
    methods: {
     getContentInfo() {
        this.$axios.get('/ajax/article/qo', {
          id: this.contentId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.modifyTime) {
              $info.modifyTime = util.commenTime($info.modifyTime, true)
            }
            this.contentInfo = $info;
          };
        });
      }
    }
  };
</script>
