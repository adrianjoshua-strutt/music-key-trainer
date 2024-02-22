<template>
    <div>
      <midi-player :src="midiFilePathEscaped" sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"> </midi-player>
    </div>
</template>

<script>

import { ref, onMounted, computed } from 'vue';

export default {
  props: {
    midiFilePath: String,
  },
  setup(props) {

    let isPlaying = ref(false);
    
    const midiFilePathEscaped = computed(() => {
      return encodeURI(props.midiFilePath).replace("#","%23");
    })

    const playMidi = () => {
      isPlaying.value = true;  
    };

    const stopMidi = () => {
      isPlaying.value = false;  
    };

    onMounted(() => {
      let script = document.createElement('script')
      script.setAttribute('src', 'https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.23.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.5.0')
      document.head.appendChild(script)
    })

 
    return {
      midiFilePathEscaped,
      isPlaying,
      playMidi,
      stopMidi,
      onMounted,
    };
  },
};
</script>

<style scoped>

  .buttonBasic {
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
  }
  .buttonBasic:hover {
    color: white;
    cursor: pointer;
  }
  .buttonBasic:disabled {
    cursor: not-allowed;
    background-color: #a5a5a5;
  }

  .buttonStart {
    background-color: #79ec5c;
  }
  .buttonStart:hover {
    background-color: #42b983;
  }
  .buttonStop {
    background-color: #f88b55;
  }.buttonStop:hover {
    background-color: #ef7c25;
  }
  
  

</style>