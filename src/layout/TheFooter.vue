<template>
  <div class="footer minw-block">
		<div class="contain-wrapper">
			<div class="footer-wrapper">
				<div class="wrapper-left">
          <a href='/#/home'>
            <img class="logo-block" :src="plat.logourl">
          </a>
					<div>
						<a href='/#/about'>关于平台 |</a>
						<a :href="plat.website" target="_blank">{{plat.name}} |</a>
						<a :href="kexiuLink" target="_blank">科袖网 |</a>
						<a :href="plat.adminsite" target="_blank">平台管理员登录</a>
					</div>
					<div>
						<span class="listlink">客服热线： {{plat.tel}}</span>
						<span class="listlink">客服邮箱：<a rel="nofollow" :href="'mailto:'+ plat.mailbox"> {{plat.mailbox}}</a></span>
					</div>
					<div>
						<span class="listlink">工作时间： 周一至周五  9:00-18:00 </span>
					</div>
				</div>
			</div>
			<div class="copy-wrapper">
				<span>Copyright © {{plat.foot_cl}} | {{plat.foot_cn}}</span>
				<a class="beian" v-if="plat.foot_bn || plat.foot_bl" target="_black" rel="nofollow" :href="plat.foot_bl"> | <em></em> {{plat.foot_bn}}</a>
			</div>
		</div>
  </div>
</template>

<script>
  import { ekexiuUrl } from '@/libs/util';

  export default {
    data() {
      return {
        kexiuLink: ekexiuUrl,
        plat: ''
      };
    },
    mounted () {
      /* eslint-disable no-undef */
      this.plat = PLAT.info;
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .footer{
    @include bg-grey-color();
    padding:30px 0;
    .footer-wrapper{
      display: flex;
      justify-content: space-between;
      font-size:14px;
      color:#888;
      line-height: 32px;
      .wrapper-left{
        .logo-block{
          margin:10px 0 20px;
        }
        .listlink{
          margin-right:25px;
        }
        a{
          color:#888;
          cursor:pointer;
        }
      }
    }
    .copy-wrapper{
      margin-top:20px;
      font-size:12px;
      color:#666;
      a{
        color:#666;
      }
      .beian{
        em{
          display: inline-block;
          width:14px;
          height:14px;
          @include bg-image('./img/home_icon_beian.png');
          background-size: cover;
        }
      }
    }
  }

</style>
