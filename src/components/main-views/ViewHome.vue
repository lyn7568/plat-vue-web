<template>
  <div class="home-main">
    <!-- <backTop :scrollmyself="true"></backTop> -->

    <div class="block-wrapper">
      <div class="wrapper-left">
        <img :src="plat.platimgurl" width="800" height="280">
      </div>
      <div class="wrapper-right content-wrapper">
        <h3 class="info-main">
          有研发问题？<br>
          需要投融资？<br>
          想要招聘人才？
        </h3>
        <p class="info-tip">
          将您的需求发布到科袖网，<br>
          我们为您对接专家和各类专业机构。
        </p>
        <el-button type="primary" style="margin-top:30px">免费发布需求</el-button>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="wrapper-left">
        <div class="content-wrapper plat-news">
          <div class="content-title">
            <span>平台新闻</span>
            <router-link class="content-more" to="">更多</router-link>
          </div>
          <div class="content">
            <div class="pictures"></div>
            <ul class="maincon">
              <li v-for="item in [0,1,2,3]" :key="item">
                <span class="topic">文章标题文章标题文章标题文章标题文章标题文章标题文章标...</span>
                <span class="time">04/17</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-wrapper plat-news">
          <div class="content-title">
            <span>企业动态</span>
            <router-link class="content-more" to="">更多</router-link>
          </div>
          <div class="content">
            <ul class="maincon maincon2">
              <li v-for="item in [0,1,2,3]" :key="item">
                <span class="topic">文章标题文章标题文章标题文章标题文章标题文章标题文章标...</span>
                <span class="owner">北京科技大学北京科技大学</span>
                <span class="time">04/17</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrapper-right content-wrapper about-us">
        <div class="content-title">
          <span>关于我们</span>
          <router-link class="content-more" to="">更多</router-link>
        </div>
        <div class="content">
          介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容。
介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容。
介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容。
        </div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>最新入驻企业</span>
        </div>
        <div class="swiper-container" ref="latestCmp">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in 20" :key="item">
              <div class="item-block">
                <div class="item-pic">
                  <img src="">
                </div>
                <div class="item-text item-left">北京科袖科技有限公司北京科袖科技有限公司</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
          <div class="content-search">
            <span>找服务</span>
            <div class="search-wrapper">
              <el-input placeholder="输入关键词"></el-input>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
          </div>
          <div class="content-more">
            <router-link class="item-more" v-for="item in 4" :key="item" to="">咨询服务</router-link>
            <router-link class="item-more" to="">更多</router-link>
          </div>
        </div>
        <div class="swiper-container" ref="findService">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in 20" :key="item">
              <div class="item-block">
                <div class="item-pic" :style="{backgroundImage: 'url(' + item.imgs + ')'}"></div>
                <div class="item-text">
                  <p class="title">北京科袖科技有限公司北京科袖科技有限公司</p>
                  <p class="desc">北京科袖科技有限公司北京科袖科技有限公司有限公司有限公司</p>
                  <p class="owner">北京科袖科技有限公司北京科袖科技有限公司有限公司有限公司</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev el-icon-arrow-left" ref="prevService"></div>
          <div class="swiper-button-next el-icon-arrow-right" ref="nextService"></div>
        </div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
          <div class="content-search">
            <span>找资源</span>
            <div class="search-wrapper">
              <el-input placeholder="输入关键词"></el-input>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
          </div>
          <div class="content-more">
            <router-link class="item-more" v-for="item in 4" :key="item" to="">咨询服务</router-link>
            <router-link class="item-more" to="">更多</router-link>
          </div>
        </div>
        <div class="swiper-container" ref="findResource">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in 20" :key="item">
              <div class="item-block">
                <div class="item-pic" :style="{backgroundImage: 'url(' + item.imgs + ')'}"></div>
                <div class="item-text">
                  <p class="title">北京科袖科技有限公司北京科袖科技有限公司</p>
                  <p class="desc">北京科袖科技有限公司北京科袖科技有限公司有限公司有限公司</p>
                  <p class="owner">北京科袖科技有限公司北京科袖科技有限公司有限公司有限公司</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev el-icon-arrow-left" ref="prevResource"></div>
          <div class="swiper-button-next el-icon-arrow-right" ref="nextResource"></div>
        </div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>专家顾问</span>
            <router-link class="content-more" to="">查看全部</router-link>
        </div>
        <div class="block-container">
          <baseExpert v-for="item in 6" :key="item"></baseExpert>
        </div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>合作机构</span>
            <router-link class="content-more" to="">查看全部</router-link>
        </div>
        <baseAgency :num="3"></baseAgency>
      </div>
    </div>
    <!-- <Loading></Loading> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import baseAgency from '../sub-component/BaseAgency';
  import baseExpert from '../sub-component/BaseExpert';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        platId: '',
        rows: 20
      };
    },
    created() {
       this.platId = Cookies.get('platId');
       this.queryOrg(this.platId);
    },
    mounted() {
      this.latestCmpSwiper = new Swiper(this.$refs.latestCmp, {
        slidesPerView: 5.5,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          disableOnInteraction: false
        }
      });

      this.findServiceSwiper = new Swiper(this.$refs.findService, {
        slidesPerView: 4.8,
        spaceBetween: 20,
        navigation: {
          nextEl: this.$refs.nextService,
          prevEl: this.$refs.prevService
        }
      });

      this.findResourceSwiper = new Swiper(this.$refs.findResource, {
        slidesPerView: 4.8,
        spaceBetween: 20,
        navigation: {
          nextEl: this.$refs.nextResource,
          prevEl: this.$refs.prevResource
        }
      });
    },
    methods: {
      queryOrg(id) {
        this.$axios.get(httpUrl.homequery.residentOrgs, {
          params: {
            pid: id,
            rows: this.rows
          }
        }).then((res) => {
          console.log(res);
        });
      }
    },
    components: {
      baseAgency,
      baseExpert
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .home-main
    .block-wrapper
      display: flex
      justify-content: space-between
      color:$commonFont
      .wrapper-left
        padding: 0
        display: flex
        flex-direction: column
        justify-content: space-between
      .wrapper-right
        width: 280px
        height: 280px
        .info-main
          font-size: 24px
          line-height: 34px
          color:$mainFont
        .info-tip
          margin-top:12px
          font-size: 14px
          line-height: 22px
          color:$secondaryFont
      .plat-news
        width:800px
        height:200px
        .content
          display: flex
          .pictures
            center-items()
          .maincon
            flex:1 0 180px
            padding-left:15px
            height:120px
            overflow:hidden
            li
              display: flex
              justify-content: space-between
              .topic
                display:inline-block
                width:400px
                text-ellipsis()
              .time
                color:$secondaryFont
            &.maincon2
              width:100%
              .owner
                display:inline-block
                width:180px
                text-ellipsis()
      .about-us
        width:280px
        height:420px
        .content
          text-ellipsis(12,28px)
      .full-wrapper
        width:100%
        .swiper-container:hover
          .swiper-button-next,
          .swiper-button-prev
            display:block
        .swiper-button-next,
        .swiper-button-prev
          top: 0
          width: 50px
          height: 100%
          margin-top:0
          outline:none
          color:$mainColor
          font-size:40px
          line-height:240px
          text-align:center
          display:none
        .swiper-button-prev,
        .swiper-container-rtl .swiper-button-next
          background:linear-gradient(to right,rgba(178, 178, 178,.4) 0,rgba(0,0,0,0.0001) 100%)
          left:0
        .swiper-button-next,
        .swiper-container-rtl .swiper-button-prev
          background:linear-gradient(to left,rgba(178, 178, 178,.4) 0,rgba(0,0,0,0.0001) 100%)
          right:0
        .content-title
          .content-search
            display:flex
            align-items:center
            .search-wrapper
              display:flex
              margin-left:15px
              .el-input__inner
                line-height:32px
                height:32px
                border-top-right-radius:0
                border-bottom-right-radius:0
              .el-button
                padding:8px 10px
                border-top-left-radius:0
                border-bottom-left-radius:0
          .content-more
          .item-more
            display:inline-block
            padding-left:20px
            color:$secondaryFont
        .item-block
          width:182px
          overflow:hidden
          .item-pic
            center-items()
          .item-text
            margin-top:6px
            line-height:30px
            &.item-left
              text-ellipsis()
            .item-tit
              text-align:center
              display:flex
              align-items:center
              span
                display: inline-block
                max-width: 86%
                text-ellipsis()
            .title
              text-ellipsis()
            .desc
              margin-top:3px
              text-ellipsis(2,20px)
            .owner
              margin-top:10px
              text-ellipsis()
</style>
