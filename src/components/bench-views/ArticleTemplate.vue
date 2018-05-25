<template>
  <div class="list-item">
    <div class="list-head"></div>
    <div class="list-info">
      <div class="list-tit">2017年“浙江杰出青年”揭晓，祝贺中科院宁波材料所王立平研究员上榜中科院宁波材料所王立平研究员上榜！</div>
       <ul class="list-tag">
        <li>企业名称</li>
        <li>发布于5月8日 18:00</li>
        <li>阅读量 1000</li>
        <li>赞 99</li>
        <li>留言 109</li>
      </ul>
      <ul class="list-tag">
        <li>发布于5月8日 18:00</li>
        <li>阅读量 1000</li>
        <li>赞 99</li>
        <li>留言 109</li>
      </ul>
      <ul class="list-tag">
        <li>修改于5月8日 18:00</li>
        <li class="coRed">草稿</li>
        <li class="coRed">将在 4月3日 08:00 定时发布</li>
      </ul>
    </div>
    <div class="dele">
      <el-button type="primary" size="small">修改</el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/listitem';
    .list-item
      &:hover
        background: #EEEEEE
      &:hover .dele
        display: block
      .dele
        display: none
        position: absolute
        right: 10px
    .coRed
      color: red
</style>
