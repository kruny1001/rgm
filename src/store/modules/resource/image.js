import { LocalStorage, SessionStorage } from 'quasar'
import Vue from 'vue'

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

const state = {
  images : {
    g11img1: ""
  }
}
const getters = {
  getApp: state => state.game,
  images: state => state.images
}

const mutations = {
  createGame(state, tagId) {
    state.game.createApp(tagId)
  },
  updateImg(state, {src, key}){
    // console.log(key, src)
    Vue.set(state.images, key, src)
    // state.images[key] = src
  }
}

const actions = {
  saveImage(){
    toDataURL('statics/game11/eye1.png', function(dataUrl) {
      console.log('RESULT:', dataUrl)
      // console.log(LocalStorage)
      LocalStorage.set('g11img1', dataUrl)
    })
    toDataURL('statics/game11/eye2.png', function(dataUrl) {
      console.log('RESULT:', dataUrl)
      // console.log(LocalStorage)
      LocalStorage.set('g11img2', dataUrl)
    })

    // LocalStorage.set('g11img1', value)
  },
  async getImage({commit}, key){
    let result = await LocalStorage.getItem(key)
    commit('updateImg',{src:result, key:key})
    console.log(result)
    return result;
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
