<template>
  <div id="q-app">
    <!-- <pre>{{crntGame}} {{crntUser}} {{crntDescTitle}}</pre>  -->
    <desc-view class="desc-view" title="game12"></desc-view>
    <router-view />
  </div>
</template>

<script>
import descView from 'src/components/descView.vue'
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: 'App',
  components: {
      descView
  },
  computed:{
    ...mapGetters({ 
        crntGame: 'admin/getCrntGame',
        crntUser: 'admin/getUserLevel',
        crntDesc: "admin/getCrntDescTitle",
        crntCount: "admin/getCrntDescCount",
        crntDescTitle : "admin/getCrntDescTitle",
        imgSrc: "admin/getImgSrc",
        crntUser: 'admin/getUserLevel',
        statusDesc: "admin/getStatusDesc"
    })
  },
  watch: {
    crntGame(newVal){
      console.log(newVal)
      console.log(this.crntUser)
      if(this.crntUser != 'admin'){
        // this.$router.push(newVal)
      }
      
    }
  },
  methods: {
    ...mapActions({
      getConnected: 'admin/getConnected'

    })
  },
  mounted(){
    this.getConnected()
  }
}
</script>

<style>
 .desc-view{
    opacity: 0;
    display: none;
  }
</style>
