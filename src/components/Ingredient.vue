<template>
  <div class="ingredient">
    <label>
     <!-- <button v-on:click="incrementCounter">{{ counter }}</button>  Nytt La den nedanför -->
      {{item["ingredient_"+ lang]}}, {{item.selling_price}}:-, {{item.stock}} pcs

      <br><button v-on:click="incrementCounter">+</button> <!-- Nytt */-->
    </label>
    {{ counter }} <!-- Nytt */-->
    <button class = "minusButton" v-if="counter > 0" v-on:click="decrementCounter">-</button> <!-- Nytt */-->
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
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


    .ingredient label button {
        background-color: rgba(124,255,96,0.36);
        border-radius: 50%;
        -webkit-transition-duration: 0.4s;  /* transition to color */
        transition-duration: 0.4s;
        font-size: 1.5em;
    }
    .minusButton {
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
</style>