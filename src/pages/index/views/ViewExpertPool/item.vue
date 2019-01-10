<template>
  <a class="block-item" :href="'expert.html?id='+itemSinger.id" target="_blank">
    <div class="show-head" :style="{backgroundImage:'url('+ itemSinger.img +')'}"></div>
    <div class="show-info">
      <div class="info-tit">{{itemSinger.name}}<em class="authicon" :class="itemSinger.auth"></em></div>
      <div class="info-tag" v-if="itemSinger.offt">{{itemSinger.offt}}</div>
      <div class="info-desc" v-if="reserachs">研究方向：{{reserachs}}</div>
    </div>
  </a>
</template>

<script>
  export default {
    props: ['itemSinger'],
    data() {
      return {
        reserachs: ''
      }
    },
    created() {
      if (this.itemSinger) {
        this.getResearchArea()
      }
    },
    methods: {
      getResearchArea() {
        var that = this
        that.$axios.getk('/ajax/researchArea/' + that.itemSinger.id, {}, (res) => {
          const $info = res.data;
          let arr = [];
          for (let j = 0; j < $info.length; j++) {
            if ($info[j].caption) {
              arr.push($info[j].caption);
            };
            if (j === $info.length - 1) {
              that.reserachs = arr.join('，');
              that.$forceUpdate();
            }
          }
        });
      }
    }
  };
</script>
