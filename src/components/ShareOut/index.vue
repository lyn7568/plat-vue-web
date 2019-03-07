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
    import { urlshare } from '@/libs/util';
  export default {
    props: {
      tPosition: {
        type: String,
        default: 'bottom-start'
      }
    },
    data() {
      return {
        qrcode: ''
      }
    },
    mounted() {
      this.$nextTick(function() {
        this._makeCode();
      });
    },
    methods: {
      _makeCode() {
        let qrcode = this.qrcode
        qrcode = new QRCode('qrcode', {
          width: 120,
          height: 120
        });
        qrcode.clear();
        qrcode.makeCode(urlshare());
      }
    }
  };
</script>
<style scoped>
.share-block{
  display: inline-block;
  margin-right:15px;
}
.share-block .share-icon{
  display:inline-block;
  margin-left:6px;
}
.share-block .share-icon.icon-wechat{
  width:18px;
  height:14px;
  background-image:url('./img/icon_weixin_nor.png');
  background-size:cover;
}
.share-block .share-icon.icon-wechat:hover{
  background-image:url('./img/icon_weixin_hig.png');
}

.popper-class{
  background: rgba(0,0,0,.6);
  color:#ffffff;
}
.popper-class .shareCode{
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.popper-class .shareCode .qrcode{
  float: left;
}
.popper-class .shareCode .qrcode img,canvas{
  border: 4px solid #ffffff;
}
.popper-class .shareCode .qrword{
  width:180px;
  font-size:14px;
  line-height:28px;
}

.el-popover{
  border: none
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
  border-bottom-color: rgba(0,0,0,.6)
}
.el-popper[x-placement^=top] .popper__arrow::after{
  border-top-color: rgba(0,0,0,.6)
}
</style>
