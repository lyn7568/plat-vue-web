<template>
  <div class="inform">
    <div class="content-wrapper block-wrapper">
      <div class="content-title">全部通知</div>
      <div v-show="!ifDefault" v-if="platInforms.length">
        <informItem v-for="item in platInforms" :key="item.index" :itemSingle="item"></informItem>
        <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
      </div>
      <defaultPage v-show="ifDefault"></defaultPage>
    </div>
    <BackTop></BackTop>
  </div>
</template>
<script>
  import informItem from './informItem'
  export default {
    data() {
      return {
        platInforms: [],
        loadingModalShow: true,
        loadingComplete: false,
        isFormSearch: false,
        isLoading: false,
        ifDefault: false 
      }
    },
    components: {
      informItem
    },
    created() {
      this.searchInform()
    },
    methods: {
      searchInform() {
        this.$axios.getk('/ajax/ppatent/index/search', {
          key: this.keyVal,
          sortNum: this.dataO.patSortNum,
          createTime: this.dataO.patCreateTime,
          id: this.dataO.patId,
          rows: this.rows
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            if ($info.length > 0) {
              this.dataO.patSortNum = $info[$info.length - 1].sortNum;
              this.dataO.patCreateTime = $info[$info.length - 1].createTime;
              this.dataO.patId = $info[$info.length - 1].id;
              this.platInforms = this.isFormSearch ? this.platInforms.concat($info) : $info;
              this.isFormSearch = true;
              if ($info.length < this.rows) {
                this.loadingModalShow = false;
                this.isFormSearch = false;
              };
            } else {
              this.loadingModalShow = false;
              this.isFormSearch = false;
            };
            var liLen = this.platInforms.length;
            if ($info.length === 0 && liLen === 0) {
              this.ifDefault = true;
            };
          };
        });
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.searchInform()
        }
      }
    }
  }
</script>
