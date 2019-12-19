<template>
    <div id="checkout">
        <div class="itemsWrapper">
            <div class="buttonItem">
                <button class="backButton">
                    <router-link to="/ordering" class="routerButton">{{uiLabels.backToOrd}}</router-link>
                </button>
            </div>
            <div class="orderItem">
                <div class="checkOutTable">
                    <h1>Your total order: </h1>
                    <div class="finalOrder">
                        <div v-for="(burger, key) in order.order" :key="key">
                            Hej
                            <br>
                            <b>{{uiLabels.burgNr}} {{key + 1}}</b>
                            <!-- Key + 1 so it doesn't say "burger 0" on customers page -->
                            <span v-for="(item, key2) in burger.ingredients" :key="key2">
                            <br/>{{ item["ingredient_" + lang]}}: {{ item["count"] }} {{uiLabels.unit}}
                            </span>
                        </div>
                    <br><br>
                    <b>{{uiLabels.tally}}: {{Ordering.data.totalPrice}}</b>:-<br>
                    <button class="paymentButton" v-on:click="confirmedPayment = true">Ready for payment</button>
                    <div class="paymentBox" v-show="confirmedPayment">
                        <button class="xButton" v-on:click="confirmedPayment=false">X</button>
                        Follow instructions in the card terminal...
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
    import sharedVueStuff from '@/components/sharedVueStuff.js'

    export default {
        name: "Checkout",
        components: {
            Ingredient,
            OrderItem,
            Ordering
        },

        mixins: [sharedVueStuff],

        data: function () { //Not that data is a function!
            return {
                confirmedPayment: false,
                order: {},
                price: 0,
                orderNumber: "",

            }
        },

        created: function() {

            // Method for recieving order from Ordering page
            this.$store.state.socket.on('order', function (order) {
                console.log(order);
                    this.order = order.order;
                    this.price = order.price;
            }.bind(this));
        },


        methods: {
            alertFunction: function () {
                alert("Follow the instructions in the card terminal")
            },


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

    .itemsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: stretch;
        width: 100%;
        height: 100%;
    }

    .buttonItem {
        flex-basis: 20%;
        padding: 0.5rem;
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

    .backButton {
        /*margin-left: 5em;*/
        /*margin-top: 5em;*/
        background-color: rgba(255, 199, 74, 0.36);
        border-radius: 10px;
        border: solid black 3px;
        font-size: 1rem;
        text-transform: uppercase;
        font-style: oblique;
        font-weight: bold;
    }

    .paymentButton {
        /*margin-top: 10em;*/
        text-align: center;
        border-radius: 10px;
        background-color: #ffc74a;
        border: solid black 3px;
        text-transform: uppercase;
        font-style: oblique;
        font-weight: bold;
        margin: 0.25rem;
    }

    .checkOutTable {
        background-color: bisque;
        text-align: center;
        border: solid black 5px;
        /*margin-left: 20em;*/
        /*margin-right: 20em;*/
        /*padding-bottom: 5em;*/
    }

    .routerButton {
        text-decoration: none;
        color: black;
    }

    .finalOrder {
        border: black solid 3px;
    }

    .paymentBox {
        background-color: #efff9a;
        border: solid black 3px;
        /*margin-right: 5vw;*/
        /*margin-left: 5vw;*/
        /*padding: 5vw;*/
        /*position: relative;*/
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .paymentBox button {
        background-color: #ff0000;
        border-radius: 50%;
        border: solid black 2px;
        position: absolute;
        /*top: 0px;*/
        /*right: 0px;*/
    }
</style>