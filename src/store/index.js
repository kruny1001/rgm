import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

// OOP Style 
import game1 from './modules/games/g1'
import sound from './modules/games/sound'
import admin from './modules/admin/controller'
import image from './modules/resource/image'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      admin,
      game1,
      sound,
      image
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
