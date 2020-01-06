<template>
    <div id="checkout">
        <div class="itemsWrapper">
            <div class="languageItem">
                <button class="languageButton" v-on:click="switchLang()">
                    {{uiLabels.language }}
                </button>
            </div>
            <div class="buttonItem">
                <button class="backButton">
                    <router-link to="/ordering" class="routerButton">{{uiLabels.backToOrd}}</router-link>
                </button>
                <button class="backButton" v-on:click="exitClear">
                    <router-link to="/">{{uiLabels.startpage}}</router-link>
                </button>
            </div>
            <div class="orderItem">
                <div class="checkOutTable">
                    <h1 v-show="!confirmedPayment">{{uiLabels.yourOrder}} </h1>
                    <h1 v-show="confirmedPayment">{{uiLabels.yourOrdNr}} {{orderNumber}}</h1>
                    <h2 v-show="confirmedPayment">{{uiLabels.yourPlace}} {{placeInQueue}}</h2>
                    <div class="finalOrder">
                        <div v-for="(burger, key) in checkoutOrder.burgers" :key="key">
                            <b>{{uiLabels.burgNr}} {{key + 1}}</b>
                            <!-- Key + 1 so it doesn't say "burger 0" on customers page -->
                            <span v-for="(item, key2) in burger" :key="key2">
                                <br/>{{ item.ing["ingredient_" + lang]}}: {{ item.count }} {{uiLabels.unit}} {{item.stock}}
                            </span>
                        </div>
                        <br><br>
                        <b>{{uiLabels.tally}}: {{this.totalPrice}}</b>:-<br>
                        <button class="paymentButton"
                                v-on:click="placeOrder">{{uiLabels.payButton}}
                        </button>
                        <div class="paymentBox" v-show="confirmedPayment">
                            <button class="xButton" v-on:click="confirmedPayment=false">X</button>
                            {{uiLabels.cardTerminal}}
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
    import Ordering from '@/views/Ordering.vue'
    import sharedVueStuff from '@/mixins/sharedVueStuff.js'

    export default {
        name: "Checkout",
        components: {
            Ingredient,
            OrderItem,
            Ordering
        },

        mixins: [sharedVueStuff],

        data: function () {
            return {
                confirmedPayment: false,
                orderNumber: "",
                placeInQueue: 0
            }
        },

        computed: {
            checkoutOrder: function () {
                return this.$store.state.checkoutOrder;
            },
            totalPrice: function () {
                return this.$store.state.totalPrice;
            },
            eatHere: function () {
                return this.$store.state.eatHere;
            },
        },

        methods: {
            alertFunction: function () {
                alert("Follow the instructions in the card terminal")
            },

            placeOrder: function () {
                this.confirmedPayment = true;
                this.$store.state.socket.emit('order', this.checkoutOrder, this.eatHere);
                this.$store.commit('clearCheckoutOrder');
                this.$store.commit('clearTotal');
                this.orderNumber = Object.keys(this.orders).length + 1; // Get length of orders object to set order number
                                                                        // +1 because this.orders isn't updated quick enough
                this.getPlaceInQueue();
            },
            changeEatHere: function () {
                if (this.eatHere) {
                    this.$store.commit('setEatHere', false);
                } else {
                    this.$store.commit('setEatHere', true);
                }
            },
            getPlaceInQueue: function () {
                let ordersInQueue = 0;
                for (let order in this.orders) {
                    if (this.orders[order].status !== 'done' && this.orders[order].status !== 'canceled') {
                        ordersInQueue += 1;
                    }
                }
                this.placeInQueue = ordersInQueue + 1; // +1 to get customer's place, not number of orders in front
            },
            exitClear: function () {
                this.$store.commit('clearCheckoutOrder');
                this.$store.commit('clearTotal');
            }
        }
    };

</script>

<style scoped>

    /*GENERAL*/

    html {
        scroll-behavior: smooth;
    }

    #checkout {
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        background-color: beige;
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

    /*MAIN*/

    .itemsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: stretch;
        width: 100%;
        height: 100%;
    }
    button:hover{
        cursor: pointer;
    }
    .buttonItem {
        flex-basis: 10%;
        padding: 0.5rem;
        order: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
    }

    .languageItem {
        flex-basis: 10%;
        /*padding: 0.5rem;*/
        order: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
    }

    .orderItem {
        flex-basis: 100%;
        padding: 0.5rem;
        order: 1;
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
    }

    .checkOutTable {
        background-color: bisque;
        text-align: center;
        border: solid black 5px;
        width: 70%;
    }

    .finalOrder {
        border: black solid 3px;
    }

    .paymentBox {
        background-color: #efff9a;
        border: solid black 3px;
        width: 70%;
        height: 70%;
        margin: auto;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    /*BUTTONS*/

    .languageButton {
        text-decoration: none;
        text-transform: uppercase;
        color: black;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 3rem;
        border: 0.2em var(--border-color) solid;
        background-color: var(--primary-light-color);
        padding: 0.5rem 1rem;
    }

    .paymentButton {
        text-align: center;
        border-radius: 10px;
        background-color: #ffc74a;
        border: solid black 3px;
        text-transform: uppercase;
        font-style: oblique;
        font-weight: bold;
        margin: 0.25rem;
    }

    .backButton {
        background-color: rgba(255, 199, 74, 0.36);
        border-radius: 10px;
        border: solid black 3px;
        font-size: 1rem;
        text-transform: uppercase;
        font-style: oblique;
        font-weight: bold;
        text-align: center;
    }

    .paymentBox button {
        background-color: #ff0000;
        border-radius: 50%;
        border: solid black 2px;
        float: right;
    }

    .routerButton {
        text-decoration: none;
        color: black;
    }
</style>