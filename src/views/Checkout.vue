<template>
    <div class="checkout">
        <button><router-link to="/ordering" class="routerButton">{{uiLabels.backToOrd}}</router-link></button>
        <div>
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
        background-color: #ffc74a;
    }
    .routerButton {
        text-decoration: none;
        color: black;
    }
</style>