<template>
  <div class="beyond-block">
    <div class="expert-block" v-if="ownerType==='1'">
      <div class="show-head" :style="{backgroundImage:'url('+ ownerInfo.img +')'}"></div>
      <div class="show-info">
        <div class="info-tit">{{ownerInfo.name}}<em class="authicon icon-pro"></em></div>
        <div class="info-tag">{{ownerInfo.title}}</div>
        <div class="info-desc">{{ownerInfo.offt}}</div>
      </div>
    </div>
    <div class="expert-block" v-else>
      <div class="show-head orgimg-box">
        <img :src="ownerInfo.logo">
      </div>
      <div class="show-info">
        <div class="info-tit">{{ownerInfo.name}}</div>
        <div class="info-desc">{{ownerInfo.title}}</div>
      </div>
    </div>
    <el-row class="goSpan" v-if="ownerType">
      <el-button type="primary" icon="el-icon-plus">关注</el-button>
      <el-button type="primary">联系</el-button>
    </el-row>
  </div>
</template>
<script>
  import util from '@/libs/util';
  import queryBase from '@/libs/queryBase';

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
    created() {
      if (!this.ownerType) {
        this.ownerCompInfo()
      } else if (this.ownerType === '1') {
        this.ownerProInfo()
      } else if (this.ownerType === '2') {
        this.ownerOrgInfo()
      }
    },
    methods: {
      ownerProInfo() {
        var that = this
        queryBase.getProfessor(that.ownerId, function(sc, value) {
          if (sc) {
            that.ownerInfo.name = value.name
            that.ownerInfo.title = value.title
            if (that.ownerInfo.hasHeadImage) {
              that.ownerInfo.img = util.ImageUrl(('head/' + value.id + '_l.jpg'), true)
            } else {
              that.ownerInfo.img = util.defaultSet.img.expert
            }
          }
        })
      },
      ownerOrgInfo() {
        var that = this
        queryBase.getOrganization(that.ownerId, function(sc, value) {
          if (sc) {
            that.ownerInfo.name = value.name
            that.ownerInfo.insdutry = value.insdutry.replace(/,/, ' | ')
            if (that.ownerInfo.hasOrgLogo) {
              that.ownerInfo.img = util.ImageUrl(('org/' + value.id + '.jpg'), true)
            } else {
              that.ownerInfo.img = util.defaultSet.img.org
            }
          }
        })
      },
      ownerCompInfo() {
        this.$axios.get('/ajax/company/qo', {
          id: this.ownerId
        }, (res) => {
          if (res.success) {
            const obj = res.data
            if (obj.logo === '') {
              obj.logo = util.defaultSet.img.org
            }
            this.ownerInfo = obj
          };
        });
        // queryBase.getCompany(that.ownerId, function(sc, value) {
        //   if (sc) {
        //     that.ownerInfo.name = value.name
        //     if (!that.ownerInfo.logo) {
        //       that.ownerInfo.logo = util.defaultSet.img.org
        //     }
        //   }
        // })
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
