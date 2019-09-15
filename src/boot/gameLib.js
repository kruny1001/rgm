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
      width: 900,
      resolution: 2,
      height: 800,
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
  preAnimation(objectId){
    let colorEggs = [
      // {name:'colorChange1.W-R_',frame:24}, 
      {name:'colorChange2.R-B_',frame:24}, 
      {name:'colorChange5.G-P_', frame:24}, 
      {name:'colorChange4.O-G_', frame:24}, 
      {name:'colorChange3.B-O_', frame:24}, 
      {name:'colorChange6.P--R_', frame:48}]
    
    for(let target of colorEggs){
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
      let frame1 = []
    for (let i = 0; i < 25; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        frame1.push(PIXI.Texture.from(`eggOrangeLight_${val}.png`));
    }
    let orangeLight = this.assignSprite(frame1, {height: 100, width:100, x: 100},4)
    let lightContainer = new PIXI.Container()
    lightContainer.addChild(orangeLight)
    this.app.stage.addChild(lightContainer);
    orangeLight.scale.set(0.7);
    orangeLight.animationSpeed = 1;
    this.activeSprites['eggOrangeLight'] = orangeLight
  }

  onLightAssetLoaded(){
    let colorEggs = [
      // {name:'colorChange1.W-R_',frame:24}, 
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

    .add("statics/game1/lights/blueLight-0.json")
    .add("statics/game1/lights/blueLight-1.json")
    .add("statics/game1/lights/blueLight-2.json")
    .add("statics/game1/lights/blueLight-3.json")
    .add("statics/game1/lights/blueLight-4.json")
    .add("statics/game1/lights/blueLight-5.json")
    .add("statics/game1/lights/blueLight-6.json")
    .add("statics/game1/lights/blueLight-7.json")
    .add("statics/game1/lights/blueLight-8.json")
    .add("statics/game1/lights/blueLight-9.json")
    .add("statics/game1/lights/blueLight-10.json")
    .add("statics/game1/lights/blueLight-11.json")
    .add("statics/game1/lights/blueLight-12.json")
    .add("statics/game1/lights/blueLight-13.json")
    .add("statics/game1/lights/blueLight-14.json")
    .add("statics/game1/lights/blueLight-15.json")
    .add("statics/game1/lights/blueLight-16.json")
    .add("statics/game1/lights/blueLight-17.json")

    .add("statics/game1/eggs/egg-0.json")
    .add("statics/game1/eggs/egg-1.json")
    .add("statics/game1/eggs/egg-2.json")
    .add("statics/game1/eggs/egg-3.json")
    .load((loader, resources) => {
      this.onEffectLoaded()
      this.onLightAssetLoaded()
    })
  }
  
}

export default new Game();