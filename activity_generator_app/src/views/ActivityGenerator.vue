<template>
  <div class="container">
    <div class="activity-generator">
      <div class="result-container">
        <div class="loading-border" v-if="loading === true">
          <div class="loading-msg" data-text="Loading...">Loading...</div>
        </div>
        <ResultComponent :output="output.data" :errored="errored" v-if="loading === false"></ResultComponent>
      </div>
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
      errored: false
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
.container {
  min-width: 14rem;
  max-width: 22rem;
  padding-top: 5vh;
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
/* height needs to be tweaked */
  height: 50vh;  
}

.loading-border{
  border:solid 3px #a4a4a4;
  height: 100%;
}

.loading-msg {
  margin: 7rem 0rem;
  position: relative;
  color: lightgrey;
  font-weight: bold;
}

/* loading animation */
.loading-msg:before {
  content: attr(data-text);
  position: absolute;
  overflow: hidden;
  max-width: 8rem;
  height: 3rem;
  white-space: nowrap;
  color: #3cf1aa;
  animation: loading 3s linear;
}
@keyframes loading {
  0% {
    max-width: 0;
  }
}
</style>
