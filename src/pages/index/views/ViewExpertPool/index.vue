<template>
	<div class="expert">
		<div class="content-wrapper block-wrapper" style="min-height:400px" v-loading="loadingState">
			<div class="content-title content-title-center">平台特约专家</div>
			<expItem></expItem>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import expItem from './expItem';

	export default {
		data() {
			return {
				loadingState: true
			}
		},
    components: {
      expItem
    }
  };
</script>
