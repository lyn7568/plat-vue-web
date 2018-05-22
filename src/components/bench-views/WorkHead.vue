<template>
	<div class="workHeader">
		<div class="workHeaderWrapper">
				<ul class="workHeaderMain">
					<li>
						<a href="http://www.ekexiu.com" target="_blank" >
							<h1 class="kexiuLogo"></h1>
						</a>
					</li>
					<li>
            <div @mouseover="overShow" @mouseout="outHide" class="logoBox">
              <div class="loginLogo">
                <img src="./img/home_icon_logo_orange.png"/>
              </div>
              <el-collapse-transition>
                <div class="logoChild" v-show="animateStatus">
                  <div class="triangle"></div>
                  <ul>
                    <li> <span class="icon1"></span>修改资料</li>
                    <li> <span class="icon2"></span>账户设置</li>
                    <li> <span class="icon3"></span>退出登录</li>
                  </ul>
                </div>
              </el-collapse-transition>
            </div>
					</li>
				</ul>
		</div>
	</div>
</template>

<script>
	export default {
    data() {
      return {
        animateStatus: false
      }
    },
    methods: {
      overShow() {
        this.animateStatus = true;
      },
      outHide() {
        this.animateStatus = false;
      }
    }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
    .workHeader
      .workHeaderWrapper
        width: 100%
        height: 60px
        background: #fff
        border-bottom: 2px solid #e5e5e5
        box-sizing: border-box
        position: fixed
        top: 0
        left: 0
        right: 0
        z-index: 1000
        font-size: 16px
        line-height: 32px
        display: flex
        display: -webkit-flex
        justify-content: center
      .workHeaderMain
        width: 1100px
        padding: 0 10px
        display: flex
        display: -webkit-flex
        justify-content: space-between
        li
          display: flex
          align-items: center

          .kexiuLogo
            width: 60px
            height: 30px
            bg-image('./img/home_icon_logo_orange.png')
            background-size: contain
            overflow: hidden
          .logoBox
            position:relative
            .logoChild
              position: absolute
              top: 45px
              right: 0
              width: 180px
              height: 140px
              .triangle
                width: 0
                height: 0
                border: 8px solid transparent
                border-bottom-color: #28b8fa
                position: absolute
                right: 10px
                top: 0

              ul
                width: 100%
                background: #28b8fa
                border-radius: 8px
                overflow: hidden
                position: absolute
                top: 16px
                li
                  width: 100%
                  height: 40px
                  line-height: 40px
                  font-size: 13px
                  color: #fff
                  cursor: pointer
                  &:hover
                    background: #17a4e4
                  span
                    background-image: url('./img/index-icon.png')
                    background-repeat: no-reapt
                    margin:0 10px
                    display: block
                    width: 20px
                    height: 20px
                  .icon1
                     background-position: -40px 0
                  .icon2
                     background-position: -60px 0
                  .icon3
                     background-position: -20px 0
            .loginLogo
              display: flex
              align-items: center
              cursor: pointer
              border: 1px solid #e5e5e5
              width: 42px
              height: 42px
              img
                display:block
                max-width: 40px
                max-height: 100%
</style>
