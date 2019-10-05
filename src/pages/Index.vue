<template lang="pug">
  q-page( id="game1" class="flex flex-center")
    q-list.q-ma-md( bordered separator style="width:100%;")
      q-item( clickable v-ripple)
        q-item-section Game List   

      q-item( clickable v-ripple v-for="(item, idx) in menu" @click="goTo(item.link)" :key="idx")
        q-item-section
          q-item-label {{item.name}}
          q-item-label( caption) Caption 
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
    return {
      menu: [
        {name: "[1회기] 알 부화시키기", link:"g1"},
        {name: "[2회기] 아기피오 재우기", link:"g2"},
        {name: "[3회기] 애벌레 잡기", link:"g3"},
        {name: "[5회기] 동작가르치기", link:"g4"},
        {name: "[5회기] 대왕 애벌레 잡기", link:"g5"},

        {name: "[2회기] 아기피오 색칠하기", link:"g11"},
        {name: "[3회기] 망토 색칠하기", link:"g12"},
      ],
      imageData: null, 
      counts:0,
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
    goTo(link){
      this.$router.push(link)
    }

    
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