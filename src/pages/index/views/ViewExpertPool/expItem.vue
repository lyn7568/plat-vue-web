<template>
  <div>
    <div class="block-container">
      <a class="block-item" v-for="item in userData" :key="item.index" :href="'expert.html?id='+item.id" target="_blank">
        <div class="show-head" :style="{backgroundImage:'url('+ item.img +')'}"></div>
        <div class="show-info">
          <div class="info-tit">{{item.name}}<em class="authicon" :class="headIcon(item)"></em></div>
          <div class="info-tag" v-if="item.offt">{{item.offt}}</div>
          <div class="info-desc" v-if="item.reserachs">研究方向：{{item.reserachs}}</div>
        </div>
      </a>
    </div>
    <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="loadLower" v-if="!num"></Loading>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import queryBase from '@/libs/queryBase';

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        rows: 30,
        userData: [],
        loadingModalShow: true, // 是否显示按钮
        loadingComplete: false, // 是否全部加载
        isFormSearch: false, // 数据加载
        isLoading: false // button style...
      };
    },
    created() {
       this.buttedProfessors();
    },
    methods: {
      buttedProfessors(id) {
        this.$axios.get('/ajax/professor/list', {}, (res) => {
          if (res.success) {
            var $data = res.data;
            if ($data.length > 0) {
              this.isFormSearch = true;
              for (let i = 0; i < $data.length; i++) {
                queryBase.getProfessor($data[i].id, function(sc, value) {
                  if (sc) {
                    var owner = $data[i]
                    owner.name = value.name
                    owner.offt = util.formatOfft(value, true)
                    if (value.hasHeadImage) {
                      owner.img = util.ImageUrl(('head/' + value.id + '_l.jpg'), true)
                    } else {
                      owner.img = util.defaultSet.img.expert
                    }
                  }
                })
                this.$axios.getk('/ajax/researchArea/' + $data[i].id, {}, (res) => {
                  const $info = res.data;
                  let arr = [];
                  for (let j = 0; j < $info.length; j++) {
                    if ($info[j].caption) {
                      arr.push($info[j].caption);
                    };
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
              this.userData = this.userData.concat($data);
              if ($data.length < this.rows) {
                this.loadingModalShow = false;
                this.isFormSearch = false;
              }
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
      loadLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.buttedProfessors(this.platId);
        }
      }
    }
  };
</script>
