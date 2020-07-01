<template>
  <div class="activity-generator">
    <p>{{output}}</p>
    <ResultComponent></ResultComponent>
    <router-link to="/activitygenerator">
      <button >Generate activity</button>
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
  watch: {
    output: function(newVal, oldVal) {
      console.log('output changed: ', newVal, ' | was: ', oldVal);
    }
  }
};
</script>




<style scoped>
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
</style>
