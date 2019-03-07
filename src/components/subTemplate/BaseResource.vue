<template>
  <a class="list-item" :href="urlHref" :target="noBlank ? '' : '_blank'">
    <div class="list-head" :style="{backgroundImage: 'url(' + resourceInfo.firstImg + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{resourceInfo.name}}</div>
      <div class="list-owner">{{ownerName}}<em class="authicon" :class="ownerAuth"></em></div>
      <div class="list-desc" v-if="resourceInfo.cnt">用途：{{resourceInfo.cnt}}</div>
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
        urlHref: ''
      };
    },
    computed: {
      resourceInfo() {
        var obj = this.itemSingle
        if (obj.resourceId) {
          obj.id = obj.resourceId
        }
        if (obj.resourceName) {
          obj.name = obj.resourceName
        }
        obj.firstImg = defaultSet.img.resource
        if (obj.images && obj.images.length > 0) {
          obj.firstImg = ImageUrl('resource/' + obj.images[0].imageSrc)
        }
        if (obj.supportedServices) {
          obj.cnt = obj.supportedServices
        }
        if (obj.resourceType) {
          obj.otype = obj.resourceType
          obj.oid = obj.professorId || obj.orgId
        }
        return obj
      }
    },
    created() {
      this.ownerByond();
      if (this.noBlank) {
        this.urlHref = `h5.html#/resource?id=${this.resourceInfo.id}`;
      } else {
        this.urlHref = `resource.html?id=${this.resourceInfo.id}`
      }
    },
    methods: {
      ownerByond() {
        var item = this.resourceInfo
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
