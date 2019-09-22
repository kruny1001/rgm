// https://stackoverflow.com/questions/53627810/disable-cache-warning-for-pixi-loader

import * as PIXI from "pixi.js";
// console.log(PIXI)
let Loader = PIXI.Loader.shared

class GameProperties {
  
  constructor() {
    this.app = "",
    this.mainContainer = "",
    this.userId = '0123'
    this.robotId = '0123',
    this.activeSprites = {},
    this.textContainer = {},
    this.Loader = Loader
    this.resources = []
    this.sprites = {};

    this.Loader.onComplete.add(() => {
      console.log('Added')
    }); 
    // this.Loader.pre();
  }

  drive(target) {
    return target++;
  }
}

class GameLoader extends GameProperties {
  constructor() {
    super()
  }
  getCached(){
    console.log(this.Loader.resources)
  }
  bringAllResource(targetResource) {
    // console.log(targetResource)
    // targetResource.forEach(item=>{
    //   this.Loader.add(item.name, item.src)  
    // })
    this.Loader
      .add('game1Sprite0', "statics/game1/game1-0.json")
      .add('game1Sprite1', "statics/game1/game1-1.json")
      .add('game1Sprite2', "statics/game1/game1-2.json")
      .add('game1Sprite3', "statics/game1/game1-3.json")
      .add('game1Sprite4', "statics/game1/game1-4.json")
      .add('game1Sprite5', "statics/game1/game1-5.json")
      .add('game1Sprite6', "statics/game1/game1-6.json")
      .add('game1Sprite7', "statics/game1/game1-7.json")
      .add('game1Sprite8', "statics/game1/game1-8.json")
      .add('game1Sprite9', "statics/game1/game1-9.json")
      .add('game3Sprite', "statics/game3/game3.json")
      .load((loader, resources) => {
        
      })
  }
  useCached() {
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
      console.log(frame1)
      // let orangeLight = this.assignSprite(frame1, {height: 100, width:100, x: 100},4)
      let lightContainer = new PIXI.Container()
      // lightContainer.addChild(orangeLight)
      // this.app.stage.addChild(lightContainer);
      // orangeLight.scale.set(0.7);
      // orangeLight.animationSpeed = 1;
      // this.activeSprites[target.name] = orangeLight
    }
  }
}
export default GameLoader;