<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <gameResult v-if="show == 'result'"></gameResult>
    <section id="game-view" ref="game3" style="margin: 0 auto; width:100%; position:relative;">
    </section>
    <section class="floatBtn noselect">
        <button unselectable="on" class="unselectable" onclick="fullscreen()"> 
            <div unselectable="on" class="unselectable noselect">fullscreen</div> 
        </button>        
        <button @click="btnStart()">start </button>
    </section>
  </q-page>
</template>
<script>
import {larvaSetting, levelSetting} from './game5-3Setting.js'
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
import gameResult from 'src/components/game5Result.vue'
import {PixiPlugin} from "gsap/PixiPlugin";
import { middleware } from 'resource-loader';

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class LarvaBtn extends PIXI.Container {
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
  clicked(effectType){

  }
}


class Game5_3 extends PIXI.Application{
  constructor (dom) {
    //
    super({
      forceCanvas: true,
      forceFXAA: true,
      autoDensity: true,
      resolution: 2,
      resizeTo: dom,

    })
    this.dom = dom
    console.log(dom)
    dom.appendChild(this.view)

    // game data
    this.score = 0
    this.level = 1
    
    this.setting = {}

    // game loop jobs obj
    this.interval = null
    this.timeout = null

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
    this.stage.addChild(this.larvaBox)
    this.stage.addChild(this.scoreBox)
    // this.stage.addChild(this.centerTextBox)
    // this.stage.addChild(this.endingBox)
    this.rescale
  }
  rescale(){
    const width = window.innerWidth
    this.width = width
    this.height = width *9/16
    this.renderer.resize(this.width, this.height)
    this.stage.scale.x = width/1600
    this.stage.scale.y = width/1600
  }
  startLevel(level, onComplete){
    if( this.timeout ){
      console.warn('already started')
      return
    }
    this.level = level
    this._updateScore(0)
    console.log('start game')
    // game loop
    const setting =  levelSetting[level]
    const larvaCnt = setting.rowNum* setting.colNum
    setting.larvaSetting = larvaSetting[larvaCnt]
    this.setting = setting
    this.scoreBox.alpha = 1
    this.larvaBox.alpha = 1
    this._levelLoopStart(setting, onComplete)
    this.timeout = setTimeout(this._gameEnd, 15000)
  }
  _levelLoopStart({rowNum, colNum, larvaSetting, speed}, onComplete ){
    this.state = new Array(rowNum*colNum).fill(1)
    this.larvaBox.larvaList = this.state.map( i => new LarvaBtn(i) )
    this._randomHead()
    this._updateLarva(this.state, larvaSetting)
    if( this.interval ){
      clearInterval(this.interval)
    }
    this.interval = setInterval( () => {
      this.state = shuffle(this.state)
      this._updateLarva()
    }, speed * 1000 )
  }
  _randomHead(){
    // change all head to body
    this.state.forEach( (b,i) => {
      if( b == 2){
        return this.state[i] = 1
      }
    })
    // gather body index
    const bodies = this.state.map( (b, i) => b > 0? i : -1 )
        .filter( idx => idx >= 0)
    if( bodies.length < 1 ){
      return
    }
    // select random body
    const random_body = bodies[Math.floor(Math.random()*bodies.length)];
    this.state[random_body] = 2
  }
  _updateLarva( statArr, larvaSetting ){
    if( !statArr ){ statArr = this.state}
    if( !larvaSetting ){ larvaSetting = this.setting.larvaSetting}

    this.larvaBox.removeChildren()
    const {larvaW, larvaH, larvaPos} = larvaSetting
    const scale = larvaW/306

    for( let i = 0 ; i < statArr.length ; i++ ){
      const status = statArr[i]
      const pos = larvaPos[i]
      const larva = new LarvaBtn(i)
      larva.changeTo(status)
      larva.x = pos.x
      larva.y = pos.y
      larva.scale.x = scale
      larva.scale.y = scale
      larva.larva.on('pointerdown', () => {
        if( larva.status == 0) {
          this._wrongLarva(larva.index)
        }else{
          this._correctLarva(larva.index)
        }
      })
      this.larvaBox.addChild(larva)
    }
  }
  _moveLarva(){
    this.state = shuffle(this.state)
    this._updateLarva()
  }
  _wrongLarva(index){
    // blank to body
    this.state[index] = 1
    this._moveLarva()
    this._updateLarva()
  }
  _correctLarva(index){
    this.state[index] = 0
    // check ending
    if( this.state.filter( b => b > 0).length < 1 ){
      clearTimeout(this.timeout)
      return this._catchLarva()
    }
    this._randomHead()
    this._updateLarva()
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
  _catchLarva(){
    this._updateScore( this.score + 1)
    // refill larva
    const {colNum, rowNum} = this.setting
    this.state = new Array(colNum * rowNum).fill(1)
    this._randomHead()
    this._updateLarva()
  }
  _gameEnd(){

  }
}

export default {
  components:{
    gameResult
  },
  data(){
    return {
      game : null,
      show : 'game',
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
    this.game.rescale()
    this.game.startLevel(1, ()=>{})
  },
  beforeDestroy(){
    if( this.game && this.game.destroy ){
      this.game.destroy()
    }
  }
};
</script>

<style scoped>
#game-view{
  width: 100vw;
  min-height: calc(100vw * 9 / 16);
  overflow: hidden;
}
canvas {display: block; background: blue;}
.floatBtn{position:fixed; top: 10px; right:10px}
.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
}
*.unselectable {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }
</style>