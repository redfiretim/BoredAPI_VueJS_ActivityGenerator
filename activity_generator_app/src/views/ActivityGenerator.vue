<template>
  <div class="activity-generator">
    <ResultComponent />
    <router-link to="/activitygenerator">
      <button>Generate activity</button>
    </router-link>
  </div>
</template>




<script>
import ResultComponent from "../components/ResultComponent";

export default {
  name: "ActivityGenerator",
  components: {
      ResultComponent,
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
