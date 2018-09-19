<template>
  <a class="list-item" :href="linkway" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit list-topic">{{itemSingle.name}}</div>
      <div class="list-owner">{{ownerName}}<em class="authicon" :class="ownerAuth"></em></div>
      <div class="list-desc" v-if="itemSingle.cnt">用途：{{itemSingle.cnt}}</div>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
  import util from '@/libs/util';
  import httpUrl from '@/libs/http';

  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {
        linkway: util.defaultSet.link.resource + this.itemSingle.id,
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
        if (item.otype === '1') {
          this.$axios.get(httpUrl.kxQurey.professor.query + item.oid, {
            }).then((res) => {
            if (res.success) {
              let $info = res.data;
              this.ownerName = $info.name;
              this.ownerAuth = util.autho($info.authType, $info.orgAuth, $info.authStatus);
            }
          });
        } else if (item.otype === '2') {
          this.$axios.get(httpUrl.kxQurey.org.query + item.oid, {
            }).then((res) => {
            if (res.success) {
              let $info = res.data;
              this.ownerName = $info.forShort ? $info.forShort : $info.name;
              this.ownerAuth = $info.authStatus === '3' ? 'icon-com' : '';
            }
          });
        }
      }
    }
  };
</script>
