<template>
  <a class="list-item" :href="'serve.html?id='+serveInfo.id" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + serveInfo.img + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{serveInfo.name}}</div>
      <div class="list-owner">{{ownerName}}<em class="authicon" :class="ownerAuth"></em></div>
      <div class="list-desc" v-if="serveInfo.cnt">内容：{{serveInfo.cnt}}</div>
    </div>
  </a>
</template>

<script>
  import { ImageUrl, defaultSet, autho, strToArr } from '@/libs/util';
  import queryBase from '@/libs/queryBase';

  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {
        ownerName: '',
        ownerAuth: ''
      };
    },
    computed: {
      serveInfo() {
        var obj = this.itemSingle
        if (obj && obj.images) {
          obj.img = ImageUrl('ware' + strToArr(obj.images)[0])
        } else {
          obj.img = defaultSet.img.service
        }
        if (obj.category) {
          obj.otype = obj.category
          obj.oid = obj.owner
        }
        return obj
      }
    },
    created() {
      this.ownerByond(this.serveInfo);
    },
    methods: {
      ownerByond(item) {
        var _this = this
        if (item.otype === '1') {
          queryBase.getProfessor(item.oid, function(sc, value) {
            if (sc) {
              _this.ownerName = value.name;
              _this.ownerAuth = autho(value.authType, value.orgAuth, value.authStatus);
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
