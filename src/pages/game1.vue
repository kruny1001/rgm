<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <section style="margin: 0 auto; width:1200px;">
      <!-- <q-btn @click="loadContents()">load contents </q-btn>
      <q-btn @click="readyGame()">readyGame </q-btn> -->
      <q-btn @click="twinkle()"> Twinkle </q-btn>
      <!-- <q-btn @click="bringAllResource()"> bringAllResource </q-btn> -->
      <!-- <q-btn @click="getCached()"> getCached </q-btn> -->
      <q-btn @click="loadGame()"> START </q-btn>
      <hr/>
      <pre> CurrentCount: {{count}} SenstivityTotal: {{total}} Stage: {{stage}}</pre>
      <q-btn @click="eggAni()">Shaking Event {{stage}} </q-btn>
      <hr/>
    </section>
    <div>{{seconds}}</div>

    <section ref="game1" style="margin: 0 auto; width:100%; position:relative;">
      <h3 style="position:absolute; bottom: 200px; width:100%; text-align:center;"> {{crntDesc}}</h3>
    </section>
    <q-btn @click="loadGame()"> startGame </q-btn>

  </q-page>
</template>
<script>

import {GameClass} from 'boot/gameLib'
import GameLoader from "boot/gameResource"
let resource = null

export default {
  data(){
    return {
      seconds: 0,
      level: {
        rounds:     [20, 20, 30, 30, 40, 50],
        timelimit:  [12, 12, 18, 18, 24, 32],
      },
      crntDesc: "알을 흔들어주세요.",
      targetResource: [
        {name: "game1Sprite0", src:"statics/game1/game1-0.json"},
        {name: "game1Sprite1", src:"statics/game1/game1-1.json"},
        {name: "game1Sprite2", src:"statics/game1/game1-2.json"},
        {name: "game1Sprite3", src:"statics/game1/game1-3.json"},
        {name: "game1Sprite4", src:"statics/game1/game1-4.json"},
        {name: "game1Sprite5", src:"statics/game1/game1-5.json"},
        {name: "game1Sprite6", src:"statics/game1/game1-6.json"},
        {name: "game1Sprite7", src:"statics/game1/game1-7.json"},
        {name: "game1Sprite8", src:"statics/game1/game1-8.json"},
        {name: "game1Sprite9", src:"statics/game1/game1-9.json"},
      ],
      effects : [
        {name:'eggWhtieLight_',frame:24}, 
        {name:'eggRedLight_',frame:24}, 
        {name:'eggBlueLight_',frame:24}, 
        {name:'eggOrangeLight_', frame:24}, 
        {name:'eggGreenLight_', frame:24}, 
        {name:'eggPurpleLight_', frame:24}, 
        {name:'twinkle_', frame:36}, 
      ],
      eggs: [
        {name:'colorChange1.W-R_',frame:24}, 
        {name:'colorChange2.R-B_',frame:24}, 
        {name:'colorChange3.B-O_', frame:24},
        {name:'colorChange4.O-G_', frame:24},
        {name:'colorChange5.G-P_', frame:24}, 
        {name:'colorChange6.P--R_', frame:48}
      ],
      stage: 0,
      game: null,
      count: 0,
      acc: null,
      total: 0,
      counter: null

    }
  },

  methods:{
    loadGame() {
      // this.game.createApp('game1')
      const vm = this
      // this.game.loadContents()
      window.addEventListener("devicemotion", event => {
          var x = event.acceleration.x;
          var y = event.acceleration.y;
          var z = event.acceleration.z;
          vm.acc = [x,y,z]
          const sensitive = 1000.5
          if( x**2 + y**2 > sensitive ) {
            vm.acc = [x,y,z,'shake']
            vm.total = x**2 + y**2
            console.log('shake')
            this.eggAni()
          }
      })
      this.game.addAnimatedSprite()
      this.game.app.renderer.plugins.prepare.upload(this.game.app.stage, () => {
          this.game.app.start();
      });
    },
    twinkle(){
      this.game.preAnimation('twinkle_', this.effects)
      this.game.playAllAnimation('twinkle_')
    },
    eggAni(){
      if(this.stage < 6){
        this.crntDesc = "알을 흔들어주세요."
        let id = this.eggs[this.stage].name
        this.targetCount = this.eggs[this.stage].frame
        let effectId = this.effects[this.stage].name
        let effectCount = this.effects[this.stage].frame
        this.game.preAnimation(id, this.eggs)
        this.game.playFrameAnimation(id, this.count)
        this.game.preAnimation(effectId, this.effects)
        this.game.playAllAnimation(effectId)

        this.count = this.count + 1
        if(this.count >= targetCount){
          this.count = 0
          this.stage = this.stage + 1
          
          this.crntDesc = "색깔이 변했어요!"
          this.endSecCount()
        } 
      }
      else {
        this.twinkle()
        this.crntDesc = "생명 에너지가 전해졌어요!"
      }
    },
    startSecCount(){
      this.seconds = 0;
      var vm = this;
      function incrementSeconds() { 
        vm.seconds += 1
      }
      this.counter = setInterval(incrementSeconds, 1000);
    },
    startGame(){
      this.startSecCount()
    },
    endSecCount(){
      clearInterval(this.counter);
    },
  },
  created(){
  },
  mounted(){
    // this.loadGame()
    // console.log(resource)
    this.game = new GameClass(this.$refs.game1)
    this.loadGame()
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
  margin:10px auto;
  /* border: 1px solid black; */
  display: block;
  /* margin: 0 auto; */
}
</style>