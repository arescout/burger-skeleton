<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <button><router-link to="/Startpage">Go home!</router-link></button>

    <h1>{{ uiLabels.ingredients }}</h1>

    <!-- Add buttons for navigating through categories -->
    <button v-on:click="setCategory(1)">{{uiLabels.protein}}</button>
    <button v-on:click="setCategory(2)">{{uiLabels.toppings}}</button>
    <button v-on:click="setCategory(3)">{{uiLabels.sauce}}</button>
    <button v-on:click="setCategory(4)">{{uiLabels.bread}}</button>
    <button v-on:click="setCategory(5)">{{uiLabels.sides}}</button>
    <button v-on:click="setCategory(6)">{{uiLabels.drinks}}</button>

    <!-- Add list of ingredients -->
    <Ingredient
      ref="ingredient"
      v-for="item in ingredients"
      v-if="item.category===currentCategory"
      v-on:increment="addToOrder(item)"  
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>

    <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
    <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

    <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
      <OrderItem 
        v-for="(order, key) in orders"
        v-if="order.status !== 'done'"
        :order-id="key"
        :order="order" 
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItem>
    </div>
  </div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only 
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      currentCategory: 1, // Category deciding what ingredients to show
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    },

    // Function for changing category. Called on at buttons in <Ingredient
    setCategory: function(newCat) {
        this.currentCategory = newCat;
    }
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin:auto;
  width: 40em;
}

.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
  background-image: url('../assets/exampleImage.jpg');
  color: white;
}
</style>