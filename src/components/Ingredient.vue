<template>
    <div class="ingredient">
        <div class="itemsWrapper">
            <div class="buttonItem">
                <label>
                    {{item["ingredient_"+ lang]}}
                </label>
            </div>
            <div class="buttonItem">
                <b>{{item.selling_price}}:-</b>
            </div>
            <div class="buttonItem">
                <div class="buttonWrapper">
                    <div class="buttonBox">
                        <button class="plusButton" v-on:click="incrementCounter">+</button>
                        {{ counter }}
                        <button class="minusButton" v-if="counter > 0" v-on:click="decrementCounter">-</button>
                    </div>
                    <div class="allergicBox">
                        <div class="lactose" v-if="!item.milk_free">L</div>
                        <div class="gluten" v-if="!item.gluten_free">G</div>
                        <div class="vegan" v-if="item.vegan">V</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import Ordering from '@/views/Ordering.vue'
    export default {
        name: 'Ingredient',
        components: {
            Ordering
        },
        props: {
            item: Object,
            lang: String,
        },
        data: function () {
            return {
                counter: 0
            };
        },

        created: function(){
            this.checkCounter();
        },
        methods: {
            incrementCounter: function () {
                this.counter += 1;
                // sending 'increment' message to parent component or view so that it
                // can catch it with v-on:increment in the component declaration
                this.$emit('increment');
                //this.$emit('counter', this.counter)  //nytt
            },
            decrementCounter: function () {
                this.counter -= 1;
                // Makes the same thing as incrementCounter with difference that it remove instead of adding .
                this.$emit('decrease');
            },
            resetCounter: function () {
                this.counter = 0;
            },
            checkCounter: function(){
                if(Ordering.chosenIngredients.length === 0){
                    return;
                } else {
                    for (let i = 0; i < Ordering.chosenIngredients.length; i++) {
                        if (Ordering.chosenIngreients[i].ingredient_id === ingredient_id){
                            this.counter = Ordering.chosenIngreients[i].counter;
                        }
                    }
                }
            }
        }
    }
</script>
<style scoped>

    .itemsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: stretch;
        width: 100%;
        height: 100%;
    }

    .buttonItem {
        flex-basis: 100%;
        padding: 0.5rem;
        order: 1;
    }

    /*.buttonWrapper {*/
    /*    display: grid;*/
    /*    grid-gap: 5px;*/
    /*}*/

    .buttonWrapper {
        display: flex;
        flex-direction: row;
        /*justify-content: space-evenly;*/
        /*align-content: stretch;*/
        width: 100%;
        height: 100%;
    }

    .buttonBox {
        order: 1;
    }

    .plusButton {
        order: 1;
        background-color: rgba(124, 255, 96, 0.36);
        border-radius: 50%;
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        font-size: 1.5em;
    }

    .minusButton {
        order: 1;
        background-color: rgba(255, 28, 31, 0.36);
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        border-radius: 50%;
        font-size: 1.5em;
    }

    .ingredient button:hover {
        background-color: rgba(255, 223, 26, 0.36);
        color: black;
    }

    .pMButtons {
        /*text-align: center;*/
    }

    .allergicBox {
        order: 1;
        justify-content: flex-end;
        margin-left: auto;
        align-self: center;
    }

    .lactose {
        display: inline-block;
        background-color: rgba(51, 233, 255, 0.36);
        border: black solid 1px;
        color: black;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 50%;
    }

    .gluten {
        display: inline-block;
        background-color: rgba(251, 255, 50, 0.36);
        border: black solid 1px;
        color: black;
        margin-left: 2px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 50%;
    }

    .vegan {
        display: inline-block;
        background-color: rgba(55, 255, 57, 0.47);
        border: black solid 1px;
        color: black;
        margin-left: 2px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 50%;
    }

</style>