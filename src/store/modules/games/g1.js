import * as PIXI from "pixi.js";
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
import {PixiPlugin} from "gsap/PixiPlugin";

PixiPlugin.registerPIXI(PIXI);
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.RESOLUTION = window.devicePixelRatio;

class GameProperties {
  constructor() {
    this.app = "",
    this.mainContainer = "",
    this.userId = '0123'
    this.robotId = '0123'
  }
  drive(target) {
    return target++;
  }
}

class Game extends GameProperties {
  constructor() {
    super()
    // this.mileage = this.drive(this.mileage)
  }
  createApp(targetId){
    this.app = new PIXI.Application({
      // transparent: true,
      forceCanvas: true,
      forceFXAA: true,
      autoDensity: true,
      width: 900,
      resolution: 2,
      height: 800,
      // antialias: true,
      autoResize: true,
      backgroundColor: 0x50545c
    });
    document.querySelector(`#${targetId}`).appendChild(this.app.view);
  }
  showText(){
    let gameScene = new PIXI.Container();
    this.app.stage.addChild(gameScene);
    const basicText = new PIXI.Text("알을 흔들어주세요.");
    basicText.x = this.app.screen.width / 2;
    basicText.y = this.app.screen.height / 4;
    this.app.stage.addChild(basicText);
    basicText.text = '색깔이 변했어요!'
  }
  assignSprite(tempFrames, asset, id){
    const anim = new PIXI.AnimatedSprite(tempFrames);
      anim.loop = false;
      anim.x = this.app.screen.width / 2;
      anim.y = this.app.screen.height / 2;
      anim.height = asset.height;
      anim.width = asset.width;
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.7;
      anim.interactive = true;
      anim.on("tap", event => { console.log(1) })
      var vm = this
      anim.on('pointerdown', (e)=>{ this.onClick(e, id) })
      return anim
  }
  onLightAssetLoaded(){
    let rbFrames = []
    for (let i = 0; i < 24; i++) {
      let val = "000";
      if (i < 10) val = `00${i}`;
      else val = `0${i}`;
      let sprite = PIXI.Texture.from(`colorChange2.R-B_${val}.png`)
      // console.log(sprite)
      sprite.baseTexture.mipmap = false;
      // sprite.scale.set(0.275);
      rbFrames.push(sprite);
    }
    rbEggs = this.assignSprite(rbFrames, {height: 80, width:80, x: 200},3)
  }
  loadContents(){
    this.game.app.loader
      .add("statics/game1/eggs/egg-0.json")
      .add("statics/game1/eggs/egg-1.json")
      .add("statics/game1/eggs/egg-2.json")
      .add("statics/game1/eggs/egg-3.json")
      .load(this.onLightAssetLoaded);
  }
}

const state = {
  game: new Game(),
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
  createGame({ commit, state }, tagId){
    // console.log(state.game, tagId)
    // commit('createGame', tagId)
    state.game.createApp(tagId)
    state.game.showText()
  },
  showEggs(){

  }
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
