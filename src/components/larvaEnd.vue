<template lang="pug">
div.full-size(class="row justify-center items-center")


</template>
<script>



export default {
  props:{
    count: [Number, String],
  },
  data(){ return {
    msg: 0
  }},
  methods:{
    init(){
      this.msg = 1
      setTimeout( () => {
        this.msg = 2
        setTimeout( () => {
          this.msg = 0
          this.$emit('done')
        }, 1000)
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.full-size
  width: 100%
  height: 100%
.msg-box
  padding: 51.08px 75.12px
  background: rgb(249,215,57)
.level-msg,
.start-msg
  font-size: calc( 225.35px  - 102.16px )
  line-height: calc( 225.35px  - 102.16px )
  color: #2c4147


</style>