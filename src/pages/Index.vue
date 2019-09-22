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

export default {
  name: "PageIndex",
  data() {
    return { imageData: null, counts:0 };
  },
  methods: {
    ...mapActions({
      createGame : 'game1/createGame',
    }),
    
  },
  mounted() {

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