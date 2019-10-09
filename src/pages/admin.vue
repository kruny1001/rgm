<template lang="pug">
section.q-pa-md
    div( class="sub" v-html="buff")
    pre {{crntGame}} : {{crntUser}}

    //- div 어드민 사용자 등록 하기 
    //- div.q-my-md 
    //-   q-btn(@click="setAdmin('admin')") 어드면 설정하기 
    
    publish
    hr
    sub1
    hr
    sub2
    hr
    sub3
    hr

    div.q-my-md
      q-btn(@click="closeDesc(); setCrntGame('start')") 시작페이지로 이동하기
      q-btn(@click="closeDesc(); setCrntGame('g11')") 아기피오 색칠하기 이동하기 
      q-btn(@click="closeDesc(); setCrntGame('g12')") 망토 색칠연습 이동하기 
      q-btn(@click="closeDesc(); setCrntGame('end')") 마치기 페이지로 이동하기

    q-btn(@click.prevent="playSound('brush')") brush
    q-btn(@click.prevent="playSound('colorchange')") colorchange
    q-btn(@clic.prevent="playSound('correct')") correct
    q-btn(@click.prevent="playSound('crack')") crack
    q-btn(@click.prevent="playSound('cute')") cute
    q-btn(@click.prevent="playSound('ding')") ding
    q-btn(@click.prevent="playSound('dingdong')") dingdong
    q-btn(@click.prevent="playSound('done')") done
    q-btn(@click.prevent="playSound('fail')") fail
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
import Publish from 'src/components/pub'
import Sub1 from 'src/components/sub1'
import Sub2 from 'src/components/sub2'
import Sub3 from 'src/components/sub3'

import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    Publish, Sub1, Sub2, Sub3
  },
  data(){
    return{
      buff: 'Sub1:<br>'
    }
  },
   mqtt: {
    'VueMqtt/+': function(val) {
      console.log('Trigger', 'VueMqtt/+/+/test')
    },
    'demo/#': function(val, topic) {
      var enc = new TextDecoder("utf-8");
      var msg = enc.decode(val)
      console.log('triggered: ', 'demo/#', msg, topic)
    },
    'param/param/param/test': function(val) {
      console.log('param/param/param/test')
    },
    'template/+' (data, topic) {
      if (topic.split('/').pop() === '12345') {
        console.log('topic:', 'template/12345')
      }
    },
    'template/+/param/param' (data, topic) {
      if (topic.split('/')[1] === '12345') {
        console.log('topic:', 'template/12345/param/param')
      }
    }
  },
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
      resetCount: 'admin/resetCount',
      playSound: 'sound/playSound'
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
  },
  mounted () {
    this.$mqtt.subscribe('VueMqtt/#')
    this.$mqtt.subscribe('demo/#')
    console.log(this.$mqtt)
  }
};
</script>
<style>
.sub {
  width: 31%;
  float: left;
  border: 1px solid #ccc;
  margin: 20px 1%;
  padding: 20px 0;
}
button {
  padding: 10px 20px;
}
</style>