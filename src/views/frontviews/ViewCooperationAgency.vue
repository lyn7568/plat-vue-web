<template>
	<div class="cooperation">
		<div class="content-wrapper block-wrapper">
			<div class="content-title content-title-center">平台合作机构</div>
			<baseAgency></baseAgency>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import baseAgency from '@/views/sub-component/BaseAgency';

	export default {
    components: {
      baseAgency
    }
  };
</script>
