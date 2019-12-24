<template>
  <div>
    {{uiLabels.orderNr}}: {{orderId}}
    <div v-for="(burger,key2) in order.burgers" :key2="key2">
      {{uiLabels.burgNr}}: {{key2 + 1}}
      <span v-for="ingredient in burger">
        <br/> {{ingredient.count}} x {{ingredient.ing["ingredient_" + lang]}}
      </span>
    </div>
    <button v-on:click="orderDone">
      {{uiLabels.ready}}
    </button>
  </div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>
	
</style>