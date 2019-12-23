<template>
	<div>
		{{uiLabels.orderNr}}: {{orderId}}
		<div v-for="(burger,key2) in order.burgers" :key2="key2">
			{{uiLabels.burgNr}}: {{key2 + 1}}
			<span v-for="ingredient in burger">
      <br/> {{ingredient.count}} x {{ingredient.ing["ingredient_" + lang]}}
      </span>
		</div>
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