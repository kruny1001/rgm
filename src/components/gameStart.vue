<template lang="pug">
    .startContainer
        .title {{title}}
        .desc 시작 버튼을 눌러주세요.
        q-btn.startBtn(@click="hideComp") 시작
</template>
<script>
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
export default {
    props: {
        title: String,
        show: Boolean
    },
    watch:{
        show(newVal){
            
            if(!newVal){
                console.log(newVal)
                TweenMax.to('.startContainer', 1, {opacity:0})
            }
            else{
                console.log(newVal)
                TweenMax.to('.startContainer', 1, {opacity:1})
            }
                
        }
    },
    methods:{
        hideComp(){
            TweenMax.to('.startContainer', 2, {opacity:0})
        },
        showComp(){
            TweenMax.to('.startContainer', 2, {opacity:1})
        }
    }
}
</script>
<style>
body{
  overflow-y:hidden !important;
}
.startContainer{
    position:absolute;
    height: 100vh;
    width:100%;
    background: yellow;
    z-index: 99;
}

.title{
    padding: 60px; 
    margin: 20px;
    border-radius: 100px;
    background: white;
    font-size: 3rem;
    text-align: center;
}

.desc {
    font-size: 2rem;
    text-align: center;
}

.startBtn{
    background: white;
    border-radius: 50%;
    width: 300px; 
    height: 300px;
    margin: 10px auto;
    display: block;
}
</style>