<template>
  <section class="descContainer">
    <img style="width: 100%;" :src="imgSrc" />
    <!-- <q-btn @click="prevPage()">Before</q-btn>
    <q-btn @click="nextPage()">Next</q-btn> -->
  </section>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: {
    title: String
  },
  computed: {
    ...mapGetters({
      crntDesc: "admin/getCrntDescTitle",
      crntDescCount: "admin/getCrntDescCount",
      crntDescTitle : "admin/getCrntDescTitle",
      imgSrc: "admin/getImgSrc",
      crntUser: 'admin/getUserLevel',
      statusDesc: "admin/getStatusDesc"
    })
  },
  watch: {
    crntDesc(newVal){
      console.log(newVal)
      console.log(this.crntUser)
      // if(this.crntUser != 'admin')
      //   this.$router.push(newVal)
    },
    crntDescTitle(newVal){
      this.title = newVal
    },
    statusDesc(newVal){
      console.log("changeStatusDesc ",newVal)
      if(this.crntUser != 'admin'){
        console.log(newVal, " open or close desc")
        if(newVal){
          TweenMax.set('.desc-view', {display:"block"})
          TweenMax.to('.desc-view', 0.5, {
            css: {
              x: 0,
              y: 0
            },
            onComplete: ()=>{
              // this.destroy()
            }
          })
          TweenMax.to('.desc-view', 0.5, {opacity:1,})
        }
        else{
          TweenMax.to('.desc-view', 0.5, {
            css: { x: 150, y: -150 },
            onComplete: ()=>{ // this.destroy()
            }
          })
          TweenMax.to('.desc-view', 0.5, {opacity:0, display:'none'})
        }
      }
    }
      
  },
  methods: {
    // prevPage() {
    //   if (this.count > 1) {
    //     this.count = --this.count;
    //     this.imgSrc = `statics/${this.title}/desc/${this.count}.jpg`;
    //   }
    // },
    // nextPage() {
    //   if (this.count < this.max) {
    //     this.count = ++this.count;
    //     this.imgSrc = `statics/${this.title}/desc/${this.count}.jpg`;
    //   }
    // }
  }
  // created() {
  //   this.imgSrc = `statics/${this.title}/desc/${this.count}.jpg`;
  // }
};
</script>
<style scoped>
.descContainer {
  position: fixed;
  width: 100%;
  height: 100vh;
  /* background: yellow; */
  z-index: 99;
}
</style>