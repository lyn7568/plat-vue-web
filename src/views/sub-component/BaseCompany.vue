<template>
  <div>
    <div class="block-container">
      <router-link class="block-item org-item" v-for="item in orgData" :key="item.index" :to="'comp_show?id='+item.id" target="_blank">
        <div class="item-block-org">
          <div class="item-pic-org">
            <img :src="orgLogoUrl(item)">
          </div>
          <div class="item-text-org">
            <div class="item-tit-org"><span>{{item.name}}</span><em class="authicon" :class="{'icon-com': item.authStatus==='3'}"></em></div>
            <p class="item-tag-org">{{item.industry.replace(/,/gi, ' | ')}}</p>
          </div>
        </div>
      </router-link>
    </div>
    <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower" v-if="!num"></Loading>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import util from '@/libs/util';

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        platId: '',
        rows: 30,
        orgData: [],
        dataO: {
          bOid: '',
          bTime: ''
        },
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    created() {
       this.platId = Cookies.get('platId');
       this.ResidentOrgs();
    },
    methods: {
      ResidentOrgs() {
        this.$axios.getp('/ajax/platform/info/buttedOrgs', {
          pid: this.platId,
          oid: this.dataO.bOid,
          time: this.dataO.bTime,
          rows: this.num ? this.num : this.rows
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.bOid = $info[$info.length - 1].id;
              this.dataO.bTime = $info[$info.length - 1].buttedTime;
              this.isFormSearch = true;
              this.orgData = this.orgData.concat($info);
            };
            if ($info.length < this.rows) {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
          };
        });
      },
      orgLogoUrl(item) {
        return item.hasOrgLogo ? util.ImageUrl(('org/' + item.id + '.jpg'), true) : util.defaultSet.img.org;
      },
      loadLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.ResidentOrgs(this.platId);
        }
      }
    }
  };
</script>
