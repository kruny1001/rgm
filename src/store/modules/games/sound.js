

const state = {
    brush : 'statics/sound/brush.mp3',
    colorchange : 'statics/sound/colorchange.mp3',
    correct : 'statics/sound/correct.mp3',
    crack : 'statics/sound/crack.mp3',
    cute : 'statics/sound/cuteaction.mp3',
    ding : 'statics/sound/ding.mp3',
    dingdong : 'statics/sound/dingdong.mp3',
    done : 'statics/sound/done.mp3',
    fail : 'statics/sound/fail.mp3',
    fanfare : 'statics/sound/fanfare.mp3',
    incorrect : 'statics/sound/incorrect.mp3',
    shaking : 'statics/sound/shaking.mp3',
    start : 'statics/sound/start.mp3',
    tap : 'statics/sound/tap.mp3',
    twinkle : 'statics/sound/twinkle.mp3',
    loadRate:0
}
const getters = {
    getApp: state => state.game,
}

const mutations = {
createGame(state, tagId) {
    state.game.createApp(tagId)
}
}

const actions = {
    playSound({state},id){
        let sound = new Audio(state[id])
        sound.play()
    }

}

export default {
namespaced: true,
state,
getters,
actions,
mutations,
}
