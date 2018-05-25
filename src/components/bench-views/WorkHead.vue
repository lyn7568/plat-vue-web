<template>
	<div class="workHeader">
		<div class="workHeaderWrapper">
				<ul class="contain-wrapper workHeaderMain">
					<li>
						<a :href="kexiuLink" target="_blank">
							<h1 class="kexiuLogo"></h1>
						</a>
					</li>
					<li>
            <div @mouseover="overShow" @mouseout="outHide" class="logoBox">
              <div class="loginLogo">
                <img :src="plf_logo"/>
              </div>
              <el-collapse-transition>
                <div class="logoChild" v-show="animateStatus">
                  <div class="triangle"></div>
                  <ul>
                    <li @click="updateInfo"> <span class="icon1"></span>修改资料</li>
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

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import util from '@/libs/util';

	export default {
    data() {
      return {
        kexiuLink: util.ekexiuUrl,
        plf_logo: '',
        animateStatus: false
      };
    },
    methods: {
      overShow() {
        this.animateStatus = true;
      },
      outHide() {
        this.animateStatus = false;
      },
      updateInfo() {
        this.$router.push({path: '/updateInfo'});
      }
    },
    created() {
      this.plf_logo = util.orgLogoUrl(Cookies.get('plf_logo'));
    }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .workHeader
    .workHeaderWrapper
      height: 60px
      background: #fff
      border-bottom: 2px solid $borderColor
      box-sizing: border-box
      z-index: 1000
      font-size: 16px
      line-height: 32px
      display: flex
      justify-content: center
    .workHeaderMain
      display: flex
      justify-content: space-between
      li
        display: flex
        align-items: center

        .kexiuLogo
          width: 60px
          height: 30px
          bg-image('./img/home_icon_cmplogo.png')
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
            z-index: 1000
            .triangle
              width: 0
              height: 0
              border: 8px solid transparent
              border-bottom-color: $mainColor
              position: absolute
              right: 10px
              top: 0

            ul
              width: 100%
              bg-blue-color()
              border-radius()
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
                  bg-blue-active-color()
                span
                  bg-image('./img/index-icon.png')
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
            cursor: pointer
            center-items(40px,40px)
</style>
