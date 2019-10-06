<template>
  <q-page class="descContainer">
    <img style="width: 100%;" :src="imgSrc" />
    <!-- <q-btn @click="prevPage()">Before</q-btn>
    <q-btn @click="nextPage()">Next</q-btn> -->
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: {
    title: String
  },
  computed: {
    ...mapGetters({
      crntDesc: "admin/getCrntDesc",
      crntCount: "admin/getCrntDescCount",
      crntDescTitle : "admin/getCrntDescTitle",
      imgSrc: "admin/getImgSrc",

    })
  },
  watch: {
    crntDesc(newVal){
      console.log(newVal)
      console.log(this.crntUser)
      if(this.crntUser != 'admin')
        this.$router.push(newVal)
    },
    crntDescTitle(newVal){
      this.title = newVal
    },
  },
  data() {
    return {
    };
  },
  methods: {
    prevPage() {
      if (this.count > 1) {
        this.count = --this.count;
        this.imgSrc = `statics/${this.title}/desc/${this.count}.jpg`;
      }
    },
    nextPage() {
      if (this.count < this.max) {
        this.count = ++this.count;
        this.imgSrc = `statics/${this.title}/desc/${this.count}.jpg`;
      }
    }
  },
  created() {
    this.imgSrc = `statics/${this.title}/desc/${this.count}.jpg`;
  }
};
</script>
<style scoped>
.descContainer {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: yellow;
}
</style>