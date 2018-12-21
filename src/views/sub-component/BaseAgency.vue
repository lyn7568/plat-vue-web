<template>
  <div>
    <div class="block-container">
      <router-link class="block-item org-item" v-for="item in orgData" :key="item.index"  :to="{name:'org_show',query:{id:itemSingle.id}}" target="_blank">
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
      ResidentOrgs(id) {
        this.$axios.get('/ajax/org/list', {}, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
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
