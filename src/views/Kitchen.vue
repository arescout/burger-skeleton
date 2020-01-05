<template>
    <div id="orders">
        <div class="menuTabs">
            <button class="buttonRight" v-on:click="setSection(1)">{{uiLabels.ordersInQueue}}</button>
            <button class="buttonRight" v-on:click="setSection(2)">{{uiLabels.ordersFinished}}</button>
            <button class="buttonIngr" v-on:click="setSection(3)">{{uiLabels.ingredients }}</button>
            <button class="buttonLeft" v-on:click="switchLang()">{{uiLabels.language}}</button>
            <button v-show="currentSection === 2" v-on:click="clearOrders">Clear</button>
        </div>
        <ul class="orderContainer wrap">
            <OrderItemToPrepare
                    li class="orderItem"
                    v-for="(order, key) in orders"
                    v-if="order.status !== 'done' && order.status !== 'canceled' && order.status !== 'hide' && currentSection===1"
                    v-on:done="markDone(key)"
                    v-on:cancel="cancelOrder(key)"
                    :orderId="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItemToPrepare>
            <OrderItem
                    li class="orderItem"
                    v-for="(order, key) in orders"
                    v-if="order.status === 'done' && currentSection===2"
                    :order-id="key"
                    :order="order"
                    :lang="lang"
                    :ui-labels="uiLabels"
                    :key="key">
            </OrderItem>
        </ul>
        <!-- SECTION FOR SHOWING AND ADDING INGREDIENTS -->
        <div v-if="currentSection===3">
            {{uiLabels.updateInstr}}
            <input type="number" v-model.number="change" placeholder="0">
            <div
                    v-for="(item,key) in ingredients"
                    :key="key">
                {{item.ingredient_id}}: {{item["ingredient_" + lang]}} -> {{uiLabels.inStock}} -- {{item.stock}}
                {{uiLabels.unit}} ~~
                <button v-on:click="changeStock(item)">{{uiLabels.update}}</button>
            </div>
        </div>
        <div v-show="currentSection===3">
            <input type="text" v-model="newIngredient.ingredient_sv" :placeholder="uiLabels.seName">
            <input type="text" v-model="newIngredient.ingredient_en" :placeholder="uiLabels.enName">
            <select v-model.number="newIngredient.category">
                <option disabled value="">Category</option>
                <option value=1>{{uiLabels.protein}}</option>
                <option value="2">{{uiLabels.toppings}}</option>
                <option value="3">{{uiLabels.sauce}}</option>
                <option value="4">{{uiLabels.bread}}</option>
                <option value="5">{{uiLabels.sides}}</option>
                <option value="6">{{uiLabels.drinks}}</option>
                <option value="7">{{uiLabels.dip}}</option>
            </select>
            <select v-model.number="newIngredient.milk_free">
                <option value="1">{{uiLabels.noLactose}}</option>
                <option value="0">{{uiLabels.lactose}}</option>
            </select>
            <select v-model.number="newIngredient.gluten_free">
                <option value="1">{{uiLabels.noGluten}}</option>
                <option value="0">{{uiLabels.gluten}}</option>
            </select>
            <select v-model.number="newIngredient.vegan">
                <option value="1">{{uiLabels.vegan}}</option>
                <option value="0">{{uiLabels.noVegan}}</option>
            </select>
            <input type="number" v-model.number="newIngredient.selling_price" placeholder="Selling price">
            <option value="0">{{uiLabels.noVegan}}</option>
            <input type="number" v-model.number="newIngredient.selling_price" :placeholder="uiLabels.sellingPrice">
            <input type="number" v-model.number="initSaldo" :placeholder="uiLabels.initSaldo">
            <button v-on:click="addNewIngredient">{{uiLabels.addIngr}}</button>
        </div>
    </div>
