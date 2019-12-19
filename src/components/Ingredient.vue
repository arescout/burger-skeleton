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
                            <button class="breadButton"></button>

                        <div v-else></div>-->
                            <button class="plusButton" v-show = "!this.$parent.breadChosen || this.$parent.currentCategory !== 4" v-on:click="incrementCounter">
                                + <!-- only one bread can be selected -->
                            </button>

                            {{ counter }}
                            <button class="minusButton" v-if="counter > 0" v-on:click="decrementCounter">
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
        },
        data: function () {
            return {
                counter: 0,
                patties: 0,
                doublePatty: false,
                burgerAndBread: false,
            };
        },

        created: function(){
            this.checkCounter();    // Check if ingredient already is chosen
        },
        methods: {
            incrementCounter: function () {
                this.counter += 1;
                // See if order already is on the chosen ingredients list
                // If so, increase currentOrderCounter. If not, create currentOrderCounter
                if (this.item.currentOrderCounter >= 1) {
                    this.item.currentOrderCounter += 1;
                } else {
                    this.item.currentOrderCounter = 1;
                }
                console.log(this.$parent.patties);


                // sending 'increment' message to parent component or view so that it
                // can catch it with v-on:increment in the component declaration
                this.$emit('increment');
                //this.$emit('counter', this.counter)  //nytt
                //if (this.item.category === 4) { //if a bread i selected plus button now disappears
                //  this.breadChosen = true;
                //}
                /*if (this.item.category === 1) {
              this.patties += 1;
              this.burgerChosen = true;
            }
            if (this.patties === 2) {
              this.doublePatty = true;
            }*/
            },

            decrementCounter: function () {
                this.counter -= 1;
                this.item.currentOrderCounter -= 1;
                // Makes the same thing as incrementCounter with difference that it remove instead of adding .
                this.$emit('decrease');
                if (this.item.category === 4) { //if selected bread is unselected, the plus button reappears
                  this.$parent.breadChosen = false;
                }
                console.log("test");
                /*if (this.item.category === 1) {
              this.patties -= 1;
            }
            if (this.patties < 2) {
              this.doublePatty = false;
            }*/
            },
            resetCounter: function () {
                this.counter = 0;
                this.item.currentOrderCounter = 0;
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

    .buttonWrapper {
        display: flex;
        flex-direction: row;
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


</style>