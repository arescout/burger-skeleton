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
      },
    setEatHere: function (state, bool) {
      state.eatHere = bool;
      },
    addToCheckoutOrder: function (state, order) {
      state.checkoutOrder.burgers.push(order);
    },
    removeFromCheckoutOrder: function(state, key) {
      state.checkoutOrder.burgers.splice(key, 1);
    },
    addToTotal: function (state, numb) {
      state.totalPrice += numb;
    },
    removeFromTotal: function (state, numb) {
      state.totalPrice -= numb;
    }
  },
  actions: {

  }
})
