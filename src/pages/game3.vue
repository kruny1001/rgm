<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <section style="margin: 0 auto; width:1200px;">
      <!-- <q-btn @click="loadContents()">load contents </q-btn>
      <q-btn @click="readyGame()">readyGame </q-btn> -->
      <!-- <q-btn @click="twinkle()"> Twinkle </q-btn>
      <hr/>
      <pre> CurrentCount: {{count}} SenstivityTotal: {{total}} Stage: {{stage}}</pre>
      <q-btn @click="eggAni()">Shaking Event </q-btn> -->
    </section>
    <section ref="game3" style="margin: 0 auto; width:100%; position:relative;">

    </section>
    <q-btn label="start" @click="btnStart()"/>
  </q-page>
</template>
<script>
import {leafSetting, levelSetting} from './game3Setting.js'


function Job(obj){
  return {
      id : 'no-id',
      callback : null,
      timeout: 0,
      ...obj,
      started: new Date(),
      elapsed : 0,
      done: false,
    }
}

class LarvaG extends PIXI.Container {
  constructor (){
    super()
    // this.larva = new PIXI.Sprite.from('statics/game3/larvaG_000.png')

    let colorEggs = [
      {name:'larvaG_',frame:13}, 
      
    ]

    for(let target of colorEggs){
      let rbFrames = []
      for (let i = 0; i < target.frame; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        let sprite = PIXI.Texture.from(`${target.name}${val}.png`)
        sprite.baseTexture.mipmap = true;
        rbFrames.push(sprite);
      }

      this.larva = this.assignSprite(rbFrames, {height: 80, width:80, x: 200})
      this.larva.scale.set(0.7);
      this.larva.animationSpeed = 0.6;
      this.larva.loop = true
      this.larva.play()
      // this.activeSprites[target.name] = rbEggSprite
      this.addChild(this.larva)
    }
  
    this.clicked = false
  }

  assignSprite(tempFrames, asset){
    const anim = new PIXI.AnimatedSprite(tempFrames);
      anim.loop = false;
      // anim.visible = false;
      // anim.x = 100
      // anim.y = 100
      // anim.height = asset.height;
      // anim.width = asset.width;
      // anim.anchor.set(0.5);
      anim.animationSpeed = 0.7;
      anim.interactive = true;
      // anim.on("tap", event => { console.log(1) })
    //   anim.on('pointerdown', (e)=>{ this.onClick(e, id) })
      return anim
  }

  startLarva(onClick, onTimeout, time){
    this.addChild( this.larva )
    // move larva animation

    // add event
    this.larva.interactive = true
    this.larva.on('pointerdown', () => {
      if( this.clicked ){
        return
      }
      this.clicked = true
      this.showCorrect()
      return onClick()
    })
    this.timeout = setTimeout( onTimeout, time )
  }
  showCorrect(){

  }
}

class LarvaR extends PIXI.Container {
  
  constructor (){
    super()
    // this.larva = new PIXI.Sprite.from('statics/game3/larvaR_000.png')
    this.clicked = false
    this.timeout = null

    let colorEggs = [
      {name:'larvaR_',frame:13}, 
      
    ]

    for(let target of colorEggs){
      let rbFrames = []
      for (let i = 0; i < target.frame; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        let sprite = PIXI.Texture.from(`${target.name}${val}.png`)
        sprite.baseTexture.mipmap = true;
        rbFrames.push(sprite);
      }

      this.larva = this.assignSprite(rbFrames, {height: 160, width:80, x: 200})
      this.larva.scale.set(0.7);
      this.larva.animationSpeed = 0.6;
      this.larva.loop = true
      this.larva.play()
      // this.activeSprites[target.name] = rbEggSprite
      this.addChild(this.larva)
    }
  }

  startLarva(onClick, onTimeout, time){
    // this.addChild( this.larva )
    // move larva animation

    // add event
    this.larva.interactive = true
    this.larva.on('pointerdown', () => {
      if( this.clicked ){
        return
      }
      this.clicked = true
      this.showIncorrect()
      return onClick()
    })
    this.timeout = setTimeout( onTimeout, time )
  }
  showIncorrect(){

  }
  assignSprite(tempFrames, asset){
    const anim = new PIXI.AnimatedSprite(tempFrames);
      anim.loop = false;
      // anim.visible = false;
      // anim.x = 100
      // anim.y = 100
      // anim.height = asset.height;
      // anim.width = asset.width;
      // anim.anchor.set(0.5);
      anim.animationSpeed = 0.7;
      anim.interactive = true;
      // anim.on("tap", event => { console.log(1) })
    //   anim.on('pointerdown', (e)=>{ this.onClick(e, id) })
      return anim
  }
}

