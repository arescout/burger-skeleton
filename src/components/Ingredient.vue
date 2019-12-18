<template>
  <div class="ingredient">
    <label>
     <!-- <button v-on:click="incrementCounter">{{ counter }}</button>  Nytt La den nedanför -->
      {{item["ingredient_"+ lang]}}, {{item.selling_price}}:-, {{item.stock}} pcs


    </label>
      <div class = "pMButtons">
        <br><button class="plusButton"  v-show="!breadChosen" v-on:click="incrementCounter">+</button> <!-- Nytt */-->
        {{ counter }} <!-- Nytt */-->
        <button class = "minusButton" v-if="counter > 0" v-on:click="decrementCounter">-</button> <!-- Nytt */-->
        <br>
        <div class = "allergies">
          <div class="lactose" v-if = "!item.milk_free">L</div>
          <div class="gluten" v-if = "!item.gluten_free">G</div>
          <div class = "vegan" v-if = "item.vegan">V</div>
        </div>
      </div>
  </div>

</template>
<script>
  import OrderItem from '@/components/OrderItem.vue'
  import Ordering from '@/views/Ordering.vue'
  import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

  //import methods and data that are shared between ordering and kitchen views
  import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Ingredient',
  components: {
    OrderItem,
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
    }
  }
}
</script>
<style scoped>
    .buttonWrapper{
      display: grid;
      grid-gap: 5px;

    }

    .plusButton {
      /*grid-row: 1;
      grid-column: 1;*/

      background-color: rgba(124,255,96,0.36);
      border-radius: 50%;
      -webkit-transition-duration: 0.4s;  /* transition to color */
      transition-duration: 0.4s;
      font-size: 1.5em;
    }
    .minusButton {
      /*grid-row: 1;
        grid-column: 2;*/

        background-color: rgba(255,28,31,0.36);
        -webkit-transition-duration: 0.4s;  /* transition to color */
        transition-duration: 0.4s;
        border-radius: 50%;
        font-size: 1.5em;
    }
    .ingredient button:hover {
        background-color: rgba(255,223,26,0.36);
        color: black;
    }
    .pMButtons {
        /*text-align: center;*/
    }
    .lactose {
      /*grid-row: 1;
      grid-column: 3;*/

      display: inline-block;
      background-color: rgba(51,233,255,0.36);
      border: black solid 1px;
      color: black;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 50%;
    }
    .gluten {
      /*grid-row: 1;
      grid-column: 4;*/

      display: inline-block;
      background-color: rgba(251,255,50,0.36);
      border: black solid 1px;
      color: black;
      margin-left: 2px;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 50%;
    }
    .vegan {
      /*grid-row: 1;
      grid-column: 4;*/

      display: inline-block;
      background-color:rgba(55,255,57,0.47);
      border: black solid 1px;
      color: black;
      margin-left: 2px;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 50%;
    }
  .allergies {
    text-align: center;
  }

  .pMButtons button {
    text-align: center;
  }



</style>