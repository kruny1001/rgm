
import {database} from 'src/boot/fbConn.js'

const state = {
  crntGame: "",
  userLevel: 'normal',
  crntDescTitle: '',
  crntDescTitle: '',
  crntDescCount: 1,
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
  },
  updateCrntDescTitle(state, data){
    state.crntDescTitle = data
  },
  // updateCrntDescImg(state, data){
  //   state.imgSrc = `statics/${state.title}/desc/${temp.count}.jpg`;
  // },
  updateCrntCount(state, data){
    state.crntDescCount = data
    state.imgSrc = `statics/${state.crntDescTitle}/desc/${state.crntDescCount}.jpg`;
    console.log(data)
  }
}

const actions = {
  openDesc({commit, state}){
    console.log("open Description")
    database.ref('statusDesc').set(true)
  },

  closeDesc({commit, state}){
    console.log("close Description")
    database.ref('statusDesc').set(false)
  },

  getConnected({commit}, start){
    database.ref('crntGame').on('value', (snap) => {
        console.log('changed', snap.val())
        commit('updateCrntGame', snap.val())
    })
    database.ref('crntDescTitle').on('value', (snap) => {
        console.log('changed', snap.val())
        commit('updateCrntDescTitle', snap.val())
    })
    database.ref('cntDescCount').on('value', (snap) => {
      let temp = snap.val()
      if(temp !=null){
        commit('updateCrntCount', snap.val())
        // state.imgSrc = `statics/${state.title}/desc/${temp.count}.jpg`;
      }
    })
    database.ref('statusDesc').on('value', (snap) => {
      let temp = snap.val()
      console.log(temp)
      if(temp !== null)
        commit('updateStatusDesc', snap.val())
    })


  },
  async setCrntGame({commit}, gameId){
    await database.ref('crntGame').set(gameId)
  },
  setOpenDesc({commit}){
    commit('updateStatusDesc', true)
  },
  setCloseDesc({commit}){
    commit('updateStatusDesc', false)
  },
  setAdmin({commit}, level){
    commit('updateUserLevel', level)
  },

  setDescTitle({commit, state}, title){
    database.ref('crntDescTitle').set(title)
    database.ref('cntDescCount').set(1)
    // commit('updateCrntDescTitle', title)
    // commit('updateCrntCount', 1)
  },

  incDescTitle({commit, state}){
    let max = 1
    if(state.crntDescTitle == "game11")
      max = 15
    if(state.crntDescTitle == "game12")
      max = 13
    if(state.crntDescCount + 1 <=  max)  {
      let count = state.crntDescCount + 1
      // state.imgSrc = `statics/${state.title}/desc/${state.count}.jpg`;
      database.ref('cntDescCount').set(count)
      // database.ref('crntDescImg').set(count)
    }
    
  },

  descDescTitle({commit, state}){
    if(state.crntDescCount - 1 > 1){
      let count = state.crntDescCount - 1
      database.ref('cntDescCount').set(count)
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
