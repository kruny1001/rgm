
import {database} from 'src/boot/fbConn.js'

const state = {
  crntGame: "",
  userLevel: 'normal',
  crntDescTitle: '',
  crntDescTitle: '',
  crntDescCount: '',
  statusDesc: false,
  imgSrc: '',
  max: 13,
  count: 1
}
const getters = {
  getApp: state => state.game,
  getCrntGame : state => state.crntGame,
  getUserLevel: state => state.userLevel,
  getStatusDesc : state => state.statusDesc,
  getCrntDescTitle: state => state.crntDescTitle,
  getCrntDescCount: state => state.crntDescCount,
  getImgSrc: state => state.imgSrc

}

const mutations = {
  createGame(state, tagId) {
    state.game.createApp(tagId)
  },
  updateCrntGame(state, data){
    state.crntGame = data
  },
  updateUserLevel(state, data){
    state.userLevel = data
  },
  updateStatusDesc(state, data){
    state.statusDesc = data
  }
}

const actions = {
  openDesc({commit, state}){
    console.log("open Description")
    commit('updateStatusDesc', true)
  },

  closeDesc({commit, state}){
    console.log("close Description")
    commit('updateStatusDesc', false)
  },

  getConnected({commit}, start){
    database.ref('crntGame').on('value', (snap) => {
        console.log('changed', snap.val())
        commit('updateCrntGame', snap.val())
    })

    database.ref('crntDescTitle').on('value', (snap) => {
        console.log('changed', snap.val())
        commit('updateCrntGame', snap.val())

    })

    database.ref('crntDescImg').on('value', (snap) => {
      let temp = snap.val()
      commit('updateCrntGame', snap.val())
      state.imgSrc = `statics/${state.title}/desc/${temp.count}.jpg`;
    })


  },

  async setCrntGame({commit}, gameId){
    await database.ref('crntGame').set(gameId)
  },

  setAdmin({commit}, level){
    commit('updateUserLevel', level)
  },

  setDescTitle({commit, state}, title){
    database.ref('crntDescTitle').set(title)
    commit('updateDescTitle', title)
  },

  incDescTitle({commit, state}, count){
    state.count = state.count ++
    state.imgSrc = `statics/${state.title}/desc/${state.count}.jpg`;
    database.ref('crntDescImg').set(count)
  },

  descDescTitle({commit, state}, count){
    if (state.count < state.max) {
      if (state.count > 1) {
        state.count = --state.count
        // state.imgSrc = `statics/${state.title}/desc/${state.count}.jpg`;
      }
    }
    database.ref('crntDescImg').set({count: state.count})

  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
