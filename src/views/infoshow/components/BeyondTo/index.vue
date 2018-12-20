<template>
  <div class="beyond-block">
    <div class="expert-block">
      <div class="show-head"></div>
      <div class="show-info">
        <div class="info-tit">ownerInfo.name<em class="authicon icon-pro"></em></div>
        <div class="info-tag">ownerInfo.title</div>
        <div class="info-desc">ownerInfo.offt</div>
      </div>
    </div>
    <div class="expert-block">
      <div class="show-head orgimg-box">
        <img :src="orgLogoUrl(ownerInfo)">
      </div>
      <div class="show-info">
        <div class="info-tit">ownerInfo.name<em class="authicon icon-com"></em></div>
        <div class="info-desc">ownerInfo.title</div>
      </div>
    </div>
    <!-- <div class="expert-block" v-if="ownerType===1">
      <div class="show-head headimg-box" :style="{backgroundImage:'url('+ headUrl(ownerInfo) +')'}"></div>
      <div class="show-info reInfo-box">
        <div class="info-tit">{{ownerInfo.name}}<em class="authicon" :class="headIcon(ownerInfo)"></em></div>
        <div class="info-tag"><span v-if="ownerInfo.title" style="margin-right:10px">{{ownerInfo.title}}</span> {{ownerInfo.offt}}</div>
      </div>
    </div>
    <div class="org-block" v-if="ownerType===2">
      <div class="show-head headimg-box">
        <img :src="orgLogoUrl(ownerInfo)">
      </div>
      <div class="show-info reInfo-box">
        <div class="info-tit">{{ownerInfo.forShort ? ownerInfo.forShort : ownerInfo.name}}<em class="authicon" :class="{'icon-com': ownerInfo.authStatus==='3'}"></em></div>
        <div class="info-tag"><span v-if="ownerInfo.title" style="margin-right:10px">{{ownerInfo.orgType}}</span> {{ownerInfo.industry ? ownerInfo.industry.replace(/,/gi, " | ") : ''}}</div>
      </div>
    </div> -->
    <el-row class="goSpan">
      <el-button type="primary" icon="el-icon-plus">关注</el-button>
      <el-button type="primary">联系</el-button>
    </el-row>
  </div>
</template>
<script>
  import util from '@/libs/util';
  // import httpUrl from '@/libs/http';
  export default {
    props: {
      ownerId: {
        type: String
      },
      ownerType: {
        type: String
      }
    },
    data() {
      return {
        ownerInfo: ''
      };
    },
    mounted() {
    },
    methods: {
      orgLogoUrl(item) {
        return item.hasOrgLogo ? util.ImageUrl(('org/' + item.id + '.jpg'), true) : util.defaultSet.img.org;
      },
      headUrl(item) {
        return item.hasHeadImage ? util.ImageUrl(('head/' + item.id + '_l.jpg'), true) : util.defaultSet.img.expert;
      },
      headIcon(item) {
        return util.autho(item.authType, item.orgAuth, item.authStatus);
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.beyond-block{
  text-align:center;
  .show-head{
    display: block;
    width: 120px;
    height: 120px;
    border: 1px solid #E5E5E5;
    margin: 0 auto 10px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    &.orgimg-box{
      @include center-items(200px, 120px);
    }
  }
  .show-info{
    width:100%;
    .info-tit{
      color:$commonFont;
      @include text-ellipsis();
      font-size: 18px;
      line-height: 24px;
    }
    .info-tag{
      color:$commonFont;
      @include text-ellipsis();
      font-size: 16px;
      line-height: 24px;
    }
    .info-desc{
      color:$secondaryFont;
      @include text-ellipsis();
      font-size: 15px;
      line-height: 24px;
    }
  }
  .goSpan{
    margin-top:15px;
  }
}
</style>
