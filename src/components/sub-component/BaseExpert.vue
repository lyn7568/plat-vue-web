<template>
  <div class="block-container">
    <a class="block-item" v-for="item in userData" :key="item.index" :href="linkUrl(item)">
      <div class="show-head" :style="{backgroundImage:'url('+ headUrl(item) +')'}"></div>
      <div class="show-info">
        <div class="info-tit">{{item.name}}<em class="authicon" :class="headIcon(item)"></em></div>
        <div class="info-tag">职称/职位，所在机构</div>
        <div class="info-desc">

研究方向：研究方向A；研究方向B；研究方向C；研究方向A；研究方向B；研究方向C；研究方...
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
        userData: '',
        dataO: {
          bUid: '',
          bTime: ''
        }
      };
    },
    created() {
       this.platId = Cookies.get('platId');
       this.buttedProfessors(this.platId);
    },
    methods: {
      buttedProfessors(id) {
        this.$axios.get(httpUrl.hQuery.buttedProfessors.nopq, {
          params: {
            pid: id,
            uid: this.dataO.bUid,
            time: this.dataO.bTime,
            rows: this.num ? this.num : this.rows
          }
        }).then((res) => {
          console.log(res);
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.bUid = $info[$info.length - 1].id;
              this.dataO.bTime = $info[$info.length - 1].buttedTime;
              this.userData = $info;
            };
            if ($info.length < this.rows) {
            };
          };
        });
      },
      headUrl(item) {
        return item.hasHeadImage ? util.ImageUrl(('head/' + item.id + '_l.jpg'), true) : util.defaultSet.img.expert;
      },
      headIcon(item) {
        return util.autho(item.authType, item.orgAuth, item.authStatus);
      },
      linkUrl(item) {
        return util.defaultSet.link.expert + item.id;
      }
    }
  };
</script>
