<template>
	<div class="cooperation">
		<div class="content-wrapper block-wrapper">
			<div class="content-title content-title-center">平台合作机构</div>
			<baseCompany></baseCompany>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script>
	import baseCompany from '@/views/sub-component/BaseCompany';

	export default {
    components: {
      baseCompany
    }
  };
</script>
