<template>
  <div class="container">
      <div class="component-container">
        
        <!-- only shows if http req gives an error -->
        <div class="error-text" v-if="errored === true">Oops, something went wrong!</div>

        <!-- Loading Screen for processing request -->
        <div class="loading-border" v-if="loading === true">
          <div class="loading-msg" data-text="Loading...">Loading...</div>
        </div>
        
        <!-- Loads questionnaire / filter component  -->
        <FilterFormComponent 
          v-if="(filterForm === true) && (loading === false)" 
          v-on:processForm="runAxiosReq"
        ></FilterFormComponent>
        
        <!-- Renders Result after request -->
        <ResultComponent 
          :output="output.data" 
          :errored="errored" 
          v-if="(loading === false) && 
                (filterForm === false) && 
                (output !== null) && 
                (showResult === true)"
        ></ResultComponent>
        
        <!-- Go back to questionnaire component -->
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
      types: [],
      typesString: null,
      showResult: false, // this one is for robustness, could have used only output.
    };
  },
  methods: {
    // Checks if request parameters need to be set or kept as null or default.
    // When everything is ok, run axios request
    runAxiosReq: function(participantsValue, accessibilityValue, minPriceValue, maxPriceValue, typesArray){

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
            // update: issue was already known, just not a priority.(see repsonse on issue)
        this.minAccessibility = `maxaccessibility=` + accessibilityValue;
      }
      if((minPriceValue >= 0) && (minPriceValue <= 1) && (minPriceValue !== null)) {
        this.minPrice = `minprice=` + minPriceValue;
      }
      if((maxPriceValue >= 0) && (maxPriceValue <= 1) && (maxPriceValue !== null)){
        this.maxPrice = `maxprice=` + maxPriceValue;
      }

      // if check only works if you put [0] after typesArray!
      if(typesArray[0] !== undefined){

        // add string parts for url request
        this.types.push(`type=` + typesArray[0]); 

        if(typesArray.length > 1){
          for(let i = 1 ; i < typesArray.length ; i++){
            this.types.push(`&type=` + typesArray[i]);
          }
        } 
        // convert to string and remove commas
        this.typesString = this.types.join('')
      }
      else{
        this.typesString = `null`;
      }

      // Run Axios request
      // NEEDS TO RUN LAST!!
      this.findNewActivity(this.participants, this.minAccessibility, this.minPrice, this.maxPrice, this.typesString)
    },
    // Actual axios request part
    findNewActivity: function(participants, minAccessibility, minPrice, maxPrice, typesString) {
      this.loading = true;

      axios
        // parameters set as 'null' are ignored by API
        .get("http://www.boredapi.com/api/activity?" + participants +`&`+ minAccessibility +`&`+ minPrice +`&`+ maxPrice +`&`+ typesString)
        .then(response => {
          this.output = response;
          this.errored = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
          alert(`Sorry, something went wrong with the server!`);
        })
      .finally(() => {
        this.loading = false;
        this.filterForm = false;
        this.showResult = true;
        });
    },
    // show filter / questionnaire component AND reset all values
    goToFilter: function(){
      this.filterForm = true;
      this.output = null;
      this.showResult = false;
      this.minAccessibility = null;
      this.minPrice = null;
      this.maxPrice = null
      this.types = [];
      this.typesString = null;
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