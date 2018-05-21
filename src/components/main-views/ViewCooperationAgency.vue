<template>
	<div class="cooperation">
		<div class="content-wrapper">
			<div class="content-title">平台合作机构</div>
			<div class="block-container">
				<baseAgency v-for="item in 10" :key="item"></baseAgency>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import baseAgency from '../sub-component/BaseAgency';

	export default {
    components: {
      baseAgency
    }
  };
</script>
