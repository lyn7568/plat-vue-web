<template>
  <div class="header">
    <div class="top-wrapper">
      <div class="contain-wrapper">
        <div class="wrapper-left">
          <a :href="plat.website" class="a-link">{{plat.name}}</a>
          <span> X </span>
          <a href="http://www.ekexiu.com" class="a-link">科袖网</a>
          <span>联合为您服务</span>
        </div>
        <div class="wrapper-right">
          <a href="https://www.ekexiu.com/cmp-portal/cmp-settled-log.html" class="a-link">进入企业版</a>
        </div>
      </div>
    </div>
    <div class="banner-wrapper" :style="{backgroundImage: 'url(' + plat.bannerurl + ')'}">
    </div>
    <div class="nav-wrapper">
      <div class="contain-wrapper">
        <ul>
          <router-link to="home" active-class="active" tag="li">首页</router-link>
          <router-link to="platTrends" active-class="active" tag="li">平台动态</router-link>
          <router-link to="findServe" active-class="active" tag="li">找服务</router-link>
          <router-link to='findResource' active-class="active" tag="li">找资源</router-link>
          <router-link to='expertPool' active-class="active" tag="li">专家顾问</router-link>
          <router-link to='cooperationAgency' active-class="active" tag="li">合作机构</router-link>
          <router-link to='aboutUs' active-class="active" tag="li">关于我们</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      plat: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';

  .header
    .top-wrapper
      width: 100%
      height: 30px
      line-height: 30px
      bg-grey-color()
      .contain-wrapper
        display: flex
        flex-wrap: wrap
        font-size:14px
        .wrapper-right
          margin-left:15px
    .banner-wrapper
      width:100%
      height:200px
      min-width:1100px
      background-size:cover
      background-position:center
    .nav-wrapper
      bg-blue-color()
      ul
        display: flex
        li
          display: inline-block
          padding:0 25px
          height:40px
          line-height:40px
          text-align: center
          cursor: pointer
        .active
          bg-blue-active-color()

</style>
