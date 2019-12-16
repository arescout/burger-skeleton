<template>
    <div id="orders">
        <div class="menuTabs">
            <button v-on:click="setSection(1)">Active orders</button>
            <button v-on:click="setSection(2)">Finished orders</button>
            <!--            <h3 class="activeOrders">Active orders</h3>-->
            <!--            <h3 class="finishedOrders">Finished orders</h3>-->
            <!--            <h3 class="fontSize">Change text size</h3>-->
        </div>
        <div>
            <OrderItemToPrepare
                    v-for="(order, key) in orders"
                    v-if="order.status !== 'done' && currentSection===1"
                    v-on:done="markDone(key)"
                    :order-id="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItemToPrepare>
        </div>
        <div>
            <OrderItem
                    v-for="(order, key) in orders"
                    v-if="order.status === 'done' && currentSection===2"
                    :order-id="key"
                    :order="order"
                    :lang="lang"
                    :ui-labels="uiLabels"
                    :key="key">
            </OrderItem>
        </div>
    </div>
</template>
<script>
    import OrderItem from '@/components/OrderItem.vue'
    import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

    //import methods and data that are shared between ordering and kitchen views
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

    .activeOrders {
        text-align: center;
        order: 1;
        padding: 0.6em;
    }

    .finishedOrders {
        text-align: center;
        order: 1;
        padding: 0.6em;
    }

    .fontSize {
        /*border: solid black 1px;*/
        text-align: center;
        align-self: flex-end;
        order: 1;
    }

    #orders {
        font-size: 24pt;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }

    h1 {
        text-transform: uppercase;
        font-size: 1.4em;
    }

    h3 {
        text-transform: uppercase;
        font-weight: normal;
        font-size: 0.5em;
        color: white;
    }
</style>