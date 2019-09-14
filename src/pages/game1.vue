<template>
  <q-page id="game1" class="flex flex-center">
    <section>
      <!-- <q-btn @click="onLight()">보이기</q-btn>
      <q-btn @click="showEgg()">알보이기</q-btn> -->
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
      game: null
    }
  },
  mounted(){
    console.log(Game)
    this.game = Game
    this.game.createApp('game1')
    this.game.showText('알을 흔들어주세요.')
    this.game.loadContents()

    // let gameObj = new Game()
    // console.log(gameObj)
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