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
						<div class="loginLogo">
							<img src="./img/home_icon_logo_orange.png"/>
						</div>
					</li>
				</ul>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'

	.workHeader
	  .workHeaderWrapper
	    width:100%
	    height:60px
	    background:#fff
	    border-bottom:2px solid #e5e5e5
	    box-sizing:border-box
	    position:fixed
	    top:0
	    left:0
	    right:0
	    z-index:1000
	    font-size:16px
	    line-height:32px
	    display:flex
	    display:-webkit-flex
	    justify-content:center
	  .workHeaderMain
	    width:1100px
	    padding:0 10px
	    display:flex
	    display:-webkit-flex
	    justify-content:space-between
	    li
	      display:flex
	      display:-webkit-flex
	      align-items:center
		    .kexiuLogo
		      width:60px
		      height:30px
		      bg-image('./img/home_icon_logo_orange.png')
		      background-size:contain
		      overflow:hidden
		    .loginLogo
		      overflow:hidden
		      border:1px solid #e5e5e5
		      vertical-align:middle
		      text-align:center
		      cursor:pointer
		      border-radius:4px
		      display:table-cell
		      width:42px
		      height:42px
		      img
		        max-width:40px
		        max-height:100%
		        overflow-y:hidden
		        color:transparent  
</style>