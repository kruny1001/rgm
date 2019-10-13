<template>
  <div class="publish">
    <button @click="publish1">Publish1 (Sub1 + Sub3)</button>
    <button @click="publish2">Publish2 (Sub2 + Sub3)</button>


  </div>
</template>

<script>
export default {
  methods: {
    publish1 () {
      let d = JSON.stringify({msg: 'message to Sub1', val:1})
      this.$mqtt.publish('VueMqtt/publish1', d)
    },
    publish2 () {
      this.$mqtt.publish('VueMqtt/publish2', 'message to Sub2')
    }
  },
  mqtt: {
    'VueMqtt/publish1' (data, topic) {
      let msg = String.fromCharCode.apply(null, data)
      // console.log(JSON.parse(msg))
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    },
    'VueMqtt/publish2' (data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    }
  }
}
</script>