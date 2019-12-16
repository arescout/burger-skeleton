<template>
    <div id="orders">
        <div class="menuTabs">
            <button v-on:click="setSection(1)">{{uiLabels.ordersInQueue}}</button>
            <button v-on:click="setSection(2)">{{uiLabels.ordersFinished}}</button>
        </div>
        <ul class="ordersContainer ordersWrapped">
            <OrderItemToPrepare
                    li class="ordersItem"
                    v-for="(order, key) in orders"
                    v-if="order.status !== 'done' && currentSection===1"
                    v-on:done="markDone(key)"
                    :order-id="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItemToPrepare>
            <OrderItem
                    li class="ordersItem"
                    v-for="(order, key) in orders"
                    v-if="order.status === 'done' && currentSection===2"
                    :order-id="key"
                    :order="order"
                    :lang="lang"
                    :ui-labels="uiLabels"
                    :key="key">
            </OrderItem>
        </ul>
    </div>
</template>
<script>
    import OrderItem from '@/components/OrderItem.vue'
    import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    export default {
        name: 'Ordering',
        components: {
            OrderItem,
            OrderItemToPrepare
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  //the ordering system and the kitchen
        data: function () {
            return {
                chosenIngredients: [],
                currentSection: 1,
                price: 0
            }
        },
        methods: {
            markDone: function (orderid) {
                this.$store.state.socket.emit("orderDone", orderid);
            },
            setSection: function (newSec) {
                this.currentSection = newSec;
            }
        }
    }
</script>
<style scoped>
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
    }
    .menuTabs button:hover {
        background-color: #347cff;
    }
    /*ORDER SECTION*/
    .ordersWrapped {
        flex-wrap: wrap;
    }
    .ordersContainer {
        padding: 5px;
        margin: 0;
    }
    .ordersItem {
        border: solid black 3px;
        border-radius: 3px;
        padding: 0.5em;
        margin: 5px;
        width: 10em;
    }
    /*GENERAL*/
    #orders {
        font-size: 24pt;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }
</style>
