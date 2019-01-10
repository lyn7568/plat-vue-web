<template>
  <div class="beyond-block">
    <div class="expert-block" v-if="ownerType==='1'">
      <div class="show-head" :style="{backgroundImage:'url('+ ownerInfo.img +')'}"></div>
      <div class="show-info">
        <div class="info-tit">{{ownerInfo.name}}<em class="authicon" :class="ownerInfo.auth"></em></div>
        <div class="info-tag">{{ownerInfo.title}}</div>
        <div class="info-desc">{{ownerInfo.offt}}</div>
      </div>
    </div>
    <div class="expert-block" v-if="ownerType==='00' || ownerType==='2'">
      <div class="show-head orgimg-box">
        <img :src="ownerInfo.logo">
      </div>
      <div class="show-info">
        <div class="info-tit">{{ownerInfo.name}}</div>
        <div class="info-desc">{{ownerInfo.title}}</div>
      </div>
    </div>
    <div class="goSpan">
      <collectCo v-if="ownerType==='1'" :watchOptions="{oid: ownerId, type: 1}"></collectCo>
      <collectCo v-if="ownerType==='2'" :watchOptions="{oid: ownerId, type: 2}"></collectCo>
    </div>
  </div>
</template>
<script>
  import { ImageUrl, defaultSet, autho } from '@/libs/util';
  import queryBase from '@/libs/queryBase';
  import collectCo from '@/components/CollectCo';

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
    components: {
      collectCo
    },
    created() {
      if (this.ownerId) {
        this.ownerBaseInfo()
      }
    },
    methods: {
      ownerBaseInfo() {
        var that = this
        if (that.ownerType === '1') {
          queryBase.getProfessor(that.ownerId, function(sc, value) {
            if (sc) {
              value.auth = (value.authType, value.orgAuth, value.authStatus)
              if (value.hasHeadImage) {
                value.img = ImageUrl(('head/' + value.id + '_l.jpg'), true)
              } else {
                value.img = defaultSet.img.expert
              }
              that.ownerInfo = value
            }
          })
        } else if (that.ownerType === '2') {
          queryBase.getOrganization(that.ownerId, function(sc, value) {
            if (sc) {
              if (value.insdutry) {
                value.insdutry = value.insdutry.replace(/,/g, ' | ')
              }
              if (value.hasOrgLogo) {
                value.logo = ImageUrl(('org/' + value.id + '.jpg'), true)
              } else {
                value.logo = defaultSet.img.org
              }
              that.ownerInfo = value
            }
          })
        } else if (that.ownerType === '00') {
          queryBase.getCompany(that.ownerId, function(sc, value) {
            if (sc) {
              if (!value.logo) {
                value.logo = defaultSet.img.org
              } else {
                value.logo = value.logo
              }
              that.ownerInfo = value
            }
          })
        }
        console.log(that.ownerInfo)
      }
    }
  };
</script>
<style scoped>
.beyond-block{
  text-align:center;
}
.beyond-block .show-head{
  display: block;
  width: 120px;
  height: 120px;
  border: 1px solid #E5E5E5;
  margin: 0 auto 10px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.beyond-block .show-head.orgimg-box{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e4e7ed;
  box-sizing:border-box;
  width: 202px;
  height: 122px;
  border-radius: 4px;
  background-size:cover;
  background-position: center center;
}
.beyond-block .show-head.orgimg-box img{
  max-width: 200px;
  max-height: 100%;
}

.beyond-block .show-info{
  width:100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 24px;
  color:#606266;
}
.beyond-block .show-info .info-tit{
  font-size: 18px;
}
.beyond-block .show-info .info-tag{
  font-size: 16px;
}
.beyond-block .show-info .info-desc{
  color:#909399;
  font-size: 15px;
}

.beyond-block .goSpan{
  margin-top:15px;
}
</style>
