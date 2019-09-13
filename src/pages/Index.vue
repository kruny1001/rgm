<template>
  <q-page id="game1" class="flex flex-center">
    <q-btn @click="onLight()">보이기</q-btn>
    <!-- <h1 style="position: fixed; top:180px;">알깨기 게임</h1> -->
    <!-- <div> content loader </div>
    <img :src="imageData">
    <img src="https://storage.cloud.google.com/dershare-db/fn.png">-->
    <!-- <h1 style="position: fixed; bottom:180px;">알을 흔들어주세요. {{counts}}</h1> -->
  </q-page>
</template>

<style>
</style>

<script>
import * as PIXI from "pixi.js";
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
import {PixiPlugin} from "gsap/PixiPlugin";
PixiPlugin.registerPIXI(PIXI);
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let app
let frames
let frames2
let redEggs
let yellowEggs
let orangeEggs
let gameScene
let cardImg
let orangeLight
export default {
  name: "PageIndex",
  data() {
    return { imageData: null, counts:0 };
  },
  methods: {
    showYellow(){
      yellowEggs.visible = true
    },
    onClick(e, id) {
      // TweenMax.to(orangeEggs, 1, {
      //   pixi: {scale: 1, x: 500 , y: 200, lineWidth: 5, fillColor: 0x0088f7 }
      // });
      console.log(orangeEggs)
      TweenMax.to(cardImg, 1, {
        pixi: { x: 500, lineWidth: 5, fillColor: 0x0088f7 }
      });
      this.counts = this.counts + 1
      orangeEggs.gotoAndStop(this.counts)
      this.$forceUpdate();
    },
    assignSprite(tempFrames, asset, id){
      const anim = new PIXI.AnimatedSprite(tempFrames);
      anim.loop = false;
      // anim.x = screen.width / 2;
      anim.y = screen.height / 2;
      anim.x = screen.width / 2;
      anim.height = 200.5 //asset.height;
      anim.width = 200.5 //asset.width;
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.6;
      // anim.play();
      // app.stage.addChild(anim);
      
      anim.interactive = true;
      anim.on("tap", event => {
        console.log(1);
      });

      console.log(anim);
      anim.size = 1;
      var vm = this
      anim.on('pointerdown', (e)=>{
        this.onClick(e, id)
      })
      return anim
    },
    onLightAssetLoaded(){
      let frame1 = []
      for (let i = 0; i < 25; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        frame1.push(PIXI.Texture.from(`eggOrangeLight_${val}.png`));
      }
      orangeLight = this.assignSprite(frame1, {height: 10, width:10, x: 100},4)
    },
    onAssetsLoaded() {
      // create an array of textures from an image path
      for (let i = 1; i < 25; i++) {
        let val = "000";
        if (i < 10) val = `00${i}`;
        else val = `0${i}`;
        frames.push(PIXI.Texture.from(`colorChange1.W-R_${val}.png`));
        frames2.push(PIXI.Texture.from(`colorChange1.W-R_${val}.png`))
      }
      redEggs = this.assignSprite(frames, {height: 100, width:100, x: 100},1)
      yellowEggs = this.assignSprite(frames2, {height: 200, width:100, x: 200},2)
      orangeEggs = this.assignSprite(frames, {height: 100, width:100, x: 300},3)
    },
    onLight(){
      let lightContainer = new PIXI.Container();
      // gameScene.addChild(orangeLight);
      lightContainer.addChild(orangeLight);
      lightContainer.scale.x =0.5
      lightContainer.scale.y =0.5
      gameScene.addChild(lightContainer);
      orangeLight.scale.x  = 1
      orangeLight.scale.y  = 1
      orangeLight.gotoAndPlay(1)
    },
    async loadContents() {
      app = new PIXI.Application({
        // transparent: true,
        width: 700,
        height: 900,
        antialias: true,
        backgroundColor: 0xFFFFFF
      });

      document.querySelector("#game1").appendChild(app.view);

      gameScene = new PIXI.Container();
      app.stage.addChild(gameScene);
      cardImg = new PIXI.Container();

      var graphics = new PIXI.Graphics();
      graphics.lineStyle(2, 0xffffff, 1);
      graphics.beginFill(0xff00bb, 0.25);
      graphics.drawRoundedRect(10, 10, 100, 100, 5);
      graphics.endFill();
      cardImg.addChild(graphics);
      gameScene.addChild(cardImg);

      const basicText = new PIXI.Text("알을 흔들어주세요.");
      basicText.x = app.screen.width / 2;
      basicText.y = app.screen.height / 4;

      app.stage.addChild(basicText);
      console.log(basicText)
      basicText.text = '색깔이 변했어요!'
      TweenMax.to(basicText, 1, {
        pixi: { x: 500, y:751.17}
      });

      // await app.loader.add("statics/ani/take1-0.json").load(this.onAssetsLoaded);

      await app.loader
        .add("statics/game1/lights/blueLight-0.json")
        .add("statics/game1/lights/blueLight-1.json")
        .add("statics/game1/lights/blueLight-2.json")
        .add("statics/game1/lights/blueLight-3.json")
        .add("statics/game1/lights/blueLight-4.json")
        .add("statics/game1/lights/blueLight-5.json")
        .add("statics/game1/lights/blueLight-6.json")
        .add("statics/game1/lights/blueLight-7.json")
        .add("statics/game1/lights/blueLight-8.json")
        .add("statics/game1/lights/blueLight-9.json")
        .add("statics/game1/lights/blueLight-10.json")
        .add("statics/game1/lights/blueLight-11.json")
        .add("statics/game1/lights/blueLight-12.json")
        .add("statics/game1/lights/blueLight-13.json")
        .add("statics/game1/lights/blueLight-14.json")
        .add("statics/game1/lights/blueLight-15.json")
        .add("statics/game1/lights/blueLight-16.json")
        .add("statics/game1/lights/blueLight-17.json")
        .load(this.onLightAssetLoaded);

    }
  },
  mounted() {
    frames = []
    frames2 = []
    
    this.loadContents();
  }
};
</script>
<style>
#game1{
  /* background: blue; */
}
canvas {
  border:1px solid black;
  margin: 7px;
  padding: 20px;
}
</style>