<template>
  <div>
    <div class="block-container">
      <a class="block-item org-item" v-for="item in orgData" :key="item.index" :href="'org.html?id='+item.id" target="_blank">
        <div class="item-block-org">
          <div class="item-pic-org">
            <img :src="item.logo">
          </div>
          <div class="item-text-org">
            <div class="item-tit-org"><span>{{item.name}}</span><em class="authicon" :class="{'icon-com': item.authStatus==='3'}"></em></div>
            <p class="item-tag-org">{{item.industry}}</p>
          </div>
        </div>
      </a>
    </div>
    <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower" v-if="!num"></Loading>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import queryBase from '@/libs/queryBase';

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        rows: 30,
        orgData: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    created() {
       this.ResidentOrgs();
    },
    methods: {
      ResidentOrgs() {
        this.$axios.get('/ajax/org/list', {}, (res) => {
          if (res.success) {
            var $data = res.data;
            if ($data.length > 0) {
              for (let i = 0; i < $data.length; i++) {
                queryBase.getOrganization($data[i].id, function(sc, value) {
                  if (sc) {
                    var owner = $data[i]
                    owner.name = value.name
                    if (value.hasOrgLogo) {
                      owner.logo = util.ImageUrl(('org/' + value.id + '.jpg'), true)
                    } else {
                      owner.logo = util.defaultSet.img.org
                    }
                    if (value.industry) {
                      owner.industry = value.industry.replace(/,/g, ' | ')
                    }
                  }
                })
              }
              this.isFormSearch = true;
              this.orgData = this.orgData.concat($data);
            };
            if ($data.length < this.rows) {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
          };
        });
      },
      loadLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.ResidentOrgs(this.platId);
        }
      }
    }
  };
</script>
