<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"
import Checkout from "./views/Checkout"

export default {
  name: 'app',
  components: {
    Ordering,
    Checkout
  }
}
</script>

<style>

</style>
