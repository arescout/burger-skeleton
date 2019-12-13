<template>
    <div class="checkout">
        <button class = "backButton"><router-link to="/ordering" class="routerButton">{{uiLabels.backToOrd}}</router-link></button>
        <div class = "checkOutTable">
            <h1>Your total order: </h1>
            <OrderItem
                    v-for="(order, key) in this.orders"
                    v-if="order.status !== 'done'"
                    :order-id="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItem>
            <button class ="paymentButton">Ready for payment</button>
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

        mixins: [sharedVueStuff],

        data: function () { //Not that data is a function!
            return {
                chosenIngredients: [],
                price: 0,
                orderNumber: "",
                count: 0,
                currentCategory: 1, // Category deciding what ingredients to show
            }
        }
    };


</script>

<style scoped>
    .checkout {
        background-color: beige;
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
</style>