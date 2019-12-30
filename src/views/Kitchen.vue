<template>
    <div id="orders">
        <div class="menuTabs">
            <button class="buttonRight" v-on:click="setSection(1)">{{uiLabels.ordersInQueue}}</button>
            <button class="buttonRight" v-on:click="setSection(2)">{{uiLabels.ordersFinished}}</button>
            <button class="buttonIngr" v-on:click="setSection(3)">{{uiLabels.ingredients    }}</button>
            <button class="buttonLeft" v-on:click="switchLang()">{{uiLabels.language}}</button>
            <button v-show="currentSection === 2" v-on:click="clearOrders">Clear</button>
        </div>
        <ul class="ordersContainer wrap">
            <OrderItemToPrepare
                    li class="ordersItem"
                    v-for="(order, key) in orders"
                    v-if="order.status !== 'done' && order.status !== 'hide' && currentSection===1"
                    v-on:done="markDone(key)"
                    :orderId="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItemToPrepare>{{this.timeStamp}}
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
        <div
                v-if="currentSection===3"
                v-for="(item,key) in ingredients"
                :key="key">
            {{item.ingredient_id}}: {{item["ingredient_" + lang]}} -> {{uiLabels.inStock}} -- {{item.stock}} {{uiLabels.unit}} ~~
            <input type="number" v-model="change" placeholder="0">
            <button v-on:click="changeStock(item)">Change</button>
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
                change: 0
            }
        },

        computed: {
            // Function for recieving order from checkout and adding to placedOrder via server
            placedOrders: function () {
                let po = {};
                for(let item in this.orders){
                    po[item] = this.orders[item];
                }
                return po;
            },
            timeStamp: function() {
                return this.$store.state.timeStamp;
            }
        },

        methods: {
            markDone: function (orderid) {
                this.$store.state.socket.emit("orderDone", orderid);
            },
            setSection: function (newSec) {
                this.currentSection = newSec;
            },

            clearOrders: function () {
                for (let item in this.orders){
                    if (this.orders[item].status==='done'){
                        this.$store.state.socket.emit("clearOrder", item);
                    }
                }
            },
            changeStock: function (item) {
                this.$store.state.socket.emit("updateStock", {ingredient: item}, Number(this.change));
                this.change = 0;    
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
