<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <section style="margin: 0 auto; width:1200px;">
      <q-btn @click="loadContents()">load contents </q-btn>
      <q-btn @click="readyGame()">readyGame </q-btn>
      <q-btn @click="twinkle()"> Twinkle </q-btn>
      <hr/>
      <pre> CurrentCount: {{count}} SenstivityTotal: {{total}} Stage: {{stage}}</pre>
      <q-btn @click="eggAni()">Shaking Event </q-btn>
    </section>
    <section id="game1" style="margin: 0 auto; width:100%; position:relative;">
      <h3 style="position:absolute; bottom: 200px; width:100%; text-align:center;"> 알을 흔들어주세요!</h3>
    </section>
  </q-page>
</template>
<script>
import Game from 'boot/gameLib'
export default {
  data(){
    return {
      effects : [
      {name:'eggWhtieLight_',frame:24}, 
      {name:'eggRedLight_',frame:24}, 
      {name:'eggBlueLight_',frame:24}, 
      {name:'eggPurpleLight_', frame:24}, 
      {name:'eggGreenLight_', frame:24}, 
      {name:'eggOrangeLight_', frame:24}, 
      {name:'twinkle_', frame:36}, 
      ],
      eggs: [
        {name:'colorChange1.W-R_',frame:24}, 
        {name:'colorChange2.R-B_',frame:24}, 
        {name:'colorChange5.G-P_', frame:24}, 
        {name:'colorChange4.O-G_', frame:24}, 
        {name:'colorChange3.B-O_', frame:24}, 
        {name:'colorChange6.P--R_', frame:48}],
      stage: 0,
      game: null,
      count: 0,
      acc: null,
      total: 0,
    }
  },
  methods:{
    twinkle(){
      this.game.preAnimation('twinkle_', this.effects)
      this.game.playAllAnimation('twinkle_')
    },
    eggAni(){
      if(this.stage < 6){
        let id = this.eggs[this.stage].name
        let count = this.eggs[this.stage].frame
        let effectId = this.effects[this.stage].name
        let effectCount = this.effects[this.stage].frame

        this.game.preAnimation(id, this.eggs)
        this.game.playFrameAnimation(id, this.count)

        this.game.preAnimation(effectId, this.effects)
        this.game.playAllAnimation(effectId)
        
        this.count = this.count + 1
        if(this.count >= count){
          this.count = 0
          this.stage = this.stage + 1
          this.game.changeText('hint', `${this.stage} 번째 색깔이 변했어요!`)
        } 
      }
      else {
        this.twinkle()
      }
    },
    loadContents(){
      this.game.loadContents()
    },
    readyGame(){
      let id = this.eggs[this.stage].name
      let count = this.eggs[this.stage].frame
      this.game.preAnimation(id)
      this.game.playFrameAnimation(id, this.count)
    }
  },
  created(){
    
    
  },
  mounted(){
    this.game = Game
    this.game.createApp('game1')
    // this.game.showText('알을 흔들어주세요.')
    const vm = this
    window.addEventListener("devicemotion", event => {
        var x = event.acceleration.x;
        var y = event.acceleration.y;
        var z = event.acceleration.z;
        // need to define shake rule
        vm.acc = [x,y,z]
        const sensitive = 1000.5
        if( x**2 + y**2 > sensitive ) {
          vm.acc = [x,y,z,'shake']
          vm.total = x**2 + y**2
          console.log('shake')
          eggAni()
          // trigger shake action from here
        }
    })

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