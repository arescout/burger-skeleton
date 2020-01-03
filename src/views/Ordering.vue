<template id="template">
    <div id="ordering">
        <button class="routerButton" v-on:click="switchLang()">
            <img src=https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg width=20px>{{uiLabels.language}}
        </button>
        <button>
            <router-link to="/" class="routerButton">{{uiLabels.startpage}}</router-link>
        </button>
        <button class="eatButton" v-on:click="changeEatHere()" v-if="this.eatHere">
            {{uiLabels.eatHere}}
        </button>
        <button class="eatButton" v-on:click="changeEatHere()" v-if="!this.eatHere">
            {{uiLabels.eatAway}}
        </button>

        <!-- Add buttons for navigating through categories -->
        <div class="wrapper">
            <div class="header"><h1>{{ uiLabels.companyName }}</h1></div>
            <div class="categoryTabs">
                <button v-on:click="setCategory(4)"
                        v-bind:class="[this.currentCategory === 4 ? 'catAct' : 'catInact']">{{uiLabels.bread}}</button>
                <button v-on:click="setCategory(1)"
                        v-bind:class="[this.currentCategory === 1 ? 'catAct' : 'catInact']">{{uiLabels.protein}}</button>
                <button v-on:click="setCategory(2)"
                        v-bind:class="[this.currentCategory === 2 ? 'catAct' : 'catInact']">{{uiLabels.toppings}}</button>
                <button v-on:click="setCategory(3)"
                        v-bind:class="[this.currentCategory === 3 ? 'catAct' : 'catInact']">{{uiLabels.sauce}}</button>
                <button v-on:click="setCategory(5)"
                        v-bind:class="[this.currentCategory === 5 ? 'catAct' : 'catInact']">{{uiLabels.sides}}</button>
                <button v-on:click="setCategory(6)"
                        v-bind:class="[this.currentCategory === 6 ? 'catAct' : 'catInact']">{{uiLabels.drinks}}</button>
                <button v-on:click="setCategory(7)"
                        v-bind:class="[this.currentCategory === 7 ? 'catAct' : 'catInact']">{{uiLabels.dip}}</button>
            </div>

            <!-- Add list of ingredients -->
            <div class="itemsContainer">
                <div class="itemsWrapper">
                    <Ingredient
                            ref="ingredient"
                            v-for="item in ingredients"
                            v-if="item.category===currentCategory && item.stock > 0"
                            v-on:increment="addToBurger(item)"
                            v-on:decrease="removeFromBurger(item)"
                            :item="item"
                            v-bind:itemCount="ingredientCount(item)"
                            :lang="lang"
                            :key="item.ingredient_id">
                    </Ingredient>
                </div>
                <button class = "prevButton" v-show="currentCategory !== 4" v-on:click="prevTab(currentCategory)">&#9668;</button>
                <button class ="nextButton" v-show="currentCategory < 7" v-on:click="nextTab(currentCategory)">&#9658;</button>
            </div>



            <!-- Order information -->
            <div class="orderContainer">
                <div class="orderWrapper">
                    <div class="orderHeader">
                        {{ uiLabels.order }}
                    </div>
                    <div class="orderSelectedWrapper">
                        <div>
                            <div v-for="item in this.groupIngredients(chosenIngredients)">
                                <span v-show="item.ing.category==7"> Dipp</span> {{item.count}} x {{item.ing['ingredient_' + lang]}} {{item.stock}}
                                <button class="plusButton" v-show="item.ing.category !== 4"
                                        v-on:click="addToBurger(item.ing)">+
                                </button>
                                <button class="minusButton" v-on:click="removeFromBurger(item.ing)">-</button>
                                <!--tried to make a functional decrease button in the ordering tab-->
                            </div>
                            <b>{{uiLabels.currentPriceLabel}}: {{this.currentPrice}}:-</b>
                        </div>
                        <button class="orderButton" v-show="orderReady" v-on:click="placeOrder">
                            {{ uiLabels.newBurger }}
                        </button>
                    </div>
                    <div class="orderSummaryContainer">
                        <b>{{uiLabels.yourOrder}}:</b>
                        <div>
                            <div class="readyBurger" v-for="(burger, key) in checkoutOrder.burgers" :key="key">
                                <button v-on:click="hideBurger(key)">^</button> <!-- Denna blir bara krånglig eller? <button class ="edit">Edit</button> -->
                                <b>{{uiLabels.burgNr}} {{key + 1}}</b>
                                <button class="delBurg" v-on:click="deleteBurger(checkoutOrder.burgers, key)">X</button>
                                <!--
                                Above to the left is an attempt to hide the content of each burger, but I don't know how to
                                separate the burgers from each other-->

                                <!-- Key + 1 so it doesn't say "burger 0" on customers page -->
                                <span v-show="!hideBurg" v-for="(item, key2) in burger" :key="key2">
                                <br/>{{ item.ing["ingredient_" + lang]}}: {{ item.count }} {{uiLabels.unit}}
                            </span>
                            </div>
                            <!--<br><button class = "placeOrderButton" v-if = "chosenIngredients.length > 0" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>-->
                            <h4>{{uiLabels.tally}}: {{totalPrice}}:-</h4>
                            <!-- Why is this OrderItem added here?? / Oskar  -->
                            <!--<OrderItem
                                    v-for="(order, key3) in this.orders"
                                    v-if="order.status !== 'done'"
                                    :order-id="key3"
                                    :order="order"
                                    :ui-labels="uiLabels"
                                    :lang="lang"
                                    :key="key3">
                            </OrderItem> -->
                        </div>
                        <button class="orderButton" v-show="!this.noOrder" v-on:click="getNow">
                            <!-- no order if no burger is added to the tab-->
                            <router-link class="routerButton" to="/checkout" v>
                                {{uiLabels.proceedToCO}}
                            </router-link>
                        </button>
                    </div>
                    <div class="allergyContainer">
                        <div class="allergyBox">{{uiLabels.allergies}}:<br>
                            <p class="vegan">V</p> = {{uiLabels.vegan}}<br>
                            <p class="lactose">L</p> = {{uiLabels.lactose}}<br>
                            <p class="gluten">G</p> = {{uiLabels.gluten}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import Ingredient from '@/components/Ingredient.vue'
    import OrderItem from '@/components/OrderItem.vue'
    import sharedVueStuff from '@/mixins/sharedVueStuff.js'
    import UtilityFunctions from '@/mixins/UtilityFunctions.js'


    export default {
        name: 'Ordering',
        components: {
            Ingredient,
            OrderItem,
        },
        mixins: [sharedVueStuff, UtilityFunctions], // include stuff that is used in both
        // the ordering system and the kitchen
        data: function () { //Not that data is a function!
            return {
                chosenIngredients: [],
                currentPrice: 0,
                orderNumber: "",
                count: 0,
                breadChosen: false,
                pattyChosen: false,
                //orderReady: false,
                sideChosen: false,
                drinkChosen: false,
                //noOrder: false,
                noShow: false,
                hideBurg: false,
                patties: 0,
                currentCategory: 4, // Category deciding what ingredients to show first
                activeCat: 0,
                isActive: false,
                numbOfBurgers: 0,
                currentOrder: {
                    burgers: []
                },
                aggregatedOrders: {
                    burgers: []
                },
            }
        },
        created: function () {
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));

        },
        computed: {
            eatHere: function () {
                return this.$store.state.eatHere
            },
            totalPrice: function () {
                return this.$store.state.totalPrice
            },
            checkoutOrder: function () {
                return this.$store.state.checkoutOrder
            },
            giveTime: function () {
                return this.$store.state.giveTime
            },
            orderReady: function () {
                for (let i = 0; i < this.chosenIngredients.length; i += 1) {
                    if (this.chosenIngredients[i].category === 4) {
                        this.breadChosen = true;
                        this.sideChosen = false;
                        this.drinkChosen = false;
                    }
                    if (this.chosenIngredients[i].category === 1) {
                        this.pattyChosen = true;
                        this.sideChosen = false;
                        this.drinkChosen = false;
                    }
                    if (this.chosenIngredients[i].category === 5) {
                        this.sideChosen = true;
                    }
                    if (this.chosenIngredients[i].category === 6) {
                        this.drinkChosen = true;
                    }
                }
                if (this.pattyChosen == this.breadChosen && this.sideChosen )
                    {  //order can only be made if burger and bread or drink or side is chosen
                    return true;// kanske göra en elsif så man inte kan beställa bröd och dricka.
                }
                if (this.pattyChosen == this.breadChosen && this.drinkChosen)
                {  //order can only be made if burger and bread or drink or side is chosen
                    return true;
                }
                if (this.pattyChosen && this.breadChosen)
                {  //order can only be made if burger and bread or drink or side is chosen
                    return true;
                }

            },
            noOrder: function () {
                let noOrder;
                if (this.totalPrice === 0) {
                    return noOrder = true;
                }
            },
            //Nytt Taken from burger-skeleton/severalBurgers/src/views/Kitchen.vue and changed ingredients to our array chosenIngredients
            countAllIngredients: function () {
                let ingredientTuples = [];
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

                return difIngredients;
            },
        },
        methods: {
            ingredientCount: function (item) {
                let counter = 0;
                for (let i = 0; i < this.chosenIngredients.length; i += 1) {
                    if (this.chosenIngredients[i] === item)
                        counter += 1;
                }
                return counter;
            },
            changeEatHere: function () {
                if (this.eatHere) {
                    this.$store.commit('setEatHere', false);
                } else {
                    this.$store.commit('setEatHere', true);
                }
            },
            addToBurger: function (item) {
                this.chosenIngredients.push(item);
                this.currentPrice += +item.selling_price;
                if (item.category === 1) {
                    this.patties += 1;
                }
                //console.log(this.chosenIngredients);
            },
            removeFromBurger: function (item) {
                let removeIndex = 0;
                for (let i = 0; i < this.chosenIngredients.length; i += 1) {
                    if (this.chosenIngredients[i] === item) {
                        removeIndex = i;
                        break;
                    }
                }
                if (item.category === 1) {
                    this.patties -= 1;
                    if (this.patties === 0) {
                        this.pattyChosen = false;
                    }
                }
                if (item.category === 4) {
                    this.breadChosen = false;
                }
                if (item.category === 5) {
                    this.sideChosen = false;
                }
                if (item.category === 6) {
                    this.drinkChosen = false;
                }
                this.chosenIngredients.splice(removeIndex, 1);
                this.currentPrice -= +item.selling_price;
            },

            addToOrder: function () {
                // Add the burger to an order array
                if (this.chosenIngredients.length === 0) {
                    return;
                }

                this.currentOrder.burgers.push({
                    ingredients: this.chosenIngredients.splice(0),
                    price: this.currentPrice
                });

                this.aggregatedOrders.burgers.push({
                    ingredients: this.countPlacedIngredients(this.currentOrder.burgers)
                });
                this.$store.commit('addToCheckoutOrder', this.groupIngredients(this.chosenIngredients));
                this.$store.commit('addToTotal', this.currentPrice);

                //set all counters to 0. Notice the use of $refs
                for (let i = 0; i < this.$refs.ingredient.length; i += 1) {
                    this.$refs.ingredient[i].resetCounter();
                }
                this.chosenIngredients = [];
                this.currentPrice = 0;
                this.noOrder = false;  //reset counters
                this.orderReady = false;
                this.breadChosen = false;
                this.pattyChosen = false;

            },
            placeOrder: function () {
                // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
                let thisBurger = this.groupIngredients(this.chosenIngredients);
                thisBurger.price = this.currentPrice;
                this.$store.commit('addToCheckoutOrder', thisBurger);
                this.$store.commit('addToTotal', this.currentPrice);

                this.chosenIngredients = [];
                this.currentPrice = 0;
                //this.noOrder = false;  //reset counters
                //this.orderReady = false;
                this.breadChosen = false;
                this.pattyChosen = false;
                this.drinkChosen = false;
                this.sideChosen = false;
                this.patties = 0;
                this.sideChosen = false;
                this.drinkChosen = false;
                this.currentOrder = [];
                this.category = 1;
            },
            nextTab: function (cat){
                if (cat < 3 || 6 > cat > 4){
                    let newCat = cat + 1;
                    this.setCategory(newCat);
                }
                else if (cat === 5){
                    let newCat = 6;
                    this.setCategory(newCat);
                }
                else if (cat === 4) {
                    let newCat = 1;
                    this.setCategory(newCat);
                }
                else if (cat === 3){
                    let newCat = cat + 2;
                    this.setCategory(newCat);
                }
                else if (cat === 6){
                    let newCat = 3;
                    this.setCategory(newCat);
                }
            },
            prevTab: function(cat) {
                if (cat === 1){
                    let newCat = 4;
                    this.setCategory(newCat);
                }
                else if (1 < cat < 3 || 6 > cat > 4){
                    let newCat = cat - 1;
                    this.setCategory(newCat);
                }
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
            },

            // Function for counting number of same ingredients in ingredient list
            countPlacedIngredients: function (ingredientList) {
                // Create new array for collecting the unique ingredients
                let ingredientTuples = [];

                let indexCount = 0;

                // Go through input list
                for (let index = 0; index < ingredientList[this.numbOfBurgers].ingredients.length; index++) {
                    // Check if ingredientTuples has an instance of this ingredient
                    if (!ingredientTuples.includes(ingredientList[this.numbOfBurgers].ingredients[index])) {
                        ingredientTuples[indexCount] = ingredientList[this.numbOfBurgers].ingredients[index];
                        ingredientTuples[indexCount].count = 1;
                        indexCount += 1;
                    } else {
                        ingredientTuples[ingredientTuples.indexOf(ingredientList[this.numbOfBurgers].ingredients[index])].count += 1;
                    }
                }
                this.numbOfBurgers += 1;
                return ingredientTuples;
            },

            hideBurger: function (key) {
                this.hideBurg = !this.hideBurg;
            },

            deleteBurger: function (burgers, key) { //this function deletes the burger from the order container
                //console.log(burgers);
                //console.log(key);
                // No need for the for-loop, burgers[key] will find the right object
                for (let i = 0; i < burgers.length; i++) {
                    if (i === key) {
                        let thisPrice = burgers[i].price;
                        this.$store.commit('removeFromCheckoutOrder', key);
                        this.$store.commit('removeFromTotal', thisPrice)
                    }
                }
            },

            getNow: function () { //this function gets the time for when the order is made,
                const today = new Date(); // trying to figure out how to send it to kitchen
                const timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log(timeStamp);
                this.$store.commit('setTime', timeStamp);
            }
        }
    }
