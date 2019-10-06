
import {database} from 'src/boot/fbConn.js'

const state = {
  crntGame: "",
  userLevel: 'normal',
  crntDescTitle: '',
  crntDescTitle: '',
  crntDescCount: '',
  imgSrc: '',
  max: 13
}
const getters = {
  getApp: state => state.game,
  getCrntGame : state => state.crntGame,
  getUserLevel: state => state.userLevel,

  getCrntDesc: state => state.crntDescTitle,
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
}

const actions = {
  getConnected({commit}, start){
    database.ref('crntGame').on('value', (snap) => {
        console.log('changed', snap.val())
        commit('updateCrntGame', snap.val())
    })
  },
  async setCrntGame({commit}, gameId){
    await database.ref('crntGame').set(gameId)
  },
  setAdmin({commit}, level){
    commit('updateUserLevel', level)
  },
  setDescTitle({commit}, title){
    commit('updateDescTitle', title)
  },
  incDescTitle({commit, state}, count){
    state.count = state.count ++
    state.imgSrc = `statics/${state.title}/desc/${state.count}.jpg`;
  },
  descDescTitle({commit, state}, count){
    if (state.count < state.max) {
      if (state.count > 1) {
        state.count = --state.count 
        state.imgSrc = `statics/${state.title}/desc/${state.count}.jpg`;
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
