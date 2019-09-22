<template lang="pug">
  q-page
    div 피오깨우기
    section(style="margin: 0 auto; width:1200px;")
    section( id="game1" style="margin: 0 auto; width:100%; position:relative;")
      h3( style="position:absolute; bottom: 200px; width:100%; text-align:center;")  알을 흔들어주세요!
    q-btn(@click="loadResource()") loadResource
    q-btn(@click="getCached()") getCached
    q-btn(@click="createdContainer()") createdContainer
    pre {{resource}}
</template>
<script>
import GameResource from "boot/gameResource"
import Game2 from "boot/game2";
let resource = null
export default {
  data(){
    return{
      game: null,
      resource: null,
    }
  },
  created(){
    
  },
  methods:{
    //  dd
    destroy(){
      this.$destroy();
    },
    loadResource(){
      resource.bringAllResource()
    },
    getCached(){
      resource.getCached()
    },
    createdContainer(){
      resource.useCached()
    }
  },
  mounted() {
    resource = new GameResource()
    resource.getCached()
    // this.game = new Game2()
    // console.log(this.game)

    // this.game.createApp('game1')
    // const vm = this
    // this.game.loadContents()
    // window.addEventListener("devicemotion", event => {
    //     var x = event.acceleration.x;
    //     var y = event.acceleration.y;
    //     var z = event.acceleration.z;
    //     vm.acc = [x,y,z]
    //     const sensitive = 1000.5
    //     if( x**2 + y**2 > sensitive ) {
    //       vm.acc = [x,y,z,'shake']
    //       vm.total = x**2 + y**2
    //       console.log('shake')
    //       this.eggAni()
    //     }
    // })
  },
  beforeDestroy() {
    console.log('Main Vue destroyed')
    // this.destroy()
    delete this.game
  }
};
</script>
<style>
</style>