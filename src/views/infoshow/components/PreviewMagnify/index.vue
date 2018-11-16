<template>
  <div class="magnify">
    <div class="product-box">
      <div class="preview-box" @mousemove="move($event)" @mouseout="out" ref="previewBox">
        <div class="img-cover" ref="previewImgCover">
          <img :src="previewImg[selectIndex]" alt="" ref="previewImg">
        </div>
        <div class="hover-box" ref="hoverBox"></div>
      </div>
      <ul class="tb-thumb" id="thumblist">
        <li :class="{'tb-selected': index==selectIndex}" @click="selectFun(index)" v-for="(item,index) in previewImg" :key="item.index">
          <div class="tb-pic">
            <a href="javascript:void(0);">
              <img :src="item">
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox">
      <img :src="previewImg[selectIndex]" alt="" ref="bigImg">
    </div>
  </div>
</template>

<script>
function offset(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    left: left,
    top: top
  };
}
export default {
  name: 'magnify',
  props: {
    // previewImg: {
    //   type: Array
    // }
  },
  data() {
    return {
      zoomVisiable: false,
      hoverVisiable: false,
      selected: true,
      selectIndex: 0,
      previewImg: [
        '/data/resource/201710/C1F33120B2404644A7DD99B3DE9BFC21.jpg',
        '/data/resource/201710/179DCD28E4C146E99869FB1AB943DE1F.jpg',
        '/data/resource/201803/2CF4E47B24454D4BBEEEF126B2108D97.jpg',
        '/data/resource/201706/6989DDEA8E614EF6B550958F0C8A785E.jpg'
      ]
    };
  },
  methods: {
    out() {
      this.zoomVisiable = false;
    },
    move(ev) {
      this.init();
      // 鼠标距离屏幕距离
      let moveX = ev.clientX;
      let moveY = ev.clientY;
      // 大盒子距离顶部的距离
      let offsetLeft = offset(this.oPreviewBox).left;
      let offsetTop = offset(this.oPreviewBox).top;

      // hover遮罩层的宽高
      this.oHoverBox.style.width = this.bWidth / this.bimgWidth * this.kWidth + 'px';
      this.oHoverBox.style.height = this.bHeight / this.bimgHeight * this.kHeight + 'px';

      // 设置鼠标处于hover遮罩层正中心的位置
      let left = moveX - offsetLeft - this.houverWidth / 2;
      let top = (this.scroll > 0) ? (moveY - offsetTop + this.scroll - this.houverHeight / 2) : (moveY - offsetTop - this.houverHeight / 2);

      // 计算图片与最外框的空余位置
      let spareW = this.pWidth - this.kWidth;
      let spareH = this.pHeight - this.kHeight;
      // 计算hover遮罩层可以移动的最大、最小位置
      let maxWidth = this.kWidth - this.houverWidth + spareW / 2;
      let maxHeight = this.kHeight - this.houverHeight + spareH / 2;
      let minWidth = spareW / 2;
      let minHeight = spareH / 2;

      // hover遮罩层的移动范围
      left = left < minWidth ? minWidth : (left > maxWidth ? maxWidth : left);
      top = top < minHeight ? minHeight : (top > maxHeight ? maxHeight : top);
      // 设置hover遮罩层的移动时的当前位置
      this.oHoverBox.style.left = left + 'px';
      this.oHoverBox.style.top = top + 'px';

      // 计算放大比例scale
      let percentX = (left - spareW / 2) / (maxWidth - spareW / 2);
      let percentY = (top - spareH / 2) / (maxHeight - spareH / 2);
      // 设置对应的右边放大图片对应的位置
      this.oBigImg.style.left = percentX * (this.bWidth - this.bimgWidth) + 'px';
      this.oBigImg.style.top = percentY * (this.bHeight - this.bimgHeight) + 'px';

      this.$emit('move', ev);
      this.zoomVisiable = true;
    },
    init() {
      this.oHoverBox = this.$refs.hoverBox;
      this.oPreviewBox = this.$refs.previewBox;
      this.oPreviewImgCover = this.$refs.previewImgCover;
      this.oBigImg = this.$refs.bigImg;
      this.zoomBox = this.$refs.zoomBox;
      this.houverWidth = this.oHoverBox.offsetWidth;
      this.houverHeight = this.oHoverBox.offsetHeight;
      this.pWidth = this.oPreviewBox.offsetWidth;
      this.pHeight = this.oPreviewBox.offsetHeight;
      this.kWidth = this.oPreviewImgCover.offsetWidth;
      this.kHeight = this.oPreviewImgCover.offsetHeight;
      this.bimgWidth = this.oBigImg.offsetWidth;
      this.bimgHeight = this.oBigImg.offsetHeight;
      this.bWidth = this.zoomBox.offsetWidth;
      this.bHeight = this.zoomBox.offsetHeight;
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    selectFun(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  .magnify
    position: relative
    .product-box
      position: relative
      .preview-box
        width: 360px
        height: 270px
        border: 1px solid #dededd
        position: relative
        display:flex
        justify-content: center
        align-items:center
        overflow:hidden
        .hover-box
          position: absolute
          display: none
          left: 0
          top: 0
          bottom:0
          width: 60px
          height: 60px
          background: url('./img/mask.png') repeat 0 0
          cursor: move
          user-select: none
        &:hover
          .hover-box
            display: block
        img
          max-width: 360px
          max-height: 270px
      .tb-thumb
        margin:10px 0 0
        overflow:hidden
        li
          background:none repeat scroll 0 0 transparent
          float:left
          margin:0 6px 0 0
          overflow:hidden
          .tb-pic
            border: 1px solid #E5E5E5
            a
              display:block
              height: 48px
              width: 66px
              display:flex
              justify-content: center
              align-items:center
            img
              max-height: 48px
              max-width: 66px
          &.tb-selected
            border: 3px solid $mainColor
            .tb-pic
              background-color: #FFFFFF
              border: medium none
              a
                height: 44px
                width: 58px
              img
                max-height: 44px
                max-width: 58px
    .zoom-box
      width: 300px
      height: 300px
      overflow: hidden
      position: absolute
      left: 370px
      border: 1px solid #dededd
      top: 0
      z-index: 700
      img
        position: absolute
        top: 0
        left: 0
</style>
