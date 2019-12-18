<template>
<div id="orders">

  <div class = "kitchenWrapper">
    <div class = "prepare">
      <h1>{{ uiLabels.ordersInQueue }}</h1>
        <OrderItemToPrepare
          v-for="(order, key) in orders"
          v-if="order.status !== 'done'"
          v-on:done="markDone(key)"
          :order-id="key"
          :order="order"
          :ui-labels="uiLabels"
          :lang="lang"
          :key="key">
        </OrderItemToPrepare>
    </div>


  <div class = "itemsDone">
    <h1>{{ uiLabels.ordersFinished }}</h1>
    <OrderItem
      v-for="(order, key) in orders"
      v-if="order.status === 'done'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>
  </div>

</div>
</div>	
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    }
  }
}
</script>
<style scoped>
	#orders {
    font-size:24pt;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  .kitchenWrapper {
    display: grid;
    grid-gap: 2vw;
    border:solid black 5px;
  }

  .prepare {
    text-align: center;
    grid-column: 1;
    border: solid black 5px;
  }

  .itemsDone {
    text-align: center;
    grid-column: 2;
    border: solid black 5px;
  }
</style>