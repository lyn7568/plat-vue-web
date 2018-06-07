<template>
  <div class="block-container">
    <a class="block-item" v-for="item in userData" :key="item.index" :href="linkUrl(item)" target="_blank">
      <div class="show-head" :style="{backgroundImage:'url('+ headUrl(item) +')'}"></div>
      <div class="show-info">
        <div class="info-tit">{{item.name}}<em class="authicon" :class="headIcon(item)"></em></div>
        <div class="info-tag" v-if="item.offt">{{item.offt}}</div>
        <div class="info-desc" v-if="item.reserachs">研究方向：{{item.reserachs}}</div>
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
            var $data = res.data;
            if ($data.length > 0) {
              this.dataO.bUid = $data[$data.length - 1].id;
              this.dataO.bTime = $data[$data.length - 1].buttedTime;
              for (let i = 0; i < $data.length; i++) {
                if ($data[i].title) {
                  if ($data[i].orgName) {
                    $data[i].offt = $data[i].title + '，' + $data[i].orgName;
                  } else {
                    $data[i].offt = $data[i].title;
                  }
                } else {
                  if ($data[i].office) {
                    if ($data[i].orgName) {
                      $data[i].offt = $data[i].office + '，' + $data[i].orgName;
                    } else {
                      $data[i].offt = $data[i].office;
                    }
                  } else {
                    $data[i].offt = '';
                  }
                }
                $data[i].className = util.autho($data[i].authType, $data[i].orgAuth, $data[i].authStatus);
                if ($data[i].hasHeadImage) {
                  $data[i].image = util.ImageUrl('head/' + $data[i].id + '_l.jpg', true);
                } else {
                  $data[i].image = util.defaultSet.expert;
                }
                this.$axios.get(httpUrl.utilUrl + '/researchArea/' + $data[i].id).then(res => {
                  const $info = res.data;
                  let arr = [];
                  for (let j = 0; j < $info.length; j++) {
                    arr.push($info[j].caption);
                    if (j === $info.length - 1) {
                      $data[i].reserachs = arr.join('，');
                      this.$forceUpdate();
                    }
                  }
                  if ($info.lenth === 0) {
                    $data[i].reserachs = '';
                  }
                });
              }
              this.userData = $data;
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
