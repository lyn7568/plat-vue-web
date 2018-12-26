<template>
	<div class="cooperation">
		<div class="content-wrapper block-wrapper">
			<div class="content-title content-title-center">平台合作机构</div>
			<orgItem></orgItem>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import orgItem from './orgItem';

	export default {
    components: {
      orgItem
    }
  };
</script>
