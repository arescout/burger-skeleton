<template id="template">
    <div id="ordering">
        <div class="wrapper">
            <div class="header">
                <button class="headerButton" v-on:click="exitClear">
                    <router-link to="/">{{uiLabels.startpage}}</router-link>
                </button>
                <div class="headerLabel">
                    {{uiLabels.companyName}}
                </div>
                <button class="headerButton" v-on:click="switchLang()">
                    <img src v-if='flag_en' src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-round-250.png" width="30px" height="20px">
                    <img src v-if='flag_sv' src="https://cdn.countryflags.com/thumbs/sweden/flag-button-round-250.png" width="30px" height="20px">{{uiLabels.language}}

                </button>
            </div>
            <div class="categoryTabs">
                <button v-on:click="setCategory(4)"
                        v-bind:class="[this.currentCategory === 4 ? 'catAct' : 'catInact']">{{uiLabels.bread}}
                </button>
                <button v-on:click="setCategory(1)"
                        v-bind:class="[this.currentCategory === 1 ? 'catAct' : 'catInact']">{{uiLabels.protein}}
                </button>
                <button v-on:click="setCategory(2)"
                        v-bind:class="[this.currentCategory === 2 ? 'catAct' : 'catInact']">{{uiLabels.toppings}}
                </button>
                <button v-on:click="setCategory(3)"
                        v-bind:class="[this.currentCategory === 3 ? 'catAct' : 'catInact']">{{uiLabels.sauce}}
                </button>
                <button v-on:click="setCategory(5)"
                        v-bind:class="[this.currentCategory === 5 ? 'catAct' : 'catInact']">{{uiLabels.sides}}
                </button>
                <button v-on:click="setCategory(6)"
                        v-bind:class="[this.currentCategory === 6 ? 'catAct' : 'catInact']">{{uiLabels.drinks}}
                </button>
                <button v-on:click="setCategory(7)"
                        v-bind:class="[this.currentCategory === 7 ? 'catAct' : 'catInact']">{{uiLabels.dip}}
                </button>
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
                <button class="prevButton" v-show="currentCategory !== 4" v-on:click="prevTab(currentCategory)">
                    &#9668;
                </button>
                <button class="nextButton" v-show="currentCategory < 7" v-on:click="nextTab(currentCategory)">&#9658;
                </button>
            </div>

            <!-- Order information -->
            <div class="orderContainer">
                <div class="orderWrapper">
                    <div class="orderHeader">
                        {{ uiLabels.order }}
                    </div>
                    <div class="orderSelectedContainer">
                        <div>
                            <div v-for="item in this.groupIngredients(chosenIngredients)">
                                {{item.count}} x {{item.ing['ingredient_' + lang]}} {{item.stock}}
                                <button class="plusButton"
                                        v-show="(item.ing.category == 4 && breadChosen==false) || (item.ing.category ==1 && doublePatty==false) || item.ing.category ==2 || item.ing.category ==3 || item.ing.category ==5 || item.ing.category ==6 || item.ing.category ==7 "
                                        v-on:click="addToBurger(item.ing)">+
                                </button>
                                <button class="minusButton" v-on:click="removeFromBurger(item.ing)">-</button>
                            </div>
                            <b>{{uiLabels.currentPriceLabel}}: {{this.currentPrice}}:-</b>
                        </div>
                        <button class="orderButton" v-show="orderReady" v-on:click="placeOrder">
                            {{ uiLabels.newBurger }}
                        </button>
                    </div>
                    <div class="orderSummaryContainer">
                        <div>
                            <button class="eatButton" v-on:click="changeEatHere()" v-if="this.eatHere">
                                {{uiLabels.eatHere}}
                            </button>
                            <button class="eatButton" v-on:click="changeEatHere()" v-if="!this.eatHere">
                                {{uiLabels.eatAway}}
                            </button>
                        </div>
                        <div>
                            <b>{{uiLabels.yourOrder}}:</b>
                        </div>
                        <div>
                            <div class="readyBurger" v-for="(burger, key) in checkoutOrder.burgers" :key="key">
                                <button v-on:click="hideBurger(key)">^</button>
                                <b>{{uiLabels.burgNr}} {{key + 1}}</b>
                                <!-- Key + 1 so it doesn't say "burger 0" on customers page -->
                                <button class="deleteBurger" v-on:click="deleteBurger(checkoutOrder.burgers, key)">X
                                </button>
                                <span v-show="!hideBurg" v-for="(item, key2) in burger" :key="key2">
                                <br/>{{ item.ing["ingredient_" + lang]}}: {{ item.count }} {{uiLabels.unit}}
                            </span>
                            </div>
                            <div class="orderSummaryPrice">
                                {{uiLabels.tally}}: {{totalPrice}}:-
                            </div>
                        </div>
                        <button class="orderButton" v-show="!this.noOrder">
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
                <div class="orderHelpContainer">
                    <div class="orderHelpHeadline">
                        {{uiLabels.howToHeadline}}
                    </div>
                    <div>
                        <b>{{uiLabels.howToStep}} 1.</b>
                    </div>
                    <div>
                        {{uiLabels.howToStepOne}}
                    </div>
                    <div>
                        <b>{{uiLabels.howToStep}} 2.</b>
                    </div>
                    <div>
                        {{uiLabels.howToStepTwo}}
                    </div>
                    <div>
                        <b>{{uiLabels.howToStep}} 3.</b>
                    </div>
                    <div>
                        {{uiLabels.howToStepThree}}
                    </div>
                    <div>
                        <b>{{uiLabels.howToStep}} 4.</b>
                    </div>
                    <div>
                        {{uiLabels.howToStepFour}}
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
        mixins: [sharedVueStuff, UtilityFunctions], // Include stuff that is used in both the ordering system and the kitchen
        data: function () {
            return {
                chosenIngredients: [],
                currentPrice: 0,
                orderNumber: "",
                count: 0,
                breadChosen: false,     //These are restrictions of what you can order
                pattyChosen: false,
                doublePatty: false,
                sideChosen: false,
                drinkChosen: false,
                noShow: false,
                hideBurg: false,
                patties: 0,
                currentCategory: 4, // Category deciding what ingredients to show first
                activeCat: 0,
                isActive: false,
                numbOfBurgers: 0,
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
                if (this.pattyChosen == this.breadChosen && this.sideChosen) {  //order can only be made if burger and bread or drink or side is chosen
                    return true;
                }
                if (this.pattyChosen == this.breadChosen && this.drinkChosen) {
                    return true;
                }
                if (this.pattyChosen && this.breadChosen) {
                    return true;
                }

            },
            noOrder: function () {
                if (this.totalPrice === 0) {
                    return true;
                }
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
                if (this.patties == 2) {
                    this.doublePatty = true;
                }
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
                    if (this.patties < 2) {
                        this.doublePatty = false;
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

            placeOrder: function () {
                // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
                let thisBurger = this.groupIngredients(this.chosenIngredients);
                thisBurger.price = this.currentPrice;
                thisBurger.eatHereBurg = this.eatHere;
                this.$store.commit('addToCheckoutOrder', thisBurger);
                this.$store.commit('addToTotal', this.currentPrice);
                // Reset all relevant data
                this.chosenIngredients = [];
                this.currentPrice = 0;
                this.breadChosen = false;
                this.pattyChosen = false;
                this.drinkChosen = false;
                this.sideChosen = false;
                this.patties = 0;
                this.sideChosen = false;
                this.drinkChosen = false;
                this.doublePatty = false;
                this.category = 1;
            },
            nextTab: function (cat) {
                if (cat < 3 || 6 > cat > 4) {
                    let newCat = cat + 1;
                    this.setCategory(newCat);
                } else if (cat === 5) {
                    let newCat = 6;
                    this.setCategory(newCat);
                } else if (cat === 4) {
                    let newCat = 1;
                    this.setCategory(newCat);
                } else if (cat === 3) {
                    let newCat = cat + 2;
                    this.setCategory(newCat);
                } else if (cat === 6) {
                    let newCat = 7;
                    this.setCategory(newCat);
                }
            },
            prevTab: function (cat) {
                if (cat === 1) {
                    let newCat = 4;
                    this.setCategory(newCat);
                } else if (1 < cat < 3 || 6 > cat > 4) {
                    let newCat = cat - 1;
                    this.setCategory(newCat);
                }
            },
            // Function for changing category. Called on at buttons in Ingredient
            setCategory: function (newCat) {
                this.currentCategory = newCat;
            },
            hideBurger: function (key) {
                this.hideBurg = !this.hideBurg;
            },

            deleteBurger: function (burgers, key) { //this function deletes the burger from the order container
                for (let i = 0; i < burgers.length; i++) {
                    if (i === key) {
                        let thisPrice = burgers[i].price;
                        this.$store.commit('removeFromCheckoutOrder', key);
                        this.$store.commit('removeFromTotal', thisPrice)
                    }
                }
            },
            exitClear: function () {
                this.$store.commit('clearCheckoutOrder');
                this.$store.commit('clearTotal');
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
        --minus-button-color: rgba(255, 28, 31, 0.36);
        --plus-button-color: rgba(124, 255, 96, 0.36);
        --delete-button-color: red;
    }

    /*GENERAL*/

    html {
        scroll-behavior: smooth;
    }

    button {
        outline: none;
    }

    button:hover {
        cursor: pointer;
    }

    #ordering {
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
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
        color: var(--primary-text-color);
    }

    /*MAIN*/

    .wrapper {
        display: grid;
        margin: 0.25rem;
        grid-template-areas: "header header" "nav order" "content order";
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
        border-radius: 0.5rem;
        text-align: center;
        text-transform: uppercase;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        font-size: 2rem;
    }

    .headerButton {
        text-decoration: none;
        text-transform: uppercase;
        color: var(--primary-text-color);
        background-color: var(--secondary-color);
        font-size: 1rem;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }

    .headerLabel {
        font-weight: bold;
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
        border: 2px var(--border-color) solid;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        flex: 0 1 calc(16.66666666667%);
        flex-grow: 1;
        order: 1;
        padding: 1rem 0.6rem 1rem 0.6rem;
        outline: none;
    }

    .catInact {
        background-color: var(--secondary-color);
    }

    .catAct {
        background-color: var(--secondary-dark-color);
    }

    .categoryTabs button:hover {
        background-color: var(--secondary-dark-color);
        color: var(--secondary-text-color);
    }

    /*LIST OF INGREDIENTS*/

    .ingredient {
        background-color: var(--primary-light-color);
        border: 3px var(--primary-dark-color) solid;
        border-radius: 0.5rem;
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
        border-radius: 0.5rem;
        height: 30rem;
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
        box-shadow: 0 0 0 2px #000,
        0 0 0 2px #999,
        0 0 0 6px white,
        0 0 0 7px black,
        0 0 0 2px black,
        0 0 0 3px black,
        0 2px 2px 2px rgba(0, 0, 0, 0.5);;
    }

    .prevButton {
        float: left;
        border-radius: 50%;
        background-color: #d1523b;
        color: white;
        font-size: 1.5em;
        outline: none;
        box-shadow: 0 0 0 2px #000,
        0 0 0 2px #999,
        0 0 0 6px white,
        0 0 0 7px black,
        0 0 0 2px black,
        0 0 0 3px black,
        0 2px 2px 2px rgba(0, 0, 0, 0.5);;
    }

    /*ORDER*/

    .orderContainer {
        grid-area: order;
        width: 100%;
        height: 100%;
    }

    .orderWrapper {
        display: grid;
        padding: 0.25rem;
        grid-gap: 0.25rem;
        grid-template-areas: "orderHeader orderHeader" "orderSelected allergies" "orderSummary allergies";
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto;
        background-color: var(--primary-color);
        border: 3px var(--border-color) solid;
        border-radius: 0.5rem;
    }

    .orderHelpContainer {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 0.25rem;
        padding: 0.25rem;
        background-color: var(--primary-color);
        border: 3px var(--border-color) solid;
        border-radius: 0.5rem;
        text-align: center;
    }

    .orderHelpHeadline {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .orderHeader {
        grid-area: orderHeader;
        background-color: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 0.5rem;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        font-size: 2rem;
        padding: 0.25rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .orderSelectedContainer {
        grid-area: orderSelected;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 0.5rem;
        padding: 0.25rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .eatButton {
        border: 3px var(--border-color) solid;
        background-color: var(--secondary-color);
        border-radius: 0.75rem;
        text-transform: uppercase;
        text-align: center;
        font-style: oblique;
        font-weight: bold;
        padding: 0.25rem 0.5rem;
    }

    .orderSummaryContainer {
        grid-area: orderSummary;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        background: var(--primary-light-color);
        border: 3px var(--border-color) solid;
        border-radius: 0.5rem;
        padding: 0.25rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .orderSummaryContainer b {
        border-bottom: 3px var(--border-color) solid;
    }

    .orderSummaryContainer span {
        color: var(--primary-text-color);
    }

    .orderSummaryPrice {
        font-weight: bold;
        margin: 0.25rem;
        text-align: center;
    }

    .readyBurger {
        text-align: center;
        border: 3px var(--border-color) solid;
        border-radius: 0.5rem;
        padding: 0.2rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        background-color: var(--primary-light-color);
    }

    .deleteBurger {
        border-radius: 50%;
        background-image: linear-gradient(to bottom right, #a10000, #ff2e2e);
        background-color: var(--delete-button-color);
        border: 1px var(--border-color) solid;
    }

    .minusButton {
        order: 1;
        background-color: var(--minus-button-color);
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        border-radius: 50%;
        font-size: 1.5em;
    }

    .plusButton {
        order: 1;
        background-color: var(--plus-button-color);
        border-radius: 50%;
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        font-size: 1.5em;
    }

    .orderButton {
        border: 3px var(--border-color) solid;
        background-color: var(--secondary-light-color);
        border-radius: 0.75rem;
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
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .allergyBox p {
        display: inline-block;
        border: 1px var(--border-color) solid;
        color: var(--primary-text-color);
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
