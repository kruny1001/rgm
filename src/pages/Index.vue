<template lang="pug">
  q-page( id="game1" class="flex flex-center")
    a( href="/#/g1") game 1
    a( href="/#/g2") game 2
    a( href="/#/g3") game 3

</template>

<style>
</style>

<script>
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
import {PixiPlugin} from "gsap/PixiPlugin";
import { mapGetters, mapActions, mapState } from "vuex";
import GameLoader from "boot/gameResource"

let resource = null

export default {
  name: "PageIndex",
  data() {
    return { imageData: null, counts:0,
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
        {name: "game3Sprite", src:"statics/game3/game3.json"},
      ],
    };
  },
  methods: {
    ...mapActions({
      createGame : 'game1/createGame',
    }),
    
  },
  mounted() {
    resource = new GameLoader()  
    resource.bringAllResource(this.targetResource)
    // this.bringAllResource(this.targetResource)
  }
};
</script>

<style>
#game1{
  /* background: blue; */
}
canvas {
  border:1px solid black;
  margin: 7px;
  padding: 20px;
}
</style>