<template>
  <div class="block-container">
    <a class="block-item org-item" v-for="item in orgData" :key="item.index" :href="linkUrl(item)">
      <div class="item-block-org">
        <div class="item-pic-org">
          <img :src="orgLogoUrl(item)">
        </div>
        <div class="item-text-org">
          <div class="item-tit-org"><span>{{item.name}}</span><em class="authicon" :class="{'icon-com': item.authStatus==='3'}"></em></div>
          <p class="item-tag-org">{{item.industry.replace(/,/gi, ' | ')}}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import util from '@/libs/util';
  import httpUrl from '@/libs/http';

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        platId: '',
        rows: 20,
        orgData: '',
        dataO: {
          bOid: '',
          bTime: ''
        }
      };
    },
    created() {
       this.platId = Cookies.get('platId');
       this.ResidentOrgs(this.platId);
    },
    methods: {
      ResidentOrgs(id) {
        this.$axios.get(httpUrl.hQuery.buttedOrgs.nopq, {
          params: {
            pid: id,
            oid: this.dataO.bOid,
            time: this.dataO.bTime,
            rows: this.num ? this.num : this.rows
          }
        }).then((res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.bOid = $info[$info.length - 1].id;
              this.dataO.bTime = $info[$info.length - 1].buttedTime;
              this.orgData = $info;
              console.log(this.orgData);
            };
            if ($info.length < this.rows) {
            };
          };
        });
      },
      orgLogoUrl(item) {
        return item.hasOrgLogo ? util.ImageUrl(('org/' + item.id + '.jpg'), true) : util.defaultSet.img.org;
      },
      linkUrl(item) {
        return util.defaultSet.link.org + item.id;
      }
    }
  };
</script>
