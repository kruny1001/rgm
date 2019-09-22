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
  </q-page>
</template>
<script>
import {leafSetting, levelSetting} from './game3Setting.js'

function wait(time){
  return new Promise( resolve => {
    setTimeout(resolve, time)
  })
}


class LarvaG extends PIXI.Container {
  constructor (){
    super()
    this.larva = new PIXI.Sprite.from('statics/game3/larvaG_000.png')
    this.clicked = false
  }
  async startLarva(clickCallback){
    this.addChild( this.larva )
    // move larva animation

    // add event
    this.larva.interactive = true
    this.larva.on('pointerdown', () => {
      if( this.clicked ){
        // prevent duplicated click
        return
      }
      this.clicked = true      
      return clickCallback()
    })
  }
}

class LarvaR extends PIXI.Container {
  
  constructor (){
    super()
    this.larva = new PIXI.Sprite.from('statics/game3/larvaR_000.png')
    this.clicked = false
  }

  async startLarva(clickCallback){
    this.addChild( this.larva )
    // move larva animation

    // add event
    this.larva.interactive = true
    this.larva.on('pointerdown', () => {
      if( this.clicked ){
        return
      }
      this.clicked = true
      return clickCallback()
    })
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

    this.centerTextBox = new PIXI.Container()
    this.endingBox = new PIXI.Container()

    //
    this.gameApp.stage.addChild(this.leafBox)
    this.gameApp.stage.addChild(this.larvaBox)
    this.gameApp.stage.addChild(this.scoreBox)
    this.gameApp.stage.addChild(this.centerTextBox)
    this.gameApp.stage.addChild(this.endingBox)

  }
  start(){
    this.level = 1
    return this._gameLoop(this.level)
  }

  async _gameLoop(){
    while(1){
      const successRate = await this._startLevel(this.level)
      this.level = this._evalResult(successRate)
      await this._showResult()
    }
  }

  async _startLevel(level){
    this.leafBox.alpha = 0.5
    this.scoreBox.alpha = 0.5
    this._updateScore(0)
    // show level + sound
    await this._showLevelBox(level)
    // show "game start" text
    await this._showStartBox()
    console.log('start game')
    // game loop
    let setting = levelSetting[level]    
    setting.leafSetting = leafSetting[setting.leafNum]

    this._fillLeaf(setting.leafSetting)
    this.leafBox.alpha = 1
    this.scoreBox.alpha = 1
    await this._levelLoop(setting)

    const successRate = this.score / ( setting.larvaG )
    return successRate
  }
  async _showLevelBox(level){
    return
  }
  async _showStartBox(){
    return
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
  async _levelLoop( {leafSetting, larvaG, larvaR, larvaTime} ){
    let _noInfinity = 0
    const leafPosArr = leafSetting.leafPos
    const scale = leafSetting.leafH / 331
    let _larvaG = larvaG
    let _larvaR = larvaR
    while( _larvaG > 0 || _larvaR > 0 ){
      const randomLeaf = parseInt(Math.random() * new Date().getTime()) % leafPosArr.length
      const leafPos = leafPosArr[randomLeaf] 
      let larvaColor 
      if ( _larvaG <= 0) { 
        larvaColor = 'R' 
      } else if ( _larvaR <= 0 ) { 
        larvaColor = 'G' 
      } else { 
        larvaColor = Math.random() > _larvaR/(_larvaR + _larvaG) ? 'G' : 'R' 
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
        _larvaG--
        larva.startLarva(touchGoodLarva)
      }else{
        const touchBadLarva = () => {
          // sound and image "incorrect"
        }
        _larvaR--
        larva.startLarva(touchBadLarva)
      }
      await wait(larvaTime)
      this.leafBox.removeChild(larva)
      console.log('G',_larvaG, 'R',_larvaR, 'score', this.score)
      _noInfinity++
      if(_noInfinity > 100 ){
        break;
      }
    }
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
  async _showResult(){
    return
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
    const game = new Game3(this.$refs.game3)
    game.start()
  },
  beforeDestroy() {
    console.log('Main Vue destroyed')
    // this.destroy()
    delete this.game
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