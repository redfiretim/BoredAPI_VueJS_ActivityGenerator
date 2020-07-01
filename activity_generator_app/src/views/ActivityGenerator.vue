<template>
  <div class="activity-generator">
    <div class="result-container">
      <div class="loading-msg" v-if="loading === true">Loading...</div>
      <ResultComponent 
        :output="output.data" 
        :errored="errored"
        v-if="loading === false"
      >
      </ResultComponent>
    </div>
    <router-link to="/activitygenerator" v-if="loading === false">
      <button v-on:click="generateNewActivity()">Generate activity</button>
    </router-link>
  </div>
</template>




<script>
import ResultComponent from "../components/ResultComponent";
const axios = require("axios");

export default {
  name: "ActivityGenerator",
  components: {
    ResultComponent
  },
  data: function() {
    return {
      output: null,
      loading: true,
      errored: false
    };
  },
  mounted: function() {
    this.generateNewActivity();
  },
  methods: {
    generateNewActivity(){
      this.loading = true

      axios.get("http://www.boredapi.com/api/activity/")
        .then(response => {
          this.output = response
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
  }
};
</script>




<style scoped>

.activity-generator{
	display: grid;
	grid-template-columns: 1 1 1;
	grid-template-rows: 1 1 1;
	justify-content: center;
	padding-top: 20vh;
}

.router-link-active{
  grid-column: 2;
	grid-row: 3;
}

button {
  background-color: #3cf1aa;
  border: solid 3px #a4a4a4;
  padding: 20px;
  color: black;
  font-size: xx-large;
  font-weight: bold;
}

button:hover {
  background-color: #a7ffdc;
}

/* remove default black outline when clicking on button */
button:active {
  outline: none;
}

.result-container{
  border: solid 3px #a4a4a4;
  margin-bottom: 0.5rem;
  width: 30%;
  grid-column: 2;
	grid-row: 2;
}

</style>
