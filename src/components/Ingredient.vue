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
                        <!--<div v-if="this.$parent.currentCategory === 4">
                            <div class = "chosenBread">
                                <button class = "breadButton" id="breadInc" v-on:click="incrementCounter($event)"></button>
                            </div>
                        </div>
                        <div v-else>-->
                        <button class="plusButton" id="inc" v-show="showPlusOrNot()"
                                v-on:click="incrementCounter($event)">
                            + <!-- only one bread can be selected -->
                        </button>
                        {{ itemCount }}
                        <button class="minusButton" id="dec" v-if="itemCount > 0" v-on:click="decrementCounter($event)">
                            -
                        </button>
                        <!--</div>-->
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
    import Ordering from "../views/Ordering";
    import OrderItem from "../views/Ordering";

    export default {
        name: 'Ingredient',
        components: {
            Ordering,
            OrderItem
        },
        props: {
            item: Object,
            lang: String,
            itemCount: Number
        },
        data: function () {
            return {
                patties: 0, //Ta bort eller allt här henry?
                burgerAndBread: false,
                chosen: false
            };
        },

        created: function () {
            this.checkCounter();    // Check if ingredient already is chosen
        },
        methods: {
            showPlusOrNot: function () {
                if (this.$parent.breadChosen && this.$parent.currentCategory == 4)
                    return false;
                else if (this.$parent.doublePatty && this.$parent.currentCategory == 1)
                    return false;
                else return true
            },
            incrementCounter: function (ev) {

                if (ev.target.id === "inc") {
                    this.$emit('increment');
                }
                if (ev.target.id === "breadInc") {   //Henry används denna ens
                    this.$emit('increment');
                    this.chosen = true;

                }
                // See if order already is on the chosen ingredients list
                // If so, increase currentOrderCounter. If not, create currentOrderCounter
                if (this.item.currentOrderCounter >= 1) {
                    this.item.currentOrderCounter += 1;
                } else {
                    this.item.currentOrderCounter = 1;
                }
            },

            decrementCounter: function (ev) {
                this.item.currentOrderCounter -= 1;
                // Makes the same thing as incrementCounter with difference that it remove instead of adding .
                if (ev.target.id === "dec") {
                    this.$emit('decrease');
                }
                if (this.item.category === 4) { //if selected bread is unselected, the plus button reappears
                    this.$parent.breadChosen = false;
                }
            },
            // Function to check and show the number of ingredient already chosen
            checkCounter: function () {
                // Check if any ingredients are chosen
                if (this.$parent.chosenIngredients.length === 0) {
                    return;
                    // If so, go through ingredients to find this particular one
                } else {
                    for (let i = 0; i < this.$parent.chosenIngredients.length; i++) {
                        if (this.$parent.chosenIngredients[i].ingredient_id === this.item.ingredient_id) {
                            // Set counter to the amount that is already chosen
                            this.counter = this.$parent.chosenIngredients[i].currentOrderCounter;
                        }
                    }
                }
            }
        }
    }
</script>
<style scoped>

    /*MAIN*/

    .itemsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: stretch;
        width: 100%;
        height: 100%;
    }

    .chosenBread {
        background-color: whitesmoke;
        border: #347cff solid 3px;
        height: auto;
        width: auto;
    }

    .allergicBox {
        text-align: center;
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

    /*BUTTONS*/
    button:hover{
        cursor: pointer;
    }
    .buttonItem {
        flex-basis: 100%;
        padding: 0.5rem;
        order: 1;
    }

    .buttonWrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .buttonBox {
        order: 1;
    }

    .plusButton, .minusButton :hover {
        font-size: 180%;
    }

    .plusButton {
        order: 1;
        background-color: rgba(124, 255, 96, 0.36);
        border-radius: 50%;
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        font-size: 1.5em;
        outline: none;
    }

    .minusButton {
        order: 1;
        background-color: rgba(255, 28, 31, 0.36);
        -webkit-transition-duration: 0.4s; /* transition to color */
        transition-duration: 0.4s;
        border-radius: 50%;
        font-size: 1.5em;
        outline: none;
    }

    .ingredient button:hover {
        background-color: rgba(255, 223, 26, 0.36);
        color: black;
        font-size: 1.7em;
    }

    .breadButton {
        opacity: 50%;
        width: 100px;
        height: 100px;
        position: relative;
        top: 0px;
        right: 0px;
    }
</style>