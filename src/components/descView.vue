<template>
    <q-page class="descContainer">
        <img style="width: 100%;" :src="imgSrc">
        <q-btn @click="prevPage()"> Before </q-btn>
        <q-btn @click="nextPage()"> Next </q-btn>
    </q-page>
</template>
<script>

export default {
    data(){return{
        count: 1,
        max: 12,
        imgSrc: ""
    }},
    methods:{
        prevPage(){
            if(this.count > 1){
                this.count = --this.count
                this.imgSrc= `statics/game12/desc/${this.count}.jpg`
            }
        },
        nextPage(){
            if(this.count < this.max){
                this.count = ++this.count
                this.imgSrc= `statics/game12/desc/${this.count}.jpg`
            }
            
        }
    },
    created(){
        this.imgSrc= `statics/game12/desc/${this.count}.jpg`
    }
}
</script>
<style scoped>
.descContainer{
    position:fixed;
    width: 100%;
    height: 100vh;
    background: yellow;
}
</style>