<template>
	<div class="expert">
		<div class="content-wrapper block-wrapper">
			<div class="content-title content-title-center">平台特约专家</div>
			<baseExpert></baseExpert>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import baseExpert from '@/views/sub-component/BaseExpert';

	export default {
    components: {
      baseExpert
    }
  };
</script>
