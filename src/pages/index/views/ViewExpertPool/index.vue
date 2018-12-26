<template>
	<div class="expert">
		<div class="content-wrapper block-wrapper">
			<div class="content-title content-title-center">平台特约专家</div>
			<expItem></expItem>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import expItem from './expItem';

	export default {
    components: {
      expItem
    }
  };
</script>