class Game3 {
  constructor (dom) {
    //     
    this.gameApp = new PIXI.Application({
      forceCanvas: true,
      forceFXAA: true,
      autoDensity: true,
      resolution: 2,
      autoResize: true,
      width: 1600,
      height: 900
    })
    dom.appendChild(this.gameApp.view)    

    // game data
    this.score = 0
    this.level = 1
    this.larvaG = 0
    this.larvaR = 0
    this.setting = {}

    // game loop jobs obj
    this.interval = null

    // containers
    this.leafBox = new PIXI.Container()
    this.larvaBox = new PIXI.Container()

    // setting scoreBox
    this.scoreBox = new PIXI.Container()
    this.scoreBox.x = 22.54
    this.scoreBox.y = 22.54
    this.scoreBox.addChild( new PIXI.Sprite.from('statics/game3/image_number.png'))
    const scoreNum = new PIXI.Text('0',{
      fontFamily: 'Arial',
      fontSize: 75,
      fill: '#2C4147'
    })
    scoreNum.anchor.set(0.5)
    scoreNum.x = 75
    scoreNum.y = 60
    this.scoreBox.text = scoreNum
    this.scoreBox.addChild(scoreNum)

    // this.centerTextBox = new PIXI.Container()
    // this.endingBox = new PIXI.Container()

    //
    this.gameApp.stage.addChild(this.leafBox)
    this.gameApp.stage.addChild(this.larvaBox)
    this.gameApp.stage.addChild(this.scoreBox)
    // this.gameApp.stage.addChild(this.centerTextBox)
    // this.gameApp.stage.addChild(this.endingBox)

  }
  startLevel(level, onComplete){
    this.level = level
    this._updateScore(0)
    console.log('start game')
    // game loop
    const setting = levelSetting[level]
    setting.leafSetting = leafSetting[setting.leafNum]

    this._fillLeaf(setting.leafSetting)
    this.leafBox.alpha = 1
    this.scoreBox.alpha = 1
    this._levelLoopStart(setting, onComplete)
  }
  _fillLeaf({leafH, leafW, leafPos}){
    this.leafBox.removeChildren()
    const scale = leafH / 331
    for( const {x,y} of leafPos ){
      const leaf = new PIXI.Sprite.from('statics/game3/image_leaf.png')
      leaf.x = x - leafH /2
      leaf.y = y - leafH /2
      leaf.scale.x = scale
      leaf.scale.y = scale
      this.leafBox.addChild(leaf)
    }
  }
  _levelLoopStart({leafSetting, larvaG, larvaR, larvaTime}, onComplete ){
    const leafPosArr = leafSetting.leafPos
    const scale = leafSetting.leafH / 331
    this.larvaG = larvaG
    this.larvaR = larvaR
    if( this.interval ){
      clearInterval(this.interval)
    }
    this.interval = setInterval(()=>{
      if( this.larvaG > 0 || this.larvaR > 0 ){
        this.drawNextLarva({scale, leafPosArr}, larvaTime)
      }else{
        clearInterval(this.interval)
        const score = this.score
        const successRate = score / larvaG
        const nextLevel = this._evalResult(successRate)
        onComplete({score, successRate, nextLevel})
      }
    }, larvaTime)
  }
  drawNextLarva({scale, leafPosArr}, larvaTime){
    const randomLeaf = parseInt(Math.random() * new Date().getTime()) % leafPosArr.length
    const leafPos = leafPosArr[randomLeaf]
    let larvaColor 
    if ( this.larvaG <= 0) {
      larvaColor = 'R'
    } else if ( this.larvaR <= 0 ) {
      larvaColor = 'G' 
    } else {
      larvaColor = Math.random() > this.larvaR/(this.larvaR + this.larvaG) ? 'G' : 'R'
    }

    const larva = larvaColor == 'G' ? new LarvaG() : new LarvaR()
    larva.scale.x = scale
    larva.scale.y = scale
    larva.x = leafPos.x - 300 * scale
    larva.y = leafPos.y - 300 * scale
    
    this.leafBox.addChild(larva)
    if( larvaColor == 'G' ){
      const touchGoodLarva = () => {
        // sound and image "correct"

        // score +1
        // update score view
        this._updateScore(this.score + 1)
      }
      this.larvaG--
      larva.startLarva(touchGoodLarva, ()=>{
        this.leafBox.removeChild(larva)
      }, larvaTime)
    }else{
      const touchBadLarva = () => {
        // sound and image "incorrect"
      }
      this.larvaR--
      larva.startLarva(touchBadLarva, ()=>{
        this.leafBox.removeChild(larva)
      }, larvaTime)
    }
    console.log('G',this.larvaG, 'R',this.larvaR, 'score', this.score)
  }
  _updateScore( newScore ){
    // draw score
    this.score = newScore
    this.scoreBox.text.text = newScore
  }
  _evalResult(successRate){
    let nextLevel
    if ( successRate >= 0.9 ) {
      nextLevel = Math.min( this.level+2, 8)
    } else if ( successRate >= 0.8 ) {
      nextLevel = Math.min( this.level+1, 8)
    } else if ( successRate >= 0.5 ) {
      nextLevel = this.level
    } else {
      nextLevel = Math.max( this.level-1, 1)
    }
    return nextLevel
  }
  destroy(){
    if( this.interval ){
      clearInterval(this.interval)
    }
  }
}

export default {
  data(){
    return {
      game : null
    }
  },
  methods:{
    btnStart(){
      if( this.game && this.game.startLevel ){
        console.log('btn')
        this.game.startLevel(1, (result) => {
          console.log( result)
        })
      }
    }
  },
  created(){
    
  },
  mounted(){
    this.game = new Game3(this.$refs.game3)
  },
  beforeDestroy(){
    if( this.game && this.game.destroy ){
      this.game.destroy()
    }
  }
};
</script>

<style>
canvas{
  padding:10px; 
  margin:10px;
  /* border: 1px solid black; */
  display: block;
  margin: 0 auto;
}
</style>