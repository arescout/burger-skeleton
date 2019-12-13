<template>
    <div class="checkout">
        <button class = "backButton"><router-link to="/ordering" class="routerButton">{{uiLabels.backToOrd}}</router-link></button>
        <div class = "checkOutTable">
            <h1>Your total order: </h1>
            <div class = "finalOrder">
            <OrderItem
                    v-for="(order, key) in this.orders"
                    v-if="order.status !== 'done'"
                    :order-id="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItem>
            </div><br><br>
            {{uiLabels.tally}}: {{this.price}} kr<br>
            <!--<button class ="paymentButton" v-on:click = "alertFunction()">Ready for payment</button>-->
            <button class ="paymentButton" v-on:click = "confirmedPayment = true">Ready for payment</button>
            <div class = "paymentBox" v-show="confirmedPayment">
                <button class = "xButton" v-on:click="confirmedPayment=false" >X</button>
                Follow instructions in the card terminal...</div>
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
                chosenIngredients: [],
                price: 0,
                orderNumber: "",
                count: 0,
                currentCategory: 1, // Category deciding what ingredients to show
            }
        },
        methods: {
            alertFunction: function() {
                alert("Follow the instructions in the card terminal")
            }
        }
    };


</script>

<style scoped>
    .checkout {
        background-color: beige;
        background-size: cover;
    }
    .backButton {
        margin-left: 5em;
        margin-top: 5em;
        background-color: rgba(255,199,74,0.36);
        border-radius: 10px;
        border:solid black 3px;
        font-family: Helvetica;
        font-size: 1em;
    }
    .paymentButton {
        margin-top: 10em;
        text-align: center;
        border-radius: 10px;
        background-color: #ffc74a;
        border: solid black 3px;
    }
    .checkOutTable {
        background-color: bisque;
        text-align: center;
        border: solid black 5px;
        margin-left: 20em;
        margin-right: 20em;
        padding-bottom: 5em;

    }
    .routerButton {
        text-decoration: none;
        color: black;
    }
    .finalOrder {
        border:black solid 3px;
    }
    .paymentBox {
        background-color: #efff9a;
        border: solid black 3px;
        margin-right: 5vw;
        margin-left: 5vw;
        padding: 5vw;
        position: relative;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .paymentBox button {
        background-color: #ff0000;
        border-radius: 50%;
        border: solid black 2px;

        position:absolute;
        top: 0px;
        right: 0px;
    }
</style>