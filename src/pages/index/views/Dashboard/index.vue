<template>
  <div class="home-main">
    <!-- <el-dialog title="发布需求" :visible.sync="dialogFormVisible" width="700px">
      <div class="tip-show">
        <div class="tip-h1">免费发布需求到科袖网，让企业没有难搞的研发</div>
        <div class="tip-h2">1. 发布需求  →  2. 为您对接专家或机构  →  3. 登录科袖网进行沟通  →  4. 开展合作，解决您的需求</div>
      </div>
      <el-tabs class="tab-show" v-model="activeName" type="card" >
        <el-tab-pane label="注册科袖网，发布需求" name="first">
          <demandIssue ref="issueDemand" :dialogFormVisible="dialogFormVisible" v-on:dialogChanged="getChildrenChange($event)"></demandIssue>
        </el-tab-pane>
        <el-tab-pane label="已有账户，快速发布" name="second">
          <demandIssueLogin ref="issueDemand" :dialogFormVisible="dialogFormVisible" v-on:dialogChangedLogin="getChildrenChangeLogin($event)"></demandIssueLogin>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>-->

    <div class="block-wrapper">
      <div class="wrapper-left video-wrapper">
        <!-- <div class="video-mask" @click="showVideo">
          <img src="./img/video.png" width="80">
        </div> -->
        <img :src="platimgurl" width="800" height="280">
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
        <el-button type="primary" @click="clickAlertDemand" style="margin-top:30px">发布需求</el-button>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="wrapper-left">
        <div class="content-wrapper plat-news">
          <div class="content-title" style="display: block;">
            <el-tabs v-model="activeName" @tab-click="queryPaltNews">
              <el-tab-pane v-for="cata in conCatalog" :key="cata.index" :label="cata.tit" :name="cata.val" class="content">
                <ul class="maincon">
                  <li v-for="item in paltNews" :key="item.index">
                    <a :href="'content.html?id='+item.id"  target="_blank">
                      <span class="topic">{{item.title}}</span>
                      <span class="time">{{item.modifyTime}}</span>
                    </a>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
            <router-link class="content-more" to="trends">更多</router-link>
          </div>
        </div>
        <div class="content-wrapper full-wrapper" style="margin-top:20px">
          <div class="content-title">
            <span>最新入驻企业</span>
            <router-link class="content-more" to="comp">更多</router-link>
          </div>
          <div class="swiper-container" ref="latestCmp">
            <div class="swiper-wrapper">
              <a class="swiper-slide" v-for="item in residentComps" :key="item.index" :href="'company.html?id='+item.id" target="_blank">
                <div class="item-block">
                  <div class="item-pic">
                    <img :src="item.logo">
                  </div>
                  <div class="item-text item-left">{{item.name}}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right content-wrapper about-us">
        <div class="content-title">
          <span>关于我们</span>
          <router-link class="content-more" to="about">更多</router-link>
        </div>
        <div class="content">{{aboutUs}}</div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
          <div class="content-search">
            <span>找服务</span>
            <div class="search-wrapper">
              <el-input placeholder="输入关键词" v-model="inputSer"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchSer">搜索</el-button>
            </div>
          </div>
          <div class="content-more">
            <!-- <router-link class="item-more" v-for="item in 4" :key="item" to="">咨询服务</router-link> -->
            <router-link class="item-more" to="serve">更多</router-link>
          </div>
        </div>
        <div class="swiper-container" ref="findService">
          <div class="swiper-wrapper">
            <a class="swiper-slide" v-for="item in platWares" :key="item.index" :href="'serve.html?id='+item.id" target="_blank">
              <div class="item-block">
                <div class="item-pic" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div class="item-text">
                  <p class="title">{{item.name}}</p>
                  <p class="desc">{{item.cnt}}</p>
                  <p class="owner">{{item.ownerName}}</p>
                </div>
              </div>
            </a>
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
              <el-input placeholder="输入关键词" v-model="inputRes"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchRes">搜索</el-button>
            </div>
          </div>
          <div class="content-more">
            <!-- <router-link class="item-more" v-for="item in 4" :key="item" to="">咨询服务</router-link> -->
            <router-link class="item-more" to="reso">更多</router-link>
          </div>
        </div>
        <div class="swiper-container" ref="findResource">
          <div class="swiper-wrapper">
            <a class="swiper-slide" v-for="item in platResources" :key="item.index" :href="'resource.html?id='+item.resourceId" target="_blank">
              <div class="item-block" >
                <div class="item-pic" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div class="item-text">
                  <p class="title">{{item.resourceName}}</p>
                  <p class="desc">{{item.supportedServices}}</p>
                  <p class="owner">{{item.ownerName}}</p>
                </div>
              </div>
            </a>
          </div>
          <div class="swiper-button-prev el-icon-arrow-left" ref="prevResource"></div>
          <div class="swiper-button-next el-icon-arrow-right" ref="nextResource"></div>
        </div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>特约专家</span>
            <router-link class="content-more" to="exp">查看全部</router-link>
        </div>
        <expItem :num="6"></expItem>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>合作机构</span>
            <router-link class="content-more" to="org">查看全部</router-link>
        </div>
        <orgItem :num="3"></orgItem>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { commenTime, defaultSet, ImageUrl, strToArr } from '@/libs/util';
  import queryBase from '@/libs/queryBase';

  import orgItem from '../ViewOrganization/orgItem';
  import expItem from '../ViewExpertPool/expItem';
  // import demandIssue from '../form-views/DemandIssue';
  // import demandIssueLogin from '../form-views/DemandIssueLogin';

  export default {
    data() {
      return {
        /* eslint-disable no-undef */
        platimgurl: PLAT.info.platimgurl,
        activeName: '1',
        conCatalog: [
          {
            val: '1',
            tit: '平台新闻'
          },
          {
            val: '2',
            tit: '采访专栏'
          },
          {
            val: '3',
            tit: '政策法规'
          },
          {
            val: '4',
            tit: '通知公告'
          }
        ],
        rows: 20,
        orgTrends: '',
        paltNews: '',
        residentComps: '',
        platResources: '',
        platWares: '',
        ownerInfo: '',
        aboutUs: '',
        inputSer: '',
        inputRes: '',
        dialogFormVisible: false
      };
    },
    created() {
       this.getAboutUs();
       this.queryPaltNews();
       this.queryResidentComps();
       this.queryPlatResources();
       this.queryPlatWares();
    },
    mounted() {
      sessionStorage.setItem('isSelect', '0')
      this.latestCmpSwiper = new Swiper(this.$refs.latestCmp, {
        slidesPerView: 3.6,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true
      });

      this.findServiceSwiper = new Swiper(this.$refs.findService, {
        slidesPerView: 4.8,
        loopedSlides: 20,
        loop: true,
        spaceBetween: 20,
        autoplay: {
          disableOnInteraction: false
        },
        navigation: {
          nextEl: this.$refs.nextService,
          prevEl: this.$refs.prevService
        },
        observer: true,
        observeParents: true
      });

      this.findResourceSwiper = new Swiper(this.$refs.findResource, {
        slidesPerView: 4.8,
        spaceBetween: 20,
        loopedSlides: 20,
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        navigation: {
          nextEl: this.$refs.nextResource,
          prevEl: this.$refs.prevResource
        },
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      });
    },
    methods: {
      getChildrenChange(msg) {
        this.dialogFormVisible = msg;
      },
      getChildrenChangeLogin(msg) {
        this.dialogFormVisible = msg;
      },
      clickAlertDemand() {
        this.dialogFormVisible = true;
      },
      // pubDemand() {
      //   this.$refs.issueDemand.submitForm('ruleForm');
      // },
      queryPaltNews() {
        var that = this
        this.$axios.get('/ajax/article/pq', {
          catalog: that.activeName,
          published: 1,
          pageSize: 4,
          pageNo: 1
        }, (res) => {
          if (res.success) {
            var $info = res.data.data;
            for (let i = 0; i < $info.length; ++i) {
              if ($info[i].modifyTime) {
                $info[i].modifyTime = commenTime($info[i].modifyTime, true)
              }
            }
            that.paltNews = $info;
          };
        });
      },
      queryResidentComps() {
        this.$axios.get('/ajax/company/pq', {
          pageSize: 20,
          pageNo: 1
        }, (res) => {
          if (res.success) {
            var $info = res.data.data;
            for (let i = 0; i < $info.length; ++i) {
              if (!$info[i].logo) {
                $info[i].logo = defaultSet.img.org
              }
            }
            this.residentComps = $info;
          };
        });
      },
      queryPlatResources() {
        this.$axios.getk('/ajax/resource/index/search', {
          rows: this.rows
        }, (res) => {
          var _this = this;
          if (res.success) {
            var $info = res.data;
            for (let i = 0; i < $info.length; i++) {
              if ($info[i].images.length > 0) {
                $info[i].img = ImageUrl('resource/' + $info[i].images[0].imageSrc)
              } else {
                $info[i].img = defaultSet.img.resource
              }
              (function(m) {
                _this.ownerByond($info[m]);
              }(i));
            };
            this.platResources = $info;
          };
        });
      },
      queryPlatWares() {
        this.$axios.getk('/ajax/ware/index/search', {
          rows: this.rows
        }, (res) => {
          var _this = this;
          if (res.success) {
            var $info = res.data;
            for (let i = 0; i < $info.length; i++) {
              if ($info[i].images) {
                $info[i].img = ImageUrl('ware' + strToArr($info[i].images)[0])
              } else {
                $info[i].img = defaultSet.img.service
              }
              (function(m) {
                _this.ownerByond($info[m]);
              }(i));
            };
            this.platWares = $info;
          };
        });
      },
      getAboutUs() {
        this.$axios.get('/ajax/platform/get', {
        }, (res) => {
          if (res.data) {
            if (res.data.descp) {
              this.aboutUs = res.data.descp;
            }
          }
        });
      },
      searchRes() {
        if (this.inputRes) {
          this.$router.push({name: 'reso', query: {key: this.inputRes}});
        } else {
          this.$message({
            message: '请填写搜索资源的关键词',
            type: 'warning'
          });
        }
      },
      searchSer() {
        if (this.inputSer) {
          this.$router.push({name: 'serve', query: {key: this.inputSer}});
        } else {
          this.$message({
            message: '请填写搜索服务的关键词',
            type: 'warning'
          });
        }
      },
      ownerByond(item) {
        var _this = this;
        var type, id;
        if (item.resourceType) {
          type = item.resourceType;
          id = item.professorId || item.orgId;
        }
        if (item.category) {
          type = item.category;
          id = item.owner;
        };
        if (type === '1') {
          queryBase.getProfessor(id, function(sc, value) {
            if (sc) {
              item.ownerName = value.name;
              _this.$forceUpdate();
            }
          });
        } else if (type === '2') {
          queryBase.getOrganization(id, function(sc, value) {
            if (sc) {
              item.ownerName = value.forShort ? value.forShort : value.name;
              _this.$forceUpdate();
            }
          });
        }
      }
    },
    components: {
      orgItem,
      expItem
      // demandIssue,
      // demandIssueLogin
    },
    beforeDestroy() {
      this.latestCmpSwiper.destroy()
      this.findServiceSwiper.destroy()
      this.findResourceSwiper.destroy()
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .home-main{
    .block-wrapper{
      display: flex;
      justify-content: space-between;
      color:$commonFont;
      .wrapper-left{
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .video-wrapper{
        position: relative;
        display: block;
        .video-mask{
          display: flex;
          justify-content: center;
          align-items: center;
          width:100%;
          height:100%;
          position:absolute;
          top:0;
          background:rgba(0,0,0,.3);
          cursor:pointer;
        }
      }
      .wrapper-right{
        width: 280px;
        height: 280px;
        .info-main{
          font-size: 24px;
          line-height: 34px;
          color:$mainFont;
        }
        .info-tip{
          margin-top:12px;
          font-size: 14px;
          line-height: 22px;
          color:$secondaryFont;
        }
      }
      .plat-news{
        width:800px;
        height:210px;
        .content-title{
          .el-tabs__item{
            font-size:16px;
            font-weight:bold;
          }
          .el-tabs__item.is-active{
            background:$mainColor;
            color:#ffffff;
          }
          .el-tabs--top .el-tabs__item.is-top:nth-child(2){
            padding-left:20px
          }
          .el-tabs--top .el-tabs__item.is-top:last-child{
            padding-right:20px;
          }
        }
        .content{
          display: flex;
          font-size: 15px;
          line-height: 30px;
          font-weight:normal;
          .pictures{
            @include center-items();
          }
          .maincon{
            flex:1 0 180px;
            padding-left:15px;
            height:120px;
            overflow:hidden;
            li>a{
              display: flex;
              justify-content: space-between;
              line-height:30px;
              .topic{
                display:inline-block;
                width: 560px;
                @include text-ellipsis();
              }
              .time{
                width: 100px;
                text-align: right;
                color:$secondaryFont;
              }
            }
          }
        }
      }
      .about-us{
        width:280px;
        height:470px;
        .content{
          @include text-ellipsis-n(14,28px);
        }
      }
      .full-wrapper{
        width:100%;
        .swiper-container:hover{
          .swiper-button-next,
          .swiper-button-prev{
            display:block;
          }
        }
        .swiper-button-next,
        .swiper-button-prev{
          top: 0;
          width: 50px;
          height: 100%;
          margin-top:0;
          outline:none;
          color:$mainColor;
          font-size:40px;
          line-height:240px;
          text-align:center;
          display:none;
        }
        .swiper-button-prev,
        .swiper-container-rtl .swiper-button-next{
          background:linear-gradient(to right,rgba(178, 178, 178,.4) 0,rgba(0,0,0,0.0001) 100%);
          left:0;
        }
        .swiper-button-next,
        .swiper-container-rtl .swiper-button-prev{
          background:linear-gradient(to left,rgba(178, 178, 178,.4) 0,rgba(0,0,0,0.0001) 100%);
          right:0;
        }
        .content-title{
          .content-search{
            display:flex;
            align-items:center;
            .search-wrapper{
              display:flex;
              margin-left:15px;
              .el-input__inner{
                line-height:32px;
                height:32px;
                border-top-right-radius:0;
                border-bottom-right-radius:0;
              }
              .el-button{
                padding:8px 10px;
                border-top-left-radius:0;
                border-bottom-left-radius:0;
              }
            }
          }
          .content-more
          .item-more{
            display:inline-block;
            padding-left:20px;
            color:$secondaryFont;
          }
        }
        .item-block{
          width:182px;
          overflow:hidden;
          .item-pic{
            @include center-items();
          }
          .item-text{
            margin-top:6px;
            line-height:30px;
            &.item-left{
              text-align:center;
              @include text-ellipsis();
            }
            .title{
              color:$mainFont;
              @include text-ellipsis();
            }
            .desc{
              margin-top:3px;
              color:$commonFont;
              @include text-ellipsis-n(2,20px);
              height:40px;
            }
            .owner{
              margin-top:10px;
              color:$secondaryFont;
              @include text-ellipsis();
            }
          }
        }
      }
    }

    .tip-show{
      background:$mainColor;
      text-align:center;
      justify-content: space-between;
      margin:-30px -20px 10px;
      padding:20px;
      color:#fff;
      .tip-h1{
        font-size:16px;
        line-height:40px;
      }
      .tip-h2{
        font-size:12px;
        line-height:30px;
      }
    }
    .tab-show{
      margin:20px -20px 0;
      .el-tabs__nav{
        width:99.6%;
        text-align: center;
        .el-tabs__item{
          font-size:16px;
          width:50%;
        }
      }
    }
    .el-dialog{
      overflow:hidden;
      .el-dialog__footer{
        text-align:center;
        margin-top:-30px;
        margin-bottom:20px;
        .el-button{
          width:200px;
          margin-bottom:10px;
        }
        a{
          color:$mainColor;
        }
      }
    }
    .videoShow{
      .video-box{
        width:100%;
        height:530px;
      }
      .el-dialog{
        background:rgba(0,0,0,.1);
        position:relative;
        .el-dialog__header{
          width:100%;
          position:absolute;
          box-sizing:border-box;
          z-index:8;
          .el-dialog__title{
            color:#fff;
          }
          .el-dialog__headerbtn{
            z-index:10;
            .el-dialog__headerbtn .el-dialog__close{
              color:#fff;
            }
          }
        }
        .el-dialog__body{
          padding:0;
        }
      }
    }

    .login-box{
      position:relative;
      width:400px;
      margin:auto;
    }
  }
</style>