</script>
<style scoped>

    /*COLOR SCHEME*/

    :root {
        --primary-color: #FFE4C4;
        --primary-light-color: #FAEBD7;
        --primary-dark-color: #ffc74a;
        --primary-text-color: black;
        --secondary-color: chocolate;
        --secondary-light-color: #FFFF00;
        --secondary-dark-color: saddlebrown;
        --secondary-text-color: black;
        --border-color: black;
    }

    /*GENERAL*/

    html {
        scroll-behavior: smooth;
    }

    #ordering {
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-color: hsl(2, 57%, 40%);
        background-image: repeating-linear-gradient(transparent, transparent 50px, rgba(0, 0, 0, .4) 50px, rgba(0, 0, 0, .4) 53px, transparent 53px, transparent 63px, rgba(0, 0, 0, .4) 63px, rgba(0, 0, 0, .4) 66px, transparent 66px, transparent 116px, rgba(0, 0, 0, .5) 116px, rgba(0, 0, 0, .5) 166px, rgba(255, 255, 255, .2) 166px, rgba(255, 255, 255, .2) 169px, rgba(0, 0, 0, .5) 169px, rgba(0, 0, 0, .5) 179px, rgba(255, 255, 255, .2) 179px, rgba(255, 255, 255, .2) 182px, rgba(0, 0, 0, .5) 182px, rgba(0, 0, 0, .5) 232px, transparent 232px),
        repeating-linear-gradient(270deg, transparent, transparent 50px, rgba(0, 0, 0, .4) 50px, rgba(0, 0, 0, .4) 53px, transparent 53px, transparent 63px, rgba(0, 0, 0, .4) 63px, rgba(0, 0, 0, .4) 66px, transparent 66px, transparent 116px, rgba(0, 0, 0, .5) 116px, rgba(0, 0, 0, .5) 166px, rgba(255, 255, 255, .2) 166px, rgba(255, 255, 255, .2) 169px, rgba(0, 0, 0, .5) 169px, rgba(0, 0, 0, .5) 179px, rgba(255, 255, 255, .2) 179px, rgba(255, 255, 255, .2) 182px, rgba(0, 0, 0, .5) 182px, rgba(0, 0, 0, .5) 232px, transparent 232px),
        repeating-linear-gradient(125deg, transparent, transparent 2px, rgba(0, 0, 0, .2) 2px, rgba(0, 0, 0, .2) 3px, transparent 3px, transparent 5px, rgba(0, 0, 0, .2) 5px);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    /*LANGUAGE AND BACK BUTTON*/

    .routerButton {
        text-decoration: none;
        text-transform: uppercase;
        color: black;
    }

    /*MAIN*/

    .wrapper {
        display: grid;
        margin: 0.25rem;
        grid-template-areas: "header order" "nav order" "content order";
        grid-template-columns: 0.625fr 0.375fr;
        grid-template-rows: auto auto 1fr;
        grid-gap: 0.25rem;
    }

    /*MOBILE VIEW*/

    @media (max-width: 850px) {
        .wrapper {
            display: grid;
            margin: 0.25rem;
            grid-template-areas: "header" "nav" "content" "order";
            grid-template-columns: auto;
            grid-template-rows: auto;
            grid-gap: 0.25rem;
        }
    }

    /*HEADER*/

    .header {
        grid-area: header;
        background: var(--primary-color);
        border: 3px var(--border-color) solid;
        border-radius: 10px;
        text-align: center;
        text-transform: uppercase;
    }

    /*MENU*/

    .categoryTabs {
        grid-area: nav;
        border: 2px var(--border-color) solid;
        border-radius: 5px;
        display: flex;
        flex-wrap: nowrap;
        flex: 1;
    }

    .categoryTabs button {
        /*background-color: var(--secondary-color);*/
        border: 2px var(--border-color) solid;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        flex: 0 1 calc(16.66667%);
        flex-grow: 1;
        order: 1;
        padding: 1rem 0.6rem 1rem 0.6rem;
        outline: none;
    }
    .catInact{
        background-color: var(--secondary-color);
    }
    .catAct {
        background-color: var(--secondary-dark-color);
    }
    /*.categoryTabs button:focus {
        background-color: var(--secondary-dark-color);
        color: var(--secondary-text-color);
    }*/

    .categoryTabs button:hover {
        background-color: var(--secondary-dark-color);
        color: var(--secondary-text-color);
    }

    /*LIST OF INGREDIENTS*/

    .ingredient {
        background-color: var(--primary-light-color);
        border: 3px var(--primary-dark-color) solid;
        border-radius: 10px;
        color: var(--primary-text-color);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .ingredient :hover {
        /*background-color: #e9dccb;  Vid test på andra var det inte klart att man inte kunde trycka på hela sectionen något som kan göras    */
    }
    .ingredient :focus {
        background-color: #d1c4b2;
    }

    .itemsWrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
        grid-gap: 0.5rem;
        text-transform: capitalize;
    }

    .itemsContainer {
        grid-area: content;
        background-color: var(--primary-color);
        border: 3px var(--border-color) solid;
        padding: 0.25rem;
        border-radius: 10px;
        height: 30em;
        overflow: scroll;
    }

    .nextButton {
        float: right;
        right: 1em;
        bottom: 1em;
        border-radius: 50%;
        background-color: #4ce966;
        color: white;
        font-size: 1.5em;
        outline: none;
        box-shadow: 	0 0 0 2px #000,
        0 0 0 2px #999,
        0 0 0 6px white,
        0 0 0 7px black,
        0 0 0 2px black,
        0 0 0 3px black,
        0 2px 2px 2px rgba(0,0,0,0.5);;
    }
    .prevButton {
        float: left;
        border-radius: 50%;
        background-color: #d1523b;
        color: white;
        font-size: 1.5em;
        outline: none;
        box-shadow: 	0 0 0 2px #000,
        0 0 0 2px #999,
        0 0 0 6px white,
        0 0 0 7px black,
        0 0 0 2px black,
        0 0 0 3px black,
        0 2px 2px 2px rgba(0,0,0,0.5);;
    }
    /*ORDER*/

    .orderContainer {
        grid-area: order;
        width: 100%;
        height: 100%;
    }

    /*.orderWrapper {*/
    /*    display: flex;*/
    /*    align-items: center;*/
    /*    flex-direction: column;*/
    /*    background-color: var(--primary-color);*/
    /*    border: 3px var(--border-color) solid;*/
    /*    border-radius: 10px;*/
    /*}*/

    .orderWrapper {
        display: grid;
        padding: 0.25rem;
        grid-gap: 0.25rem;
        grid-template-areas: "orderHeader orderHeader" "orderSelected allergies" "orderSummary allergies";
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto;
        background-color: var(--primary-color);
        border: 3px var(--border-color) solid;
        border-radius: 10px;
    }

    .orderHeader {
        grid-area: orderHeader;
        background-color: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 10px;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        font-size: 2rem;
        padding: 0.25rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .orderSelectedWrapper {
        grid-area: orderSelected;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 5px;
        padding: 0.25rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .orderSummaryContainer {
        grid-area: orderSummary;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 5px;
        padding: 0.25rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .orderSummaryContainer b {
        border-bottom: black solid 3px;
    }

    .orderSummaryContainer span {
        color: black;
    }

    .readyBurger {
        border: black solid 3px;
        border-radius: 10px;
        padding: 0.2rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        background-color: var(--primary-light-color);
    }

    .delBurg {
        border-radius: 50%;
        background-image: linear-gradient(to bottom right, #a10000, #ff2e2e);
        background-color: red;
        border: solid black 1px;
    }

    .minusButton {
        order: 1;
        background-color: rgba(255, 28, 31, 0.36);
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        border-radius: 50%;
        font-size: 1.5em;
    }

    .plusButton {
        order: 1;
        background-color: rgba(124, 255, 96, 0.36);
        border-radius: 50%;
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        font-size: 1.5em;
    }

    .orderButton {
        border: 3px var(--border-color) solid;
        background-color: var(--secondary-light-color);
        border-radius: 15px;
        text-transform: uppercase;
        text-align: center;
        font-style: oblique;
        font-weight: bold;
    }

    /*ALLERGY BOX*/

    .allergyContainer {
        grid-area: allergies;

    }

    .allergyBox {
        background-color: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .allergyBox p {
        display: inline-block;
        border: black solid 1px;
        color: black;
        margin-left: 2px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 50%;
    }

    .vegan {
        background-color: rgba(55, 255, 57, 0.47);
    }

    .lactose {
        background-color: rgba(51, 233, 255, 0.36);
    }

    .gluten {
        background-color: rgba(251, 255, 50, 0.36);
    }

</style>
