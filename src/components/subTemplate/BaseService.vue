<template>
  <a class="list-item" :href="urlHref" :target="noBlank ? '' : '_blank'">
    <div class="list-head" :style="{backgroundImage: 'url(' + serveInfo.firstImg + ')'}"></div>
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
      },
      noBlank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        ownerName: '',
        ownerAuth: '',
        serveInfo: '',
        urlHref: ''
      };
    },
    created() {
      this.itmeList();
      if (this.noBlank) {
        this.urlHref = `h5.html#/serve?id=${this.serveInfo.id}`;
      } else {
        this.urlHref = `serve.html?id=${this.serveInfo.id}`
      }
    },
    methods: {
      itmeList() {
        var objStr = this.itemSingle
        objStr.firstImg = defaultSet.img.service
        if (objStr.images) {
          objStr.firstImg = ImageUrl('ware' + strToArr(objStr.images)[0])
        }
        if (objStr.category) {
          objStr.otype = objStr.category
          objStr.oid = objStr.owner
        }
        this.serveInfo = objStr
        this.ownerByond()
      },
      ownerByond() {
        var item = this.serveInfo
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
