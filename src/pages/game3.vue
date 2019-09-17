<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <section style="margin: 0 auto; width:1200px;">
      <!-- <q-btn @click="loadContents()">load contents </q-btn>
      <q-btn @click="readyGame()">readyGame </q-btn> -->
      <q-btn @click="twinkle()"> Twinkle </q-btn>
      <hr/>
      <pre> CurrentCount: {{count}} SenstivityTotal: {{total}} Stage: {{stage}}</pre>
      <q-btn @click="eggAni()">Shaking Event </q-btn>
    </section>
    <section id="game3" style="margin: 0 auto; width:100%; position:relative;">
      
    </section>
  </q-page>
</template>
<script>
import {leafSetting, levelSetting} from './game3Setting.js'

function wait(time){
  return new Promise( resolve => {
    setTimeout(resolve, time)
  })
}


class LavaG extends PIXI.Container
{
  constructor (){
    super()
    this.lava = new PIXI.Sprite.from()
    this.clicked = false
  }
  async startLava(clickCallback){
    this.appendChild( this.lavaG )
    // move lava animation
    this.lava.on('pointerdown', () => {
      if( this.clicked ){
        return
      }
      this.clicked = true      
      return clickCallback()
    })
  }
}

class LavaR extends PIXI.Container
{
  constructor (){
    super()
    this.lava = new PIXI.Sprite.from()
    this.clicked = false
  }
  async startLava(clickCallback){
    this.appendChild( this.lavaG )
    // move lava animation
    this.lava.on('pointerdown', () => {
      if( this.clicked ){
        return
      }
      this.clicked = true
      return clickCallback()
    })
  }
}

class Game3
{
  constructor (dom) {
    //     
    this.gameBox = new PIXI.Application({
      forceCanvas: true,
      forceFXAA: true,
      autoDensity: true,
      resolution: 2,
      autoResize: true,
      width: 800,
      height: 450 
    })
    dom.appendChild(this.gameBox.view)    
    
    // game data
    this.score = 0
    this.level = 1

    // containers
    this.leafBox = new PIXI.Container()
    this.scoreBox = new PIXI.Container()
    this.centerTextBox = new PIXI.Container()
    this.endingBox = new PIXI.Container()

    this._gameStart()
  }
  _gameStart(){
    this.level = 1
    return this._startLevel(this.level)
  }
  async _startLevel(level){
    this.score = 0 
    // show level + sound

    // show "game start" text

    // game loop
    const setting = levelSetting[level]    
    await this._gameLoop(setting)

    const successRate = this.score / ( setting.lavaG + setting.lavaR )
    this._nextGame(successRate)
  }
  async _gameLoop( {leaf, lavaG, lavaR, lavaTime} ){

    while( lavaG > 0 || lavaR > 0 ){
      const randomLeaf = Math.floor( Math.random() * leaf.length )
      const leafPos = leaf[randomLeaf] 
      let lavaColor 
      if ( lavaG == 0) { 
        lavaColor = 'R' 
      } else if ( lavaR == 0 ) { 
        lavaColor = 'G' 
      } else { 
        lavaColor = Math.random() > lavaG/(lavaR + lavaG) ? 'G' : 'R' 
      }

      const lava = lavaColor == 'G' ? new LavaG() : new LavaR()
      lava.x = leafPos.x
      lava.y = leafPos.y
      this.leafBox.addChild(lava)
      if( lavaColor = 'G' ){
        const touchGoodLava = () => {
          // sound and image "correct"
          // add Score
          this.gameScore++
          // update score view
        }
        lavaG--
        lava.startLava(touchGoodLava)
      }else{
        const touchBadLava = () => {
          // sound and image "incorrect"
        }
        lavaR--
        lava.startLava(touchBadLava)
      }
      await wait(lavaTime)
      this.leafBox.removeChild(lava)
    }    

  }
  _updateScore( newScore ){
    // draw score
  }
  _nextGame(successRate){
    if ( successRate >= 0.9 ) {
      this.level = Math.min( this.level+2, 8)
    } else if ( successRate >= 0.8 ) {
      this.level = Math.min( this.level+1, 8)
    } else if ( successRate >= 0.5 ) {
      this.level = this.level
    } else {
      this.level = Math.max( this.level-1, 1)
    }
    return this._startLevel(this.level)
  }
}

export default {
  data(){
    return {

    }
  },
  methods:{

  },
  created(){
    
    
  },
  mounted(){
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