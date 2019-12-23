<template>
    <div id="orders">
        <div class="menuTabs">
            <button class="buttonRight" v-on:click="setSection(1)">{{uiLabels.ordersInQueue}}</button>
            <button class="buttonRight" v-on:click="setSection(2)">{{uiLabels.ordersFinished}}</button>
            <button class="buttonLeft" v-on:click="switchLang()">{{uiLabels.language}}</button>
        </div>
        <ul class="ordersContainer wrap">
            <OrderItemToPrepare
                    li class="ordersItem"
                    v-for="(order, key) in this.placedOrders"
                    v-if="order.status !== 'done' && currentSection===1"
                    v-on:done="markDone(key)"
                    :orderId="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItemToPrepare>
            <OrderItem
                    li class="ordersItem"
                    v-for="(order, key) in placedOrders"
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
                placedOrders: {},
                currentSection: 1,
                price: 0
            }
        },

        created: function () {
            // Function for recieving order from checkout and adding to placedOrder via server
            this.$store.state.socket.on('currentQueue', function (order) {
                for(let item  in order.orders){
                    this.placedOrders[order.orders[item].orderId] = order.orders[item];
                    console.log("Newest placedOrders")
                    console.log(this.placedOrders)
                }
            }.bind(this));
        },

        methods: {
            markDone: function (orderid) {
                orderid += 1; // Orderid +1 because server starts counting orders on 1, kitchen starts on 0
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

    .buttonRight {
        justify-content: flex-start;
    }

    .buttonLeft {
        justify-content: flex-end;
        margin-left: auto;
    }

    /*ORDER SECTION*/
    .wrap {
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .ordersContainer {
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

    .ordersItem {
        border: solid black 3px;
        border-radius: 3px;
        padding: 0.5em;
        margin: 5px;
        width: 10em;
        height: 100%;
    }

    /*GENERAL*/
    #orders {
        font-size: 24pt;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }
</style>
