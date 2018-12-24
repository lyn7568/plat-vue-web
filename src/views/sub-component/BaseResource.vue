<template>
  <router-link class="list-item"  :to="{name:'reso_show',query:{id:itemSingle.id}}" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-owner">{{ownerName}}<em class="authicon" :class="ownerAuth"></em></div>
      <div class="list-desc" v-if="itemSingle.cnt">用途：{{itemSingle.cnt}}</div>
    </div>
  </router-link>
</template>

<script>
  import util from '@/libs/util';
  import queryBase from '@/libs/queryBase';

  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {
        imgUrl: (this.itemSingle && this.itemSingle.images) ? util.ImageUrl('resource/' + this.itemSingle.images.split(',')[0]) : util.defaultSet.img.resource,
        ownerName: '',
        ownerAuth: ''
      };
    },
    created() {
      this.ownerByond(this.itemSingle);
    },
    methods: {
      ownerByond(item) {
        var _this = this
        if (item.otype === '1') {
          queryBase.getProfessor(item.oid, function(sc, value) {
            if (sc) {
              _this.ownerName = value.name;
              _this.ownerAuth = util.autho(value.authType, value.orgAuth, value.authStatus);
              _this.$forceUpdate();
            }
          });
        } else if (item.otype === '2') {
          queryBase.getOrganization(item.oid, function(sc, value) {
            if (sc) {
              _this.ownerName = value.forShort ? value.forShort : value.name;
              _this.ownerAuth = value.authStatus === '3' ? 'icon-com' : '';
              _this.$forceUpdate();
            }
          });
        }
      }
    }
  };
</script>
