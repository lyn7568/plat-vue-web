<template>
  <div class="browse-main">
		<div class="block-wrapper">
      <div class="content-wrapper">
        <div class="headcon-box">
          <div class="show-head headimg-box"></div>
          <div class="show-info reInfo-box">
            <div class="info-tit">name<em class="authicon"></em></div>
            <div class="info-tag">offt</div>
            <div class="operateBlock bottomShow">
              <ul class="clearfix">
                <li><span>shanghai</span></li>
                <li>
                  <!-- <share-out></share-out> -->
                </li>
              </ul>
            </div>
          </div>
          <el-row>
            <el-button type="primary" icon="el-icon-plus">关注</el-button>
            <el-button type="primary">联系</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="wrapper-left">
        <div class="content-wrapper plat-news">
          <div class="content-title" style="display: block;">
            <router-link class="content-more" to="/platTrends?flag=first">更多</router-link>
          </div>
        </div>
        <div class="content-wrapper full-wrapper" style="margin-top:20px">
          <div class="content-title">
              <span>最新入驻企业</span>
              <router-link class="content-more" to="/regAgency">更多</router-link>
          </div>
        </div>
      </div>
      <div class="wrapper-right content-wrapper about-us">
        <div class="content-title">
          <span>关于我们</span>
          <router-link class="content-more" to="/about">更多</router-link>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import '@/common/stylus/listitem.styl';
  import '@/common/stylus/browse.styl';
  import ShareOut from '../components/ShareOut';
  export default {
    props: {
      expertId: {
        type: String
      }
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    watch: {
     '$route' (to, from) {
        if (this.$route.query.flag) {
          this.activeName = this.$route.query.flag; // 监听flag变化
        }
      }
    },
    components: {
      ShareOut
    }
  };
</script>
