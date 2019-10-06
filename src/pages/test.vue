<template>
  <section class="row">
    <div v-html="bird"></div>
    <div v-html="cape"></div>
  </section>
</template>
<script>
export default {
  data(){
    return {
      cape: '',
      bird: '',
    }
  },
  mounted(){
    this.cape = localStorage.getItem('capeSVG') || ''
    this.bird = localStorage.getItem('pioSVG') || ''
  }
};
</script>