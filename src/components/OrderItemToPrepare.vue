<template>
  <!-- Note in this component that it is using another component -->
<div>
  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="orders">
  </OrderItem>
  <div v-for="(item, key3) in order" :key="key3">
    {{uiLabels.orderNr}}: {{key3 +1}}
   <span v-for="(burger, key2) in item" :key="key2">
     <br/> {{burger.count}} x {{burger.ing["ingredient_" + lang]}}
   </span>
  <button v-on:click="orderDone">
    {{uiLabels.ready}}
  </button>
  </div>
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