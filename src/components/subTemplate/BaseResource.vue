<template>
  <a class="list-item" :href="'resource.html?id='+itemSingle.id" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + resourceInfo.img + ')'}"></div>
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
      }
    },
    data() {
      return {
        ownerName: '',
        ownerAuth: ''
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
        if (obj && obj.images) {
          obj.img = defaultSet.img.resource
          if (obj.images instanceof Array) {
            if (obj.images.length > 0) {
              obj.img = ImageUrl('resource/' + obj.images[0].imageSrc)
            }
          } else {
            obj.img = ImageUrl('resource/' + strToArr(obj.images))
          }
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
      this.ownerByond(this.resourceInfo);
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
