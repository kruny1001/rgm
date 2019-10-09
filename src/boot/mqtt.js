// https://www.npmjs.com/package/vue-mqtt
import Vue from 'vue'
import VueMqtt from 'vue-mqtt';
let url = 'wss://b-e01c9090-3e62-42e3-83fb-d7cac8107e41-1.mq.ap-northeast-2.amazonaws.com:61619/mqtt'
// 8162
let options = {
    clientId: 'WebClient-' + parseInt(Math.random() * 100000),
    username: "pio",
    password: "@whydots-pio1!"

}
Vue.use(VueMqtt, url, options);