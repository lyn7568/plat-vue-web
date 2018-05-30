<template>
	<div class="expert">
		<div class="content-wrapper block-wrapper">
			<div class="content-title">平台签约专家顾问</div>
			<baseExpert></baseExpert>
		</div>
		<BackTop></BackTop>
	</div>
</template>

<script type="text/ecmascript-6">
	import baseExpert from '../sub-component/BaseExpert';

	export default {
    components: {
      baseExpert
    }
  };
</script>
