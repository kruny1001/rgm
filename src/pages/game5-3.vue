<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <gameResult></gameResult>
    <section style="margin: 0 auto; width:1200px;">
      <!-- <q-btn @click="loadContents()">load contents </q-btn>
      <q-btn @click="readyGame()">readyGame </q-btn> -->
      <!-- <q-btn @click="twinkle()"> Twinkle </q-btn>
      <hr/>
      <pre> CurrentCount: {{count}} SenstivityTotal: {{total}} Stage: {{stage}}</pre>
      <q-btn @click="eggAni()">Shaking Event </q-btn> -->
    </section>
    <section ref="game3" class="game-screen">

    </section>
    <q-btn label="start" @click="btnStart()"/>
  </q-page>
</template>
<script>
import {larvaSetting, levelSetting} from './game5-3Setting.js'
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
import gameResult from 'src/components/game5Result.vue'
import {PixiPlugin} from "gsap/PixiPlugin";
import { middleware } from 'resource-loader';

class LarvaCicle extends PIXI.Container {
  constructor (index) {
    super()
    this.status = 0
    this.index = index
  }
  changeTo( status ){
    this.removeChildren()
    const STAT_LIST = ['blank', 'body', 'head']
    switch(STAT_LIST[status]){
      case 'blank' :
        this.larva = new PIXI.Sprite.from('statics/game5-3/btn_blank.png')
        break;
      case 'body' :
        this.larva = new PIXI.Sprite.from('statics/game5-3/btn_larva.png')
        break;
      case 'head' :
        this.larva = new PIXI.Sprite.from('statics/game5-3/btn_larvahead.png')
        break;
    }
    this.status = status
    this.larva.anchor.set(0.5)
    this.larva.interactive = true
    this.addChild(this.larva)
  }
}


class Game5_3 {
  constructor (dom) {
    //     
    this.gameApp = new PIXI.Application({
      forceCanvas: true,
      forceFXAA: true,
      autoDensity: true,
      resolution: 2,
      autoResize: true,
      width: 1600,
      height: 900,
      resizeTo: dom,
    })
    dom.appendChild(this.gameApp.view)    

    // game data
    this.score = 0
    this.level = 1
    
    this.setting = {}

    // game loop jobs obj
    this.interval = null

    // containers
    this.larvaBox = new PIXI.Container()

    // setting scoreBox
    this.scoreBox = new PIXI.Container()
    this.scoreBox.x = 22.54
    this.scoreBox.y = 22.54
    this.scoreBox.addChild( new PIXI.Sprite.from('statics/game5-3/image_number.png'))
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
    this.gameApp.stage.addChild(this.larvaBox)
    this.gameApp.stage.addChild(this.scoreBox)
    // this.gameApp.stage.addChild(this.centerTextBox)
    // this.gameApp.stage.addChild(this.endingBox)

  }
  startLevel(level, onComplete){
    if( this.interval){
      return
    }
    this.level = level
    this._updateScore(0)
    console.log('start game')
    // game loop
    const setting =  levelSetting[level]
    const larvaCnt = setting.rowNum* setting.colNum
    setting.larvaSetting = larvaSetting[larvaCnt]
    this.scoreBox.alpha = 1
    this.larvaBox.alpha = 1
    this._levelLoopStart(setting, onComplete)
  }
  _levelLoopStart({rowNum, colNum, larvaSetting}, onComplete ){
    const arr = new Array(rowNum*colNum).fill(1)
    this._updateLarva(arr, rowNum, colNum, larvaSetting)
  }
  _updateLarva( statArr, rowNum, colNum, larvaSetting ){
    this.larvaBox.removeChildren()
    const {larvaW, larvaH, larvaPos} = larvaSetting
    const scale = larvaW/306

    for( let i = 0 ; i < statArr.length ; i++ ){
      const status = statArr[i]
      const pos = larvaPos[i]
      const larva = new LarvaCicle(i)
      larva.changeTo(status)
      larva.x = pos.x
      larva.y = pos.y
      larva.scale.x = scale
      larva.scale.y = scale
      larva.larva.on('click', () => {
        if( larva.status == )
      })
      this.larvaBox.addChild(larva)
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
  destroy(){
    if( this.interval ){
      clearInterval(this.interval)
    }
  }
}

export default {
  components:{
    gameResult
  },
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

    this.game = new Game5_3(this.$refs.game3)
    this.game.startLevel(1, ()=>{})
  },
  beforeDestroy(){
    if( this.game && this.game.destroy ){
      this.game.destroy()
    }
  }
};
</script>

<style>
.game-screen{
  width: 100vw;
  height: calc(100vw * 9 / 16)
}
canvas{
  padding:10px; 
  margin:10px;
  /* border: 1px solid black; */
  display: block;
  margin: 0 auto;
}
</style>