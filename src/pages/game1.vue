<template>
  <q-page id="game1" class="flex flex-center">
    <section>
      <!-- <q-btn @click="onLight()">보이기</q-btn>
      <q-btn @click="eggAni()">알보이기</q-btn> -->
      <pre> {{count}} {{total}}</pre>
      <q-btn @click="eggAni('colorChange2.R-B_')">Shaking Event 1</q-btn>
      <q-btn @click="eggAni('colorChange5.G-P_')">Shaking Event 2 </q-btn>
      <q-btn @click="eggAni('colorChange4.O-G_')">Shaking Event 3 </q-btn>
      <q-btn @click="eggAni('colorChange3.B-O_')">Shaking Event 4 </q-btn>
      <q-btn @click="eggAni('colorChange6.P--R_')">Shaking Event 5 </q-btn>
      <q-btn @click="eggAni()">Shaking Event 6 </q-btn>
      
    </section>

    <!-- https://jsfiddle.net/de2o3c5s/40/ -->
    <!-- <h1 style="position: fixed; top:180px;">알깨기 게임</h1> -->
    <!-- <div> content loader </div>
    <img :src="imageData">
    <img src="https://storage.cloud.google.com/dershare-db/fn.png">-->
    <!-- <h1 style="position: fixed; bottom:180px;">알을 흔들어주세요. {{counts}}</h1> -->

  </q-page>
</template>
<script>
import Game from 'boot/gameLib'
export default {
  data(){
    return {
      game: null,
      count: 0,
      acc: null
    }
  },
  methods:{
    eggAni(id){
      this.game.preAnimation(id)
      this.game.playFrameAnimation(id, this.count)
      this.game.changeText('hint', '4 번째 변화')
      this.count = this.count + 1
      if(this.count >= 24)
        this.count = 0
    }
  },
  mounted(){
    console.log(Game)
    this.game = Game
    this.game.createApp('game1')
    this.game.showText('알을 흔들어주세요.')
    this.game.loadContents()
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
          vm.eggAni('colorChange2.R-B_')
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
  border: 1px solid black;
}
</style>