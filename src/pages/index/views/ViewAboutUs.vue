<template>
  <div class="aboutUs">
    <div class="content-title content-title-center">平台介绍</div>
    <div class="plat-info" v-html="aboutUs" v-loading="loading"></div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { getFormatCode } from '@/libs/util';

  export default {
    data() {
      return {
        aboutUs: '',
        loading: true,
      };
    },
    created() {
       this.getAboutUs();
    },
    methods: {
      getAboutUs() {
        this.loading = true
        this.$axios.get('/ajax/platform/get', {
        }, (res) => {
          this.loading = false
          this.aboutUs = getFormatCode(res.data.descp);
        });
      }
    }
  };
</script>

<style scoped>
  .aboutUs{
    min-height:370px;
    margin-bottom:20px;
    padding:20px;
    background: #fff;
    color:#303133;
  }
  .aboutUs .faq-title{
    font-size:16px;
  }

  .aboutUs .faq-content{
    line-height: 26px;
    margin:20px 10px 20px;
    text-align: justify;
    overflow: hidden;
  }
  .aboutUs .faq-content .faq-sub-title{
    margin-top:10px;
    font-weight:600;
  }

  .aboutUs .faq-content p{
    margin-bottom: 10px;
    text-indent: 2em;
  }

</style>
