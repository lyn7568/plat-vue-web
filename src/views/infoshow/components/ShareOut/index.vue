<template>
  <div class="share-block">
    <span>分享到</span>
    <el-popover
      :placement="tPosition"
      width="320"
      trigger="hover"
      popper-class="popper-class">
      <div class="shareCode">
        <div class="qrcode" id="qrcode" ref="qrcode"></div>
        <div class="qrword">
          打开微信“扫一扫”，<br/>打开网页后点击屏幕右上角“分享”按钮
        </div>
      </div>
      <em slot="reference" class="share-icon icon-wechat"></em>
    </el-popover>
  </div>
</template>
<script>
  import QRCode from 'qrcodejs2';
  export default {
    props: {
      tUrl: {
        type: String
      },
      tPosition: {
        type: String,
        default: 'bottom-start'
      }
    },
    mounted() {
      this.$nextTick(function() {
        this._makeCode();
      });
    },
    methods: {
      _makeCode() {
        let qrcode = new QRCode('qrcode', {
          width: 120,
          height: 120
        });
        qrcode.clear();
        qrcode.makeCode(this.tUrl);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoded>
.share-block
  margin-right:15px
  .share-icon
    display:inline-block
    margin-left:6px
    &.icon-wechat
      width:18px
      height:14px
      bg-image("./img/icon_weixin_nor.png")
      &:hover
        bg-image("./img/icon_weixin_hig.png")
.popper-class
  background: rgba(0,0,0,.6)
  color:#ffffff
  .shareCode
    overflow:hidden
    display:flex
    align-items:center
    justify-content:space-between
    .qrcode
      float: left
      img,canvas
        border: 4px solid #ffffff
    .qrword
      width:180px
      font-size:14px
      line-height:28px
.el-popover
  border: none
.el-popper[x-placement^=bottom] .popper__arrow::after
  border-bottom-color: rgba(0,0,0,.6)
.el-popper[x-placement^=top] .popper__arrow::after
  border-top-color: rgba(0,0,0,.6)
</style>
