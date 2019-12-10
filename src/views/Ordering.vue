<template>
  <div id="ordering">
    <img class="example-panel" src="https://rfclipart.com/image/big/18-1f-86/ornamental-batik-seamless-pattern-Download-Royalty-free-Vector-File-EPS-113870.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <button><router-link to="/Startpage">Go home!</router-link></button>

    <h1>{{ uiLabels.ingredients }}</h1>

    <!-- Add buttons for navigating through categories -->
    <div class = "menuWrapper">
      <div class = "categoryTabs">
            <button v-on:click="setCategory(1)">{{uiLabels.protein}}</button>
            <button v-on:click="setCategory(2)">{{uiLabels.toppings}}</button>
            <button v-on:click="setCategory(3)">{{uiLabels.sauce}}</button>
            <button v-on:click="setCategory(4)">{{uiLabels.bread}}</button>
            <button v-on:click="setCategory(5)">{{uiLabels.sides}}</button>
            <button v-on:click="setCategory(6)">{{uiLabels.drinks}}</button>
      </div>

    <!-- Add list of ingredients -->
        <div class = "ingredientBox">

            <Ingredient
                ref="ingredient"
                v-for="item in ingredients"
                v-if="item.category===currentCategory"
                v-on:increment="addToOrder(item)"
                :item="item"
                :count="item.counter"
                :lang="lang"
                :key="item.ingredient_id">
            </Ingredient>
        </div>
    <!-- Order information -->
    <div class ="orderStatus">
    <h1 class = "myBurger">{{ uiLabels.order }}</h1>
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
      count:0,
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
    .pageHeader {
        background-color: beige;
        border: solid black 3px;
        padding-top: 1em;
        padding-bottom: 1em;
        text-align: center;
    }

    #ordering {
        margin:auto;
        width: 40em;
    }

    .example-panel {
        position: fixed;
        background-size: cover;
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
    .menuWrapper {
        display: grid;
        grid-gap: 5px;
    }
    .categoryTabs{
        background-color: beige;
        border: black solid 2px;
        border-radius: 5px;
        grid-column: 1 / span 3;
        grid-row: 1;
    }
    .categoryTabs button {
        background-color: chocolate;
        border: solid black 2px;
        /*border-radius: 15px;*/
        font-size: 1.1em;
        height: 3em;

    }
    .orderStatus {
        background-color: bisque;
        border: black solid 3px;
        grid-column: 4;
        grid-row: 1 / span 5;
    }
    .myBurger{
        background-color: beige;
        border: solid black 3px;
    }
    .ingredientBox {
        grid-column: 1 / span 3;
        grid-row: 2 / span 4;
    }

</style>