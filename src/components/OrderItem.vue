<template>
	<div>
		<!-- The following line promts errors and don't seem to do anything so i commented it away -->
		<!--{{orderId}} {{order.type}}}:-->
		{{order}}
	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  }
}
</script>
<style scoped>
	
</style>