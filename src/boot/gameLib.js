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
    this.robotId = '0123',
    this.activeSprites = {},
    this.textContainer = {}
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
      width: 800,
      resolution: 2,
      height: 1000,
      // antialias: true,
      autoResize: true,
    //   backgroundColor: 0x50545c
    backgroundColor: 0xffffff
    });
    document.querySelector(`#${targetId}`).appendChild(this.app.view);
  }
  changeText(id, content){
    this.textContainer[id].text = content
  }
  showText(textContent){
    let gameScene = new PIXI.Container();
    this.app.stage.addChild(gameScene);
    const basicText = new PIXI.Text("알을 흔들어주세요.");
    basicText.x = this.app.screen.width / 2 - 100;
    basicText.y = 600;
    this.app.stage.addChild(basicText);
    basicText.text = textContent
    this.textContainer['hint'] = basicText
  }
  preAnimation(objectId, relatedObjs){
    // let colorEggs = [
    //   // {name:'colorChange1.W-R_',frame:24}, 
    //   {name:'colorChange2.R-B_',frame:24}, 
    //   {name:'colorChange5.G-P_', frame:24}, 
    //   {name:'colorChange4.O-G_', frame:24}, 
    //   {name:'colorChange3.B-O_', frame:24}, 
    //   {name:'colorChange6.P--R_', frame:48}]
    
    for(let target of relatedObjs){
      let targetSprite = this.activeSprites[target.name]  
      targetSprite.parent.visible = false;
    }
    let finalTarget = this.activeSprites[objectId]
    finalTarget.parent.visible = true;
    finalTarget.gotoAndStop(0)
  }

  playFrameAnimation(objectId, frame){
    let finalTarget = this.activeSprites[objectId]
    finalTarget.gotoAndStop(frame)
  }

  playAllAnimation(objectId){
    let finalTarget = this.activeSprites[objectId]
    finalTarget.gotoAndPlay(0)
  }

  assignSprite(tempFrames, asset){
    const anim = new PIXI.AnimatedSprite(tempFrames);
      anim.loop = false;
      anim.x = this.app.screen.width / 2;
      anim.y = this.app.screen.height / 2 - 100;
      anim.height = asset.height;
      anim.width = asset.width;
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.7;
      anim.interactive = true;
      anim.on("tap", event => { console.log(1) })
    //   anim.on('pointerdown', (e)=>{ this.onClick(e, id) })
      return anim
  }

  onEffectLoaded() {
    let colorEffectEggs = [
      {name:'eggWhtieLight_',frame:24}, 
      {name:'eggRedLight_',frame:24}, 
      {name:'eggBlueLight_',frame:24}, 
      {name:'eggPurpleLight_', frame:24}, 
      {name:'eggGreenLight_', frame:24}, 
      {name:'eggOrangeLight_', frame:24}, 
      {name:'twinkle_', frame:36}, 
    ]
    for(let target of colorEffectEggs){
      let frame1 = []
      for (let i = 0; i < target.frame; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        let sprite = PIXI.Texture.from(`${target.name}${val}.png`)
        sprite.baseTexture.mipmap = false;
        frame1.push(sprite);
      }
      let orangeLight = this.assignSprite(frame1, {height: 100, width:100, x: 100},4)
      let lightContainer = new PIXI.Container()
      lightContainer.addChild(orangeLight)
      this.app.stage.addChild(lightContainer);
      orangeLight.scale.set(0.7);
      orangeLight.animationSpeed = 1;
      this.activeSprites[target.name] = orangeLight
    }
  }

  onLightAssetLoaded(){
    let colorEggs = [
      {name:'colorChange1.W-R_',frame:24}, 
      {name:'colorChange2.R-B_',frame:24}, 
      {name:'colorChange5.G-P_', frame:24}, 
      {name:'colorChange4.O-G_', frame:24}, 
      {name:'colorChange3.B-O_', frame:24}, 
      {name:'colorChange6.P--R_', frame:48}]
    
    for(let target of colorEggs){
      let rbFrames = []

      for (let i = 0; i < target.frame; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        let sprite = PIXI.Texture.from(`${target.name}${val}.png`)
        sprite.baseTexture.mipmap = false;
        rbFrames.push(sprite);
      }

      let rbEggSprite = this.assignSprite(rbFrames, {height: 80, width:80, x: 200})
      rbEggSprite.scale.set(0.7);
      rbEggSprite.gotoAndStop(0)

      this.activeSprites[target.name] = rbEggSprite
      
      let lightContainer = new PIXI.Container()
      lightContainer.addChild(rbEggSprite)

      this.app.stage.addChild(lightContainer);
      
    }
    console.log(this.activeSprites)
    



    

  }
  loadContents(){
    this.app.loader

    .add("statics/game1/game1-0.json")
    .add("statics/game1/game1-1.json")
    .add("statics/game1/game1-2.json")
    .add("statics/game1/game1-3.json")
    .add("statics/game1/game1-4.json")
    .add("statics/game1/game1-5.json")
    .add("statics/game1/game1-6.json")
    .add("statics/game1/game1-7.json")
    .add("statics/game1/game1-8.json")
    .add("statics/game1/game1-9.json")
    .load((loader, resources) => {
      this.onEffectLoaded()
      this.onEffectLoaded()
      this.onLightAssetLoaded()
    })
  }
  
}

export default new Game();