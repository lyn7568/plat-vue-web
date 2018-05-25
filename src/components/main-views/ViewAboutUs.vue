<template>
  <div class="aboutUs">
    <div class="content-title">平台介绍</div>
    <div class="plat-info">
      <div class="faq-content">
        <p>邢台经济开发区位于邢台市区东部，成立于1992年，2000年经省政府批准为省级经济技术开发区，2006年经省政府审定为省级经济开发区。现管辖面积208平方公里，下辖6个镇（办）、114个村（居），常住人口20万、流动人口近5万。先后被国家科技部、工信部命名为国家光伏高新技术产业化基地、国家太阳能光伏新型工业化产业示范基地。</p>
        <div class="faq-sub-title">主要工作措施：</div>
        <p> 开发区党工委、管委会明确了“产城融合、双轮驱动”的发展战略，确立了“产业高地、邢东新城、乐业宜居、绿色崛起”的发展定位，力争通过三年时间努力，把开发区建成国家级开发区、超千亿开发区、乐业宜居新城区。</p>
        <p>开发区区位优越，交通便利。紧邻邢台市主城区，交通便捷、畅达八方，是冀南“西联东出”和“贯通南北”的“大十字”交通枢纽。京广铁路、邢黄铁路，京广高铁，京港澳高速、107国道纵贯南北；邢和铁路，邢汾高速、邢临高速和邢衡高速横穿东西。方圆400公里内，有北京、天津、石家庄、济南、郑州、太原六个机场和天津、黄骅两大港口。随着邢台机场启动，将形成公路、铁路、航空“三位一体”的立体化交通网络。</p>
        <p>开发区基础设施完善，功能健全。按照“十一通一平”标准，已基本完成路网及水、电、气等管网的建设。邢台海关、内陆港、大型物流园、变电站、天然气门站等公共机构和设施配套不断完善。建成了全国一流的思源学校、香港爱尔迪国际幼儿园，正在建设高标准医院、青少年妇儿活动中心、生产力促进中心等，加快聚集人气商气。</p>
        <p> 开发区产业突出，初具规模。全力推进开放招商、全民创业，形成了现代服务业、先进制造业、新能源和现代农业、传统产业“3+2”产业体系，涌现出以好望角物流、中路纵横，同成科技、纳科诺尔，晶龙电子、三环太阳能，河北兴达、旺族饲料，恒进纺织、蓝鸟家具等为代表的优势骨干企业，拥有良好的产业基础。都市休闲型现代农业示范园区正在抓紧建设。</p>
      </div>
      <div class="faq-content">
        <div class="faq-sub-title">联系方式：</div>
        地址：{{plat.address}}<br>
        电话：{{plat.tel}}<br>
        传真：{{plat.fax}}<br>
        邮编：{{plat.zipcode}}<br>
        电子邮箱：{{plat.mailbox}}<br>
        网址：{{plat.website}}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      plat: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .aboutUs
    margin-bottom:20px
    padding:20px
    background: #fff
    color:$mainFont
    .faq-title
      font-size:16px

    .faq-content
      line-height: 26px
      margin:20px 10px 20px
      text-align: justify
      overflow: hidden
      .faq-sub-title
        margin-top:10px
        font-weight:600

      p
        margin-bottom: 10px
        text-indent: 2em

</style>