</template>
<script>
    import OrderItem from '@/components/OrderItem.vue'
    import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
    import sharedVueStuff from '@/mixins/sharedVueStuff.js'
    import UtilityFunctions from '@/mixins/UtilityFunctions'

    export default {
        name: 'Kitchen',
        components: {
            OrderItem,
            OrderItemToPrepare
        },

        mixins: [sharedVueStuff, UtilityFunctions], // include stuff that is used in both
        //the ordering system and the kitchen
        data: function () {
            return {
                currentSection: 1,
                price: 0,
                change: 0,
                newIngredient: {
                    ingredient_id: 1,
                    ingredient_sv: "",
                    ingredient_en: "",
                    category: 1,
                    milk_free: 0,
                    gluten_free: 0,
                    vegan: 0,
                    selling_price: 0,
                    stock: 0,
                },
                initSaldo: 0
            }
        },

        computed: {
            // Function for receiving order from checkout and adding to placedOrder via server
            placedOrders: function () {
                let po = {};
                for (let item in this.orders) {
                    po[item] = this.orders[item];
                }
                return po;
            },
        },
        methods: {
            markDone: function (orderid) {
                if (this.orders[orderid].status === 'not-started') {
                    this.$store.state.socket.emit("orderStarted", orderid);
                } else if (this.orders[orderid].status === 'started') {
                    this.$store.state.socket.emit("orderDone", orderid);
                }
            },
            cancelOrder: function (orderid) {
                this.$store.state.socket.emit("cancelOrder", this.orders[orderid], orderid);
            },
            setSection: function (newSec) {
                this.currentSection = newSec;
            },
            clearOrders: function () {
                for (let item in this.orders) {
                    if (this.orders[item].status === 'done') {
                        this.$store.state.socket.emit("clearOrder", item);
                    }
                }
            },
            changeStock: function (item) {
                this.$store.state.socket.emit("updateStock", {ingredient: item}, this.change);
                this.change = 0;
            },
            addNewIngredient: function () {
                this.newIngredient.ingredient_id = this.ingredients.length + 1;
                this.$store.state.socket.emit("addIngredient", this.newIngredient);
                this.newIngredient.ingredient_id = this.ingredients.length + 1;
                this.newIngredient.ingredient_id= this.ingredients.length +1;
                this.$store.state.socket.emit("addIngredient", this.newIngredient, this.initSaldo); // Add ingredient to stock
                let ingrId = this.newIngredient.ingredient_id - 2;
            }
        }
    }
</script>
<style scoped>
    /*GENERAL*/
    #orders {
        font-size: 24pt;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }

    /*MAIN MENU*/
    .menuTabs {
        background: #2860c3;
        display: flex;
        flex-flow: row wrap;
        width: 100%;
    }

    .menuTabs button {
        background: transparent;
        border: 0;
        text-align: center;
        text-transform: uppercase;
        font-weight: normal;
        font-size: 0.5em;
        color: white;
        order: 1;
        padding: 1em 0.6em 1em 0.6em;
        outline: none;
    }

    .menuTabs button:hover {
        background-color: #347cff;
    }

    .buttonRight {
        justify-content: flex-start;
    }

    .buttonLeft {
        justify-content: flex-end;
        margin-left: auto;
    }

    /*MOBILE VIEW*/

    @media only screen and (max-width: 768px) {
        .menuTabs {
            background: #2860c3;
            display: flex;
            flex-flow: column wrap;
            width: 100%;
        }

        .buttonLeft {
            justify-content: flex-start;
            margin-left: 0;
        }
    }

    /*ORDER SECTION*/
    .wrap {
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .orderContainer {
        padding: 5px;
        margin: 0;
        list-style: none;
        -ms-box-orient: horizontal;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -moz-flex;
        display: -webkit-flex;
        display: flex;
    }

    .orderItem {
        border: solid lightgrey 1px;
        background: whitesmoke;
        margin: 0.5rem;
        width: 10em;
        height: 100%;
        box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>
