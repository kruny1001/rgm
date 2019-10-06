<template lang="pug">
section.q-pa-md
    
    pre {{crntGame}} : {{crntUser}}

    //- div 어드민 사용자 등록 하기 
    //- div.q-my-md 
    //-   q-btn(@click="setAdmin('admin')") 어드면 설정하기 

    div.q-my-md
      q-btn(@click="closeDesc(); setCrntGame('start')") 시작페이지로 이동하기
      q-btn(@click="closeDesc(); setCrntGame('g11')") 아기피오 색칠하기 이동하기 
      q-btn(@click="closeDesc(); setCrntGame('g12')") 망토 색칠연습 이동하기 
      q-btn(@click="closeDesc(); setCrntGame('end')") 마치기 페이지로 이동하기
    
    //- div.q-my-md
    //-   q-btn(@click="openDesc()") 설명창 뛰우기
    //-   q-btn(@click="closeDesc()") 설명창 감추기
    
    //- div.q-my-md
    //-   q-btn(@click="setDescTitle('game11')") 아기피오 색칠하기 설명 설정
    //-   q-btn(@click="setDescTitle('game12')") g12 설명 설정
    
    div.q-my-md
      q-btn( @click="startDesc('game11')") 아기피오 색칠하기 설명 열기
      q-btn( @click="startDesc('game12')") 망토 색칠연습 설명 열기
      q-btn( @click="closeDesc()") 설명창 닫기
    
    div.q-my-md
      q-btn( @click="descDescTitle()") 설명 이전 페이지
      q-btn( @click="incDescTitle()") 설명 다음 페이지

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
      setAdmin: 'admin/setAdmin',
      openDesc: 'admin/openDesc',
      closeDesc: 'admin/closeDesc',
      setDescTitle: 'admin/setDescTitle',
      incDescTitle: 'admin/incDescTitle',
      descDescTitle: 'admin/descDescTitle',
      openDesc: 'admin/openDesc',
      closeDesc: 'admin/closeDesc',
      resetCount: 'admin/resetCount'
    }),
    async startDesc(id){
      console.log(id)
      await this.closeDesc()
      await this.setDescTitle(id)
      await this.resetCount()
      await this.openDesc()
      this.incDescTitle()
      this.descDescTitle()
    },
    async endDesc(){
      await this.resetCount()
      await this.closeDesc()
    }
  },
  watch: {
    // getCrntGameId(newVal){
    //   if(this.crntUser != 'admin')
    //     this.$router.push(newVal)
    // }
  },
  created(){
    this.setAdmin('admin')
  }
};
</script>