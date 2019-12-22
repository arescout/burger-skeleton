import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    checkoutOrder: {burgers: []},
    eatHere: false,
    totalPrice: 0
  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    setCheckoutOrder: function (state, order) {
      state.checkoutOrder.burgers.push(order);
      console.log("In set")
      console.log(state.checkoutOrder)
      },
      setEatHere: function (state, bool) {
        state.eatHere = bool;
      },
    addToCheckoutOrder: function (state, order) {
      state.checkoutOrder.burgers.push(order);
      console.log(order)
      console.log(state.checkoutOrder)
    },
    addToTotal: function (state, numb) {
      state.totalPrice += numb;
    }
  },
  actions: {

  }
})
