<template>
  <div id="ordering">
    <img class="example-panel" src="https://rfclipart.com/image/big/18-1f-86/ornamental-batik-seamless-pattern-Download-Royalty-free-Vector-File-EPS-113870.jpg">
      <button v-on:click="switchLang()">
          <img src = https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg width = 20px>{{ uiLabels.language }}
      </button>
    <button><router-link to="/" class="routerButton">{{uiLabels.startpage}}</router-link></button>



    <!-- Add buttons for navigating through categories -->
    <div class = "menuWrapper">
        <h1 class = "ingredientHeader">{{ uiLabels.ingredients }}</h1>
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
            <div class = "ingredientWrapper">

            <Ingredient
                ref="ingredient"
                v-for="item in ingredients"
                v-if="item.category===currentCategory"
                v-on:increment="addToOrder(item)"
                v-on:decrease="deleteFromOrder(item)"
                :item="item"
                :count="item.counter"
                :lang="lang"
                :key="item.ingredient_id">
            </Ingredient>
            </div>
        </div>

    <!-- Order information -->
            <div class="orderStatus">
                <h1 class="myBurger">{{ uiLabels.order }}</h1>
                <div v-for="countIng in countAllIngredients"
                     v-if="countIng.count>0"
                     :key="countAllIngredients.indexOf(countIng)">
                    {{countIng.name}}: {{countIng.count}} {{uiLabels.unit}},
                </div>
                {{uiLabels.tally}}: {{price}} kr
                <br><button class = "placeOrderButton" v-if = "chosenIngredients.length > 0" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
                <br>

                <h1 class  = "orderQueue">{{ uiLabels.ordersInQueue }}:</h1>
                <div class = "orderedItems">
                    <OrderItem
                            v-for="(order, key) in this.orders"
                            v-if="order.status !== 'done'"
                            :order-id="key"
                            :order="order"
                            :ui-labels="uiLabels"
                            :lang="lang"
                            :key="key">
                    </OrderItem>
                </div>
                <button class = "checkOutButton"><router-link class="routerButton" to="/checkout">{{uiLabels.proceedToCO}}</router-link></button>
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
        data: function () { //Not that data is a function!
            return {
                chosenIngredients: [],
                price: 0,
                orderNumber: "",
                count: 0,
                currentCategory: 1, // Category deciding what ingredients to show
            }
        },
        created: function () {
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));
        },
        computed: {
            //Nytt Taken from burger-skeleton/severalBurgers/src/views/Kitchen.vue and changed ingredients to our array chosenIngredients
            countAllIngredients: function () {
                let ingredientTuples = []
                for (let i = 0; i < this.chosenIngredients.length; i += 1) {
                    ingredientTuples[i] = {};
                    ingredientTuples[i].name = this.chosenIngredients[i]['ingredient_' + this.lang];
                    ingredientTuples[i].count = this.countNumberOfIngredients(this.chosenIngredients[i].ingredient_id);
                }
                //Create an array difIngredients where
                // Array.from creates a new shallow-copied array
                // set is being used to remove duplicates/store unique values
                let difIngredients = Array.from(new Set(ingredientTuples.map(arrayName => arrayName.name))).map(name => {
                        return {
                            name: name,
                            count: ingredientTuples.find(arrayName => arrayName.name === name).count
                        };
                    });
                console.log(difIngredients);
                return difIngredients;
            }
        },
        methods: {
            addToOrder: function (item) {
                this.chosenIngredients.push(item);
                this.price += +item.selling_price;
            },
            deleteFromOrder: function (item) { // Nytt hela funktionen
                // With splice remove one of the items that has been appending to the chosenIngredients array, is being called from minus-button,
                // indexOf says where the removing should be done, the 1 is  that is being removed
                this.chosenIngredients.splice(this.chosenIngredients.indexOf(item), 1);
                this.price -= item.selling_price; // Adjust the total price
            },
            placeOrder: function () {
                    //Wrap the order in an object
                    let order = {
                        ingredients: this.chosenIngredients,
                        price: this.price
                    };
                // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
                this.$store.state.socket.emit('order', {order: order});
                //set all counters to 0. Notice the use of $refs
                for (let i = 0; i < this.$refs.ingredient.length; i += 1) {
                    this.$refs.ingredient[i].resetCounter();
                }
                this.price = 0;
                this.chosenIngredients = [];
                /*this.difIngredients.clear*/
            },

            // Function for changing category. Called on at buttons in <Ingredient
            setCategory: function (newCat) {
                this.currentCategory = newCat;
            },
            countNumberOfIngredients: function (id) {
                //Nytt Taken from burger-skeleton/severalBurgers/src/views/Kitchen.vue
                let counter = 0;
                for (let ingredIndex in this.chosenIngredients) {
                    //Now we have an array of ingredients in an order which is checked with the id that being sent from countAllIngredients in the call
                    if (this.chosenIngredients[ingredIndex].ingredient_id === id) {
                        counter += 1;
                    }
                }
                return counter;
            }
        }
    }
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */


    #ordering {
        margin:auto;
        width: 60em;
    }

    .example-panel {
        position: fixed;
        background-size: cover;
        width: 100%;
        left:0;
        top:0;
        z-index: -2;
    }
    .ingredient {
        border: 1px solid #ccd;
        padding: 1em;
        background-color: antiquewhite;
        border: solid 3px #ffc74a;
        border-radius: 10px;
        color: black;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .menuWrapper {
        display: grid;
        grid-gap: 5px;
    }
    .ingredientHeader {
        background: bisque;
        border: solid black 2px;
        border-radius: 10px;
        text-align: center;
        grid-row: 1;
        grid-column: 1 / span 3;
    }
    .categoryTabs{
        background-color: beige;
        border: black solid 2px;
        border-radius: 5px;
        height: 3em;
        grid-column: 1 / span 3;
        grid-row: 2;
    }
    .categoryTabs button {
        background-color: chocolate;
        border: solid black 2px;
        /*border-radius: 15px;*/
        font-size: 1em;
        height: 100%;
        /*padding-bottom: 2px;*/
        width: calc(100% /6);

    }
    .categoryTabs button:hover {
        background-color: saddlebrown;
        color:black;
    }
    .orderStatus {
        background-color: bisque;
        border: black solid 3px;
        border-radius: 10px;
        grid-column: 4;
        grid-row: 1 / span 3;
        padding-bottom: 1em;
        padding-left: 1em;
    }
    .orderedItems {
        background: beige;
        border-radius: 5px;
        border: solid black 3px;
        margin-right: 1em;
    }
    .orderQueue {
        text-align: center;
    }
    .placeOrderButton {
        border: 3px black solid;
        border-radius: 15px;
        font-size: 1em;
        background-color: rgba(255,223,26,0.36);

    }
    .checkOutButton {
        text-align: center;
        background-color: yellow;
        border-radius: 15px;
        border:solid black 3px;
        font-style: oblique;
        margin: 0 auto;
        margin-top: 1em;
        display: block;

    }
    .myBurger{
        text-align: center;
        background-color: beige;
        border: solid black 3px;
        border-radius: 10px;
        margin-right: 2em;
        margin-left: 2em;
        padding-bottom: 0.5em;
        padding-top: 0.5em;
        padding-right: 1.5em;
        padding-left: 1.5em;
    }
    .ingredientBox {
        grid-column: 1 / span 3;
        grid-row: 3 / span 4;
        background-color: bisque;
        border: solid black 3px;
        padding: 2px;
        border-radius: 10px;
    }
    .ingredientWrapper {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 10px;
    }

    .routerButton {
        text-decoration: none;
        color: black;
    }
</style>