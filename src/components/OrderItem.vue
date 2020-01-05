<template>
    <div>
        <div class="head">
            <h3>{{uiLabels.orderNr}}: #{{orderId}}</h3><br>
            @ <b>{{order.time}}</b>, {{order.status}} {{order.eatHereBurg}}
        </div>
        <div class="body" v-for="(burger,key2) in order.burgers" :key2="key2">
            <b>{{uiLabels.burgNr}}: #{{key2 + 1}}</b>
            <span v-for="ingredient in burger">
      			<br/> {{ingredient.count}}<b>x</b> {{ingredient.ing["ingredient_" + lang]}}
      		</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'OrderItem',
        props: {
            uiLabels: Object,
            order: Object,
            orderId: String,
            lang: String,
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
</style>