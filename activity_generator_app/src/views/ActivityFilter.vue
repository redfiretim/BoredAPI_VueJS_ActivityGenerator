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
          v-if="(loading === false) && 
                (filterForm === false) && 
                (output !== null) && 
                (showResult === true)"
        ></ResultComponent>
        
        <button 
          v-on:click="goToFilter()" 
          v-if="(filterForm === false) && 
                (loading === false) && 
                (showResult === true)"
          >
            Find a new activity
          </button>
      
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
      minAccessibility: null,
      minPrice: null,
      maxPrice: null,
      showResult: false, // this one is for robustness, could have used only output.
    };
  },
  methods: {
    runAxiosReq: function(participantsValue, accessibilityValue, minPriceValue, maxPriceValue){
      
      if((participantsValue > 0) && (participantsValue < 6) && (participantsValue !== null)){
        this.participants = `participants=` + participantsValue;
      }
      if((accessibilityValue >= 0) && (accessibilityValue < 1) && (accessibilityValue !== null)){
        // Using maxaccessibility because that way the BoredAPI shows activities that
        // are the chosen value or MORE accessible. 
        // They have conflicting terms in their documentation.
        // The say 0 is most accessible but then they use minaccessibility and 
        // maxaccessibility the other way around. They should change this in the API.
        // I submitted the issue with Bored API creator.
        // see: https://github.com/drewthoennes/Bored-API/issues/23
        this.minAccessibility = `maxaccessibility=` + accessibilityValue;
      }
      if((minPriceValue >= 0) && (minPriceValue <= 1) && (minPriceValue !== null)) {
        this.minPrice = `minprice=` + minPriceValue;
      }
      if((maxPriceValue >= 0) && (maxPriceValue <= 1) && (maxPriceValue !== null)){
        this.maxPrice = `maxprice=` + maxPriceValue;
      }

      // Run Axios request
      // NEEDS TO RUN LAST!!
      this.findNewActivity(this.participants, this.minAccessibility, this.minPrice, this.maxPrice)

    },
    findNewActivity: function(participants, minAccessibility, minPrice, maxPrice) {
      this.loading = true;

      console.log("http://www.boredapi.com/api/activity?" + participants +`&`+ minAccessibility +`&`+ minPrice +`&`+ maxPrice + ` <-- GET URL`)

      axios
        .get("http://www.boredapi.com/api/activity?" + participants +`&`+ minAccessibility +`&`+ minPrice +`&`+ maxPrice)
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
        this.showResult = true;

        console.log(this.output.data.activity + ` <-- output API`);
        });
    },
    goToFilter: function(){
      this.filterForm = true;
      this.output = null;
      this.showResult = false;
    }
  }
};
</script>




<style scoped>

.container {
  min-width: 14rem;
  max-width: 30rem;
  padding-top: 3vh;
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

button {
  background-color: #3cf1aa;
  border: solid 3px #a4a4a4;
  padding: 15px;
  color: black;
  font-size: xx-large;
  font-weight: bold;
  width: 100%;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #a7ffdc;
}

/* remove default black outline when clicking on button */
button:active {
  outline: none;
}

</style>