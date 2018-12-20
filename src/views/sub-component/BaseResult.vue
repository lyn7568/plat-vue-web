<template>
  <router-link class="list-item" :to="'resu_patent?id='+itemSingle.id" target="_blank">
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
          this.$axios.getk('/ajax/professor/baseInfo/' + item.oid, {
            }, (res) => {
            if (res.success) {
              let $info = res.data;
              this.ownerName = $info.name;
              this.ownerAuth = util.autho($info.authType, $info.orgAuth, $info.authStatus);
            }
          });
        } else if (item.otype === '2') {
          this.$axios.getk('/ajax/org/' + item.oid, {
            }, (res) => {
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
