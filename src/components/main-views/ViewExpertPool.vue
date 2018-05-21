<template>
	<div class="expert">
		<div class="content-wrapper">
			<div class="content-title">平台签约专家顾问</div>
			<div class="block-container">
				<baseExpert v-for="item in 10" :key="item"></baseExpert>
			</div>
		</div>
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
