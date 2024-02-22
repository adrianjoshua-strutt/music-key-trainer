<template>
  <div class="home">
    <h1>Can you guess the key ? </h1>
    <template v-if="selectedMidiPath">
      <p>
        <Midi :midiFilePath="selectedMidiPath"/>
      </p>
      <template v-if="!showSolution">
        <div class="showSolution">
          <button class="button" @click="showSolution = true">Show the key</button>
        </div>
      </template>
      <template v-else>
        <div class="newMidi">
          <button class="button" @click="selectNewMidiPath">Give me a new one</button>
        </div>
        <div class="solution">
            <h3>The key is: {{ solution }}</h3>
        </div>
      </template>
    </template>
    <template v-else>
      <h3>Could not load midi file</h3>
    </template>
  </div>
</template>

<script>

import { ref, onMounted, computed } from 'vue'

import Midi from '../components/Midi.vue';

export default {
  name: 'Home',
  components: {
    Midi
  },
  setup(){

    const allMidiFiles = ref([]);

    onMounted(() => {
      const imported = require.context("/public/midis/", true, /\.mid$/)
      allMidiFiles.value = imported.keys().map(p => ("./midis" + p.substring(1)))
      selectNewMidiPath()
    })

    const showSolution = ref(false);
    const solution = computed(() => {
      const solutionSplit = selectedMidiPath.value.split("/")
      const scale = solutionSplit[3]
      const key = solutionSplit[4].split("-")[0]
      return key + " " + scale
    })

    const selectedMidiPath = ref('');
    const selectNewMidiPath = () => {
      selectedMidiPath.value = allMidiFiles.value[Math.floor((Math.random()*allMidiFiles.value.length))];
      showSolution.value = false;
      console.log(selectedMidiPath)
    }

    return {showSolution, solution, selectedMidiPath, selectNewMidiPath, onMounted}
  }
}
</script>

<style scoped>

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .button {
    background-color: #95c0ac;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 13px;
  }
  .button:hover {
    background-color: #c8d7c8; /* Green */
    color: white;
    cursor: pointer;
  }

  .showSolution{
    margin-top: 20px;
  }

  .solution{
    margin-top: 20px;
  }

  .newMidi{
    margin-top: 20px;
  }

</style>
