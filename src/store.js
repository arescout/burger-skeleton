import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    checkoutOrder: {},
    eatHere: false
  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    setCheckoutOrder: function (state, order) {
      state.checkoutOrder = order;
      },
      setEatHere: function (state, bool) {
        state.eatHere = bool;
      },
    addToCheckoutOrder: function (state, order) {
      state.checkoutOrder.burgers.push(order);
    }
  },
  actions: {

  }
})
