<template>
  <div class="aboutUs">
    <div class="content-title content-title-center">平台介绍</div>
    <div class="plat-info" v-html="aboutUs"></div>
    <BackTop></BackTop>
  </div>
</template>

<script type="text/javascript">
  import util from '@/libs/util';

  export default {
    data() {
      return {
        aboutUs: ''
      };
    },
    created() {
       this.getAboutUs();
    },
    methods: {
      getAboutUs() {
        this.$axios.get('/ajax/platform/get', {
        }, (res) => {
          this.aboutUs = util.getFormatCode(res.data.descp);
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .aboutUs{
    margin-bottom:20px;
    padding:20px;
    background: #fff;
    color:$mainFont;
    .faq-title{
      font-size:16px;
    }

    .faq-content{
      line-height: 26px;
      margin:20px 10px 20px;
      text-align: justify;
      overflow: hidden;
      .faq-sub-title{
        margin-top:10px;
        font-weight:600;
      }

      p{
        margin-bottom: 10px;
        text-indent: 2em;
      }
    }
  }

</style>
