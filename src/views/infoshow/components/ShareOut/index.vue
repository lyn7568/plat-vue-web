<template>
  <div class="share-block">
    <span>分享到</span>
    <em class="operateicon icon-wechat shareWeixin">
      <div class="shareCode">
        <div class="floatL" id="qrcode" ref="qrcode"></div>
        <div class="shareWord floatR">
          <p>打开微信“扫一扫”，<br/>打开网页后点击屏幕右上角“分享”按钮</p>
        </div>
      </div>
    </em>
  </div>
</template>
<script>
  // import QRCode from 'qrcode'
  // export default {
  //   // props: {
  //   // },
  //   mounted() {
  //   },
  //   methods: {
  //     _makeCode() {
  //       this.qrcodeCreat = new QRCode(document.getElementById('qrcode'), {
  //         width: 100,
  //         height: 100
  //       });
  //       var elurl = '';
  //       this.qrcodeCreat.makeCode(elurl);
  //     }
  //   }
  // };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.share-block
  background:rgba(60,62,81,.5)
  padding:14px 30px
  .operateicon
    display:inline-block
    &.icon-wechat
      width:19px
      height:15px
      bg-image("./img/icon_weixin_nor.png")
      &:hover
        bg-image("./img/icon_weixin_hig.png")
    .shareWeixin
      font-style: normal
      position: relative
      .shareCode
        display:none
        position: absolute
        bottom: 40px
        left:-24px
        background:rgba(0,0,0,.6)
        padding: 8px
        width:320px
        overflow:hidden
        z-index: 688
        &:after
          display: block
          width: 0
          height: 0
          border:12px solid transparent
          border-top-color:rgba(0,0,0,.6)
          position: absolute
          bottom:-24px
          left:22px
        .shareWord
          width:160px
          margin: 16px 10px
          color: #FFF
          text-align: left
          font-size: 14px
          line-height: 28px
          p
            font-size: 14px
            line-height: 28px
          img
            width:120px
            height:120px
            border: 4px solid #fff
</style>
