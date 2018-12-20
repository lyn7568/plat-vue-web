<template>
  <a class="list-item" :href="linkway" target="_blank">
    <div class="list-head" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="list-info">
      <div class="list-tit">{{itemSingle.articleTitle}}</div>
      <ul class="list-tag">
        <li v-if="showOwner">{{ownerName}}</li>
        <li>{{formTime}}</li>
        <li v-if="itemSingle.pageViews>0">阅读量 {{itemSingle.pageViews}}</li>
        <li v-if="itemSingle.articleAgree>0">赞 {{itemSingle.articleAgree}}</li>
        <li v-if="leverNumber>0">留言 {{leverNumber}}</li>
      </ul>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
  import util from '@/libs/util';

  export default {
    props: {
      itemSingle: {
        type: Object
      },
      showOwner: {
        type: Boolean
      }
    },
    data() {
      return {
        linkway: util.pageUrl('a', this.itemSingle),
        imgUrl: this.itemSingle.articleImg ? util.ImageUrl('article/' + this.itemSingle.articleImg) : util.defaultSet.img.article,
        formTime: util.commenTime(this.itemSingle.publishTime),
        ownerName: '',
        leverNumber: ''
      };
    },
    created() {
      if (this.showOwner) {
        this.ownerByond(this.itemSingle);
      };
      this.leaveWordTotal(this.itemSingle);
    },
    methods: {
      leaveWordTotal(item) {
        var _this = this;
         this.$axios.getk('/ajax/leavemsg/count', {
          sid: item.articleId,
          stype: 1
        }, (res) => {
          if (res.success) {
            _this.leverNumber = res.data;
            _this.$forceUpdate();
          }
        });
      },
      ownerByond(item) {
        var _this = this;
        if (item.articleType) {
          this.$axios.getk('/ajax/org/' + item.ownerId, {
            }, (res) => {
            if (res.success) {
              let $info = res.data;
              _this.ownerName = $info.forShort ? $info.forShort : $info.name;
              _this.$forceUpdate();
            }
          });
        };
      }
    }
  };
</script>
