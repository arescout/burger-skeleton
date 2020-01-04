<template>
    <div>
        <div class="head">
            <h3>{{uiLabels.orderNr}}: #{{orderId}}</h3><br>
            @ <b>13:37</b>, {{order.status}} <span v-show="order.eatHere">{{uiLabels.eatHere}}</span> <span v-show="!order.eatHere"> {{uiLabels.eatAway}} </span>
        </div>
        <div class="body" v-for="(burger,key2) in order.burgers" :key2="key2">
            <b>{{uiLabels.burgNr}}: #{{key2 + 1}}</b>
            <span v-for="ingredient in burger">
              <br/> {{ingredient.count}}<b>x</b> {{ingredient.ing["ingredient_" + lang]}}
            </span>
        </div>
        <div class="buttonWrapper">
            <button class="update" v-on:click="orderDone">
                {{uiLabels.update}}
            </button>
            <button class="cancel" v-on:click="cancelOrder">
                {{uiLabels.cancel}}
            </button>
        </div>
    </div>
</template>
<script>
    import OrderItem from '@/components/OrderItem.vue'

    export default {
        name: 'OrderItemToPrepare',
        components: {OrderItem},
        props: {
            uiLabels: Object,
            order: Object,
            orderId: String,
            lang: String
        },
        methods: {
            orderDone: function () {
    // sending 'done' message to parent component or view so that it can catch it with v-on:done in the component declaration
                this.$emit('done');
            },
            cancelOrder: function () {
                this.$emit('cancel');
            }
        }
    }
</script>
<style scoped>
    h3 {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
    }

    .head {
        padding: 1rem;
        background-color: mediumseagreen;
        font-size: 1.5rem;
    }

    .body {
        padding: 1rem;
        font-size: 2rem;
    }

    .buttonWrapper {
        display: flex;
        flex-flow: row nowrap;
        /*align-items: stretch;*/
        width: 100%;
    }

    .update {
        background: #2860c3;
        text-align: center;
        text-decoration: none;
        border: 0;
        color: white;
        padding: 1rem;
        font-size: 2rem;
        margin: auto;
        width: 100%;
    }

    .cancel {
        background: red;
        text-align: center;
        text-decoration: none;
        border: 0;
        color: white;
        padding: 1rem;
        font-size: 2rem;
        margin: auto;
        width: 100%;
    }
</style>