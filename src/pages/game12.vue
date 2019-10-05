<template>
  <q-page class="">
    <desc-view class="desc-view"></desc-view>
    <div> 망토색칠</div>
    <div id="debugTool">
      <q-btn @click="showDesc()"> Show Desc</q-btn>
      <q-btn @click="hideDesc()"> Hide Desc</q-btn>
    </div>
  </q-page>
</template>
<script>
import descView from 'src/components/descView.vue'
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
export default {
  components: {
      descView
  },
  methods:{
    
    hideDesc(){
      TweenMax.to('.desc-view', 0.5, {
        css: { x: 150, y: -150 },
        onComplete: ()=>{ // this.destroy()
        }
      })
      TweenMax.to('.desc-view', 0.3, {opacity:0})
    },
    showDesc(){
      TweenMax.to('.desc-view', 0.5, {
        css: {
          x: 0,
          y: 0
        },
        onComplete: ()=>{
          // this.destroy()
        }
      })
      TweenMax.to('.desc-view', 0.3, {opacity:1})
    }
  }

  
}
</script>
