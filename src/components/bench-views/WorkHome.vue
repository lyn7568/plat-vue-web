<template>
  <div class="workbench">
    <div class="content-wrapper head-wrapper block-wrapper">
      <div class="logo-show">
        <img :src="imgUrl" />
      </div>
      <div class="info-show">
        <div class="info-tit">{{platInfo.name}}</div>
        <div class="info-desc">
          <p v-show="platInfo.addr">联系地址：{{platInfo.addr}}</p>
          <p v-show="platInfo.linkphone">联系电话：{{platInfo.linkphone}}</p>
        </div>
      </div>
      <div class="btn-show">
        <el-button type="primary" @click="updateInfo">修改资料</el-button>
      </div>
    </div>
    <div class="main-wrapper block-wrapper">
      <ul>
        <li @click="conManage">
          <div class="li-content">
            <p class="li-tit">内容管理</p>
            <p class="li-tip">管理【平台新闻】和【企业动态】栏目</p>
          </div>
        </li>
        <li @click="cmpManage">
          <div class="li-content">
            <p class="li-tit">企业管理</p>
            <p class="li-tip">管理入驻平台的企业</p>
          </div>
        </li>
        <li @click="demandManage">
          <div class="li-content">
            <p class="li-tit">需求查询</p>
            <p class="li-tip">查看用户在平台发布的需求</p>
          </div>
        </li>
        <li @click="serviceManage">
          <div class="li-content">
            <p class="li-tit">对接服务</p>
            <p class="li-tip">查看我们为您对接的专家与机构</p>
          </div>
        </li>
        <li>
          <div class="li-content">
            <p class="li-tip">更多功能 敬请期待</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import util from '@/libs/util';
  import httpUrl from '@/libs/http';

  export default {
    data() {
      return {
        platInfo: '',
        imgUrl: '',
        plf_user: ''
      };
    },
    computed: {
    },
    created () {
      this.plf_user = Cookies.get('plf_user');
      this.getPlatInfo(this.plf_user);
    },
    methods: {
      getPlatInfo(id) {
        this.$axios.get(httpUrl.workbench.platBase, {
          params: {
            id: id
          }
        }).then((res) => {
          console.log(res);
          this.platInfo = res.data;
          this.imgUrl = util.orgLogoUrl(res.data.logo);
        });
      },
      updateInfo() {
        this.$router.push({path: '/updateInfo'});
      },
      conManage() {
        this.$router.push({path: '/findPwd'});
      },
      cmpManage() {
        this.$router.push({path: '/findPwd'});
      },
      demandManage() {
        this.$router.push({path: '/findPwd'});
      },
      serviceManage() {
        this.$router.push({path: '/findPwd'});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .head-wrapper
    display:flex
    align-items:center
    .logo-show
      center-items(210px,140px)
    .info-show
      flex:1 0 210px
      padding-left:15px
      .info-tit
        font-size:24px
        line-height:34px
      .info-desc
        margin-top:10px
        font-size:14px
        line-height:22px
  .main-wrapper
    ul
      display:flex
      flex-wrap:wrap
      margin-right:-10px
      margin-bottom:-10px
      li
        display:flex
        align-items:center
        text-align:center
        background:#fff
        width:360px
        height:180px
        margin-right:10px
        margin-bottom:10px
        cursor:pointer
        .li-content
          width:100%
          line-height:34px
          .li-tit
            font-size:18px
          .li-tip
            color:$secondaryFont
            font-size:14px
        &:hover
          background:$mainColor
          color:#fff
          .li-tip
            color:#fff
        &:last-child
          background:#e5e5e5
          cursor:auto
          &:hover
            background:#e5e5e5
            .li-tip
              color:$secondaryFont

</style>
