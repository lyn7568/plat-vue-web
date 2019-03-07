<template>
  <div class="swiper-container" ref="swiperAuto">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in previewImg" :key="item.index">
        <img :src="item" alt="">
      </div>
    </div>
    <div class="swiper-pagination" ref="swiperPage"></div>
  </div>
</template>

<script>
  export default {
    props: ['previewImg'],
    mounted() {
      let that = this;
      var mySwiper = new Swiper(this.$refs.swiperAuto, {
        pagination: {
          el: that.$refs.swiperPage,
          bulletElement: 'li'
        }
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .swiper-container {
    background: #f0f0f0;
    height: 200px;
    width: 100%;
    .swiper-wrapper {
      width: 100%;
      .swiper-slide {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          overflow: hidden;
          max-width: 100%;
          max-height: 200px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
