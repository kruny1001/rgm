<template lang="pug">
section
  div {{ progress }} %
</template>
<script>
import GameLoader from "boot/gameResource"

export default {
  data(){return{
    progress: 0,
  }},
  mounted(){
    const loader = new GameLoader()
    const ll = loader.bringAllResource()
    ll.onProgress.add(() => {
      this.progress = ll.progress.toFixed(0)
    })
    ll.onError.add(()=>{})
    ll.onComplete.add(() => {
      this.progress = 100
      this.$router.replace('dev')
    })
    ll.load()
  }
}
</script>