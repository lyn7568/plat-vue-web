<template>
  <div class="home-main">
    <el-dialog title="发布需求" :visible.sync="dialogFormVisible" width="700px">
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pubDemand">立即发布</el-button><br/>
        <el-checkbox checked disabled>我已阅读并同意<a :href="kexiuLink + '/privacy.html'">《科袖用户协议》</a></el-checkbox>
      </div> -->
    </el-dialog>

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
        <el-button type="primary" @click="dialogFormVisible = true" style="margin-top:30px">免费发布需求</el-button>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="wrapper-left">
        <div class="content-wrapper plat-news">
          <div class="content-title">
            <span>平台新闻</span>
            <router-link class="content-more" to="/platTrends?flag=first">更多</router-link>
          </div>
          <div class="content">
            <div class="pictures" v-if="paltNews.length" :style="{backgroundImage: 'url(' + articleUrl(paltNews[0]) + ')'}"></div>
            <ul class="maincon">
              <li v-for="item in paltNews" :key="item.index">
                <a :href="linkArticle(item)" target="_blank">
                  <span class="topic">{{item.articleTitle}}</span>
                  <span class="time">{{formTime(item)}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-wrapper plat-news">
          <div class="content-title">
            <span>企业动态</span>
            <router-link class="content-more" to="/platTrends?flag=second">更多</router-link>
          </div>
          <div class="content">
            <ul class="maincon maincon2">
              <li v-for="item in orgTrends" :key="item.index">
                <a :href="linkArticle(item)" target="_blank">
                  <span class="topic">{{item.articleTitle}}</span>
                  <span class="owner">{{item.ownerName}}</span>
                  <span class="time">{{formTime(item)}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrapper-right content-wrapper about-us">
        <div class="content-title">
          <span>关于我们</span>
          <router-link class="content-more" to="/aboutUs">更多</router-link>
        </div>
        <div class="content">{{aboutUs}}</div>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>最新入驻企业</span>
        </div>
        <div class="swiper-container" ref="latestCmp">
          <div class="swiper-wrapper">
            <a class="swiper-slide" v-for="item in residentOrgs" :key="item.index" :href="linkOrg(item)" target="_blank">
              <div class="item-block">
                <div class="item-pic">
                  <img :src="orgsUrl(item)">
                </div>
                <div class="item-text item-left">{{item.name}}</div>
              </div>
            </a>
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
              <el-input placeholder="输入关键词" v-model="inputSer"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchSer">搜索</el-button>
            </div>
          </div>
          <div class="content-more">
            <!-- <router-link class="item-more" v-for="item in 4" :key="item" to="">咨询服务</router-link> -->
            <router-link class="item-more" to="/findServe">更多</router-link>
          </div>
        </div>
        <div class="swiper-container" ref="findService">
          <div class="swiper-wrapper">
            <a class="swiper-slide" v-for="item in platWares" :key="item.index" :href="linkWare(item)" target="_blank">
              <div class="item-block">
                <div class="item-pic" :style="{backgroundImage: 'url(' + waresUrl(item) + ')'}"></div>
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
            <router-link class="item-more" to="/findResource">更多</router-link>
          </div>
        </div>
        <div class="swiper-container" ref="findResource">
          <div class="swiper-wrapper">
            <a class="swiper-slide" v-for="item in platResources" :key="item.index" :href="linkResource(item)" target="_blank">
              <div class="item-block" >
                <div class="item-pic" :style="{backgroundImage: 'url(' + resourcesUrl(item) + ')'}"></div>
                <div class="item-text">
                  <p class="title">{{item.name}}</p>
                  <p class="desc">{{item.cnt}}</p>
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
            <span>专家顾问</span>
            <router-link class="content-more" to="/expertPool">查看全部</router-link>
        </div>
        <baseExpert :num="6"></baseExpert>
      </div>
    </div>

    <div class="block-wrapper">
      <div class="content-wrapper full-wrapper">
        <div class="content-title">
            <span>合作机构</span>
            <router-link class="content-more" to="/cooperationAgency">查看全部</router-link>
        </div>
        <baseAgency :num="3"></baseAgency>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import baseAgency from '../sub-component/BaseAgency';
  import baseExpert from '../sub-component/BaseExpert';
  import demandIssue from '../form-views/DemandIssue';
  import demandIssueLogin from '../form-views/DemandIssueLogin';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        activeName: 'first',
        platId: '',
        rows: 20,
        orgTrends: '',
        paltNews: '',
        residentOrgs: '',
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
       this.platId = Cookies.get('platId');
       this.getAboutUs(this.platId);
       this.queryPaltNews(this.platId);
       this.queryOrgTrends(this.platId);
       this.queryResidentOrgs(this.platId);
       this.queryPlatResources(this.platId);
       this.queryPlatWares(this.platId);
    },
    mounted() {
      this.latestCmpSwiper = new Swiper(this.$refs.latestCmp, {
        slidesPerView: 5.5,
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
        spaceBetween: 20,
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
      // pubDemand() {
      //   this.$refs.issueDemand.submitForm('ruleForm');
      // },
      queryPaltNews(id) {
        this.$axios.get(httpUrl.hQuery.platNews.nopq, {
          params: {
            ownerId: id,
            articleType: '3',
            status: 1,
            rows: 5
          }
        }).then((res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            this.paltNews = $info;
          };
        });
      },
      queryOrgTrends(id) {
        this.$axios.get(httpUrl.hQuery.orgTrends.nopq, {
          params: {
            pid: id,
            rows: 5
          }
        }).then((res) => {
          if (res.success) {
            var _this = this;
            var $info = res.data;
            console.log(res);
            for (let i = 0; i < $info.length; i++) {
              (function(m) {
                _this.ownerByond($info[m], true);
              }(i));
            };
            this.orgTrends = $info;
          };
        });
      },
      queryResidentOrgs(id) {
        this.$axios.get(httpUrl.hQuery.residentOrgs.nopq, {
          params: {
            pid: id,
            rows: this.rows
          }
        }).then((res) => {
          if (res.success) {
            var $info = res.data;
            this.residentOrgs = $info;
          };
        });
      },
      queryPlatResources(id) {
        this.$axios.get(httpUrl.hQuery.queryResource, {
          params: {
            pid: id,
            rows: this.rows
          }
        }).then((res) => {
          var _this = this;
          console.log(res);
          if (res.success) {
            var $info = res.data;
            for (let i = 0; i < $info.length; i++) {
              (function(m) {
                _this.ownerByond($info[m]);
              }(i));
            };
            this.platResources = $info;
          };
        });
      },
      queryPlatWares(id) {
        this.$axios.get(httpUrl.hQuery.queryWare, {
          params: {
            pid: id,
            rows: this.rows
          }
        }).then((res) => {
          var _this = this;
          console.log(res);
          if (res.success) {
            var $info = res.data;
            for (let i = 0; i < $info.length; i++) {
              (function(m) {
                _this.ownerByond($info[m]);
              }(i));
            };
            this.platWares = $info;
          };
        });
      },
      resourcesUrl(item) {
        return item.images ? util.ImageUrl('resource/' + item.images.split(',')[0]) : util.defaultSet.img.resource;
      },
      articleUrl(item) {
        return item.articleImg ? util.ImageUrl('article/' + item.articleImg) : util.defaultSet.img.article;
      },
      waresUrl(item) {
        return item.images ? util.ImageUrl('ware' + item.images.split(',')[0]) : util.defaultSet.img.service;
      },
      orgsUrl(item) {
        return item.hasOrgLogo ? util.ImageUrl(('org/' + item.id + '.jpg'), true) : util.defaultSet.img.org;
      },
      linkResource(item) {
        return util.defaultSet.link.resource + item.id;
      },
      linkWare(item) {
        return util.defaultSet.link.service + item.id;
      },
      linkOrg(item) {
        return util.defaultSet.link.org + item.id;
      },
      linkArticle(item) {
        return util.pageUrl('a', item);
      },
      getAboutUs(id) {
        this.$axios.get(httpUrl.hQuery.baseInfo.query, {
          params: {
            id: id
          }
        }).then((res) => {
          console.log(res);
          this.aboutUs = res.data.descp;
        });
      },
      formTime(item) {
        return util.commenTime(item.publishTime, true);
      },
      searchRes() {
        if (this.inputRes) {
          this.$router.push({path: '/findResource', query: {key: this.inputRes}});
        } else {
          this.$message({
            message: '请填写搜索资源的关键词',
            type: 'warning'
          });
        }
      },
      searchSer() {
        if (this.inputSer) {
          this.$router.push({path: '/findServe', query: {key: this.inputSer}});
        } else {
          this.$message({
            message: '请填写搜索服务的关键词',
            type: 'warning'
          });
        }
      },
      ownerByond(item, flag) {
        var _this = this;
        var type, id;
        if (flag) {
          type = item.articleType;
          id = item.ownerId;
        } else {
          type = item.otype;
          id = item.oid;
        };
        if (type === '1') {
          _this.$axios.get(httpUrl.kxQurey.professor.query + id, {
            }).then((res) => {
            if (res.success) {
              let $info = res.data;
              item.ownerName = $info.name;
              _this.$forceUpdate();
            }
          });
        } else if (type === '2') {
          _this.$axios.get(httpUrl.kxQurey.org.query + id, {
            }).then((res) => {
            if (res.success) {
              let $info = res.data;
              item.ownerName = $info.forShort ? $info.forShort : $info.name;
              _this.$forceUpdate();
            }
          });
        }
      }
    },
    components: {
      baseAgency,
      baseExpert,
      demandIssue,
      demandIssueLogin
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
            li>a
              display: flex
              justify-content: space-between
              line-height:30px
              .topic
                display:inline-block
                width:400px
                text-ellipsis()
              .time
                color:$secondaryFont
            &.maincon2
              width:100%
              padding:0
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
              text-align:center
              text-ellipsis()
            .title
              text-ellipsis()
            .desc
              margin-top:3px
              text-ellipsis(2,20px)
            .owner
              margin-top:10px
              text-ellipsis()

    .tip-show
      background:$mainColor
      text-align:center
      justify-content: space-between
      margin:-30px -20px 10px
      padding:20px
      color:#fff
      .tip-h1
        font-size:16px
        line-height:40px
      .tip-h2
        font-size:12px
        line-height:30px
    .tab-show
      margin:20px -20px 0
      .el-tabs__nav
        width:99.6%
        text-align: center
        .el-tabs__item
          font-size:16px
          width:50%
    .el-dialog
      overflow:hidden
      .el-dialog__footer
        text-align:center
        margin-top:-30px
        margin-bottom:20px
        .el-button
          width:200px
          margin-bottom:10px
        a
          color:$mainColor

    .login-box
      position:relative
      width:400px
      margin:auto

</style>
