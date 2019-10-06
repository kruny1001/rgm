<template lang="pug">
section.q-pa-md
    
    pre {{crntGame}} : {{crntUser}}

    div 어드민 사용자 등록 하기 
    div.q-my-md 
      q-btn(@click="setAdmin('admin')") 어드면 설정하기 

    div 현제게임 설정 
    div.q-my-md
      q-btn(@click="setCrntGame('g11')") g11 이동하기 
      q-btn(@click="setCrntGame('g12')") g12 이동하기 


    div 설명창 열기
    div.q-my-md


    div.q-my-md
      q-btn(@click="setCrntGame('g12')") 마치기 페이지로 가기
    

    

</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed:{
    ...mapGetters({ 
        crntGame: 'admin/getCrntGame',
        crntUser: 'admin/getUserLevel',
    })
  },
  methods: {
    ...mapActions({
      setCrntGame: 'admin/setCrntGame',
      setAdmin: 'admin/setAdmin'

    })
  },
  watch: {
    getCrntGameId(newVal){
      if(this.crntUser != 'admin')
        this.$router.push(newVal)
    }
  },
  created(){
    this.setAdmin('admin')
  }
};
</script>