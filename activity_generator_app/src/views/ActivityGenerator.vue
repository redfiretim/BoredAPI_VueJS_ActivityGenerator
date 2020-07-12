<template>
  <div class="container">
    <div class="activity-generator">

      <!-- only shows if http req gives an error -->
      <div class="error-text" v-if="errored === true">Oops, something went wrong!</div>

      <div class="result-container">
        
        <!-- Loading Screen for processing request -->
        <div class="loading-border" v-if="loading === true">
          <div class="loading-msg" data-text="Loading...">Loading...</div>
        </div>

        <!-- Result render -->
        <ResultComponent :output="output.data" :errored="errored" v-if="loading === false"></ResultComponent>
      
      </div>
      
      <!-- Button to do another request -->
      <router-link to="/activitygenerator" v-if="loading === false">
        <button v-on:click="generateNewActivity()">Generate activity</button>
      </router-link>
    
    </div>
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
      errored: false,
    };
  },
  mounted: function() {
    this.generateNewActivity();
  },
  methods: {
    generateNewActivity() {
      this.loading = true;

      axios
        .get("http://www.boredapi.com/api/activity/")
        .then(response => {
          this.output = response;
          this.errored = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
      .finally(() => (this.loading = false));
    }
  }
};
</script>




<style scoped>
.error-text{
  color: red;
  font-weight: bolder;
  margin-bottom: 2rem;
}

.container {
  min-width: 14rem;
  max-width: 22rem;
  padding-top: 3vh;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
}

.router-link-active {
  width: 97%;
}

button {
  background-color: #3cf1aa;
  border: solid 3px #a4a4a4;
  padding: 15px;
  color: black;
  font-size: xx-large;
  font-weight: bold;
  width: 100%;
  margin-bottom: 2rem;
}

button:hover {
  background-color: #a7ffdc;
}

/* remove default black outline when clicking on button */
button:active {
  outline: none;
}

.result-container {
  margin-bottom: 0.5rem;
}

.loading-border{
  height: 19rem;
}

.loading-msg {
  margin: 7rem 0rem;
  position: relative;
  color: lightgrey;
  font-weight: bold;
  font-size: xx-large;
}

/* loading animation */
.loading-msg:before {
  content: attr(data-text);
  position: absolute;
  overflow: hidden;
  max-width: 10rem;
  height: 3rem;
  white-space: nowrap;
  color: #3cf1aa;
  animation: loading 1s ease-out;
}
@keyframes loading {
  0% {
    max-width: 0;
  }
}
</style>
