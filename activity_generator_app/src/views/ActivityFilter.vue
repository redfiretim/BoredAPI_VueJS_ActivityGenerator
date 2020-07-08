<template>
  <div class="container">
      <div class="component-container">
        <div class="loading-border" v-if="loading === true">
          <div class="loading-msg" data-text="Loading...">Loading...</div>
        </div>
        <FilterFormComponent 
          v-if="(filterForm === true) && (loading === false)" 
          v-on:processForm="runAxiosReq"
        ></FilterFormComponent>
        <ResultComponent 
          :output="output.data" 
          :errored="errored" 
          v-if="(loading === false) && (filterForm === false) && (output !== null)"
        ></ResultComponent>
      </div>
  </div>
</template>




<script>
const axios = require("axios");
import ResultComponent from "../components/ResultComponent";
import FilterFormComponent from "../components/FilterFormComponent";

export default {
  name: "ActivityFilter",
  components: {
    ResultComponent,
    FilterFormComponent,
  },
  data: function() {
    return {
      output: null,
      loading: false,
      errored: false,
      filterForm: true,
      participants: null,
    };
  },
  methods: {
    runAxiosReq: function(participantsValue){
      console.log(participantsValue + ` <-- parVal in parent`);
      
      if((participantsValue > 0) && (participantsValue < 6)){
        this.participants = `participants=` + participantsValue;
      }

      // Run Axios request
      // NEEDS TO RUN LAST!!
      this.findNewActivity(this.participants)

    },
    findNewActivity: function(participants) {
      this.loading = true;

      axios
        .get("http://www.boredapi.com/api/activity?" + participants)
        .then(response => {
          this.output = response;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
      .finally(() => {
        this.loading = false;
        this.filterForm = false;

        console.log(this.output.data.activity + ` <-- output API`);
        });
    }
  }
};
</script>




<style scoped>

.container {
  min-width: 14rem;
  max-width: 30rem;
  padding-top: 5vh;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
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