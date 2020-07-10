<template>
  <form class="container-form" id="filter-input-form" @submit.prevent="processForm">
    <div class="form-title">Please answer these questions.</div>
    
    <div class="inside-form-container">

      <div class="participants-area">
        <div class="participants-label">How many participants do you have?</div>
        <ul class="participants-list">
          <li v-for="(person, index) in peopleIcons" :key="index" :class="index + 'icon'">
            <input type="select" v-model="participantsValue" class="participants-input">
            <div class="participants-button" v-on:click="setParticipants(index)">
              <img :src="person" class="participants-img"/>
            </div>
          </li>
        </ul>
      </div>

      <div class="accessibility-area">
        <div class="accessibility-label">Which minimum accessibility rating do you want?</div>
        <ul class="accessibility-list">
          <li v-for="(wheelIcon, index) in wheelIcons" :key="index" :class="index + 'icon'">
            <input type="select" v-model="accessibilityValue" class="accessibility-input">
            <div class="accessibility-button" v-on:click="setAccessibility(index)">
              <img :src="wheelIcon" class="accessibility-img"/>
            </div>
          </li>
        </ul>
      </div>

      <div class="price-area">
        <div class="price-label">What price range are you searching for?</div>

        <div class="minPrice-area">
          <div class="minPrice-label">Minimum:</div>
          <ul class="minPrice-list">
            <li v-for="(minPriceIcon, index) in minPriceIcons" :key="index" :class="index + 'icon'">
              <input type="select" v-model="minPriceValue" class="minPrice-input">
              <div class="minPrice-button" v-on:click="setMinPrice(index)">
                <img :src="minPriceIcon" class="minPrice-img"/>
              </div>
            </li>
          </ul>
        </div>

        <div class="maxPrice-area">
          <div class="maxPrice-label">Maximum:</div>
          <ul class="maxPrice-list">
            <li v-for="(maxPriceIcon, index) in maxPriceIcons" :key="index" :class="index + 'icon'">
              <input type="select" v-model="maxPriceValue" class="maxPrice-input">
              <div class="maxPrice-button" v-on:click="setMaxPrice(index)">
                <img :src="maxPriceIcon" class="maxPrice-img"/>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div class="type-area">
        <div class="type-label">Select caterory(s):</div>

        <div class="left-type-area">
          <ul class="type-list">
            <!-- generate first part of list according to categories data array -->
            <li v-for="category in categories.slice(0,5)" :key="category">
              <label :for=category class="checkmark-container">
                {{category}}
                <input type="checkbox" :id=category :value=category v-model="types">
                <span class="checkmark"></span>
              </label>
            </li>
          </ul>
        </div>

        <div class="right-type-area">
          <ul class="type-list">
            <!-- generate second part of list according to categories data array -->
            <li v-for="category in categories.slice(5,9)" :key="category">
              <label :for=category class="checkmark-container">
                {{category}}
                <input type="checkbox" :id=category :value=category v-model="types">
                <span class="checkmark"></span>
              </label>
            </li>
          </ul>
        </div>
        
      </div>

    </div>
    
    <button type="submit" class="submit-button">Find activity</button>
  
  </form>
</template>



<script>
import grey from "@/assets/emoji_people-black-18dp_grey.svg";
import mint from "@/assets/emoji_people-black-18dp_mint.svg";
import wheelMint from "@/assets/accessible-black-18dp_mint.svg";
import wheelGrey from "@/assets/accessible-black-18dp_grey.svg";
import euroMint from "@/assets/euro_symbol-black-18dp_mint.svg";
import euroGrey from "@/assets/euro_symbol-black-18dp_grey.svg";

export default {
  name: "FilterFormComponent",
  data: function() {
    return {
      peopleIcons: [grey, grey, grey, grey, grey],
      wheelIcons: [wheelGrey, wheelGrey, wheelGrey, wheelGrey, wheelGrey],
      minPriceIcons: [euroGrey, euroGrey, euroGrey, euroGrey, euroGrey],
      maxPriceIcons: [euroGrey, euroGrey, euroGrey, euroGrey, euroGrey],
      grey: grey,
      mint: mint,
      wheelMint: wheelMint,
      wheelGrey: wheelGrey,
      euroMint: euroMint,
      euroGrey: euroGrey,
      categories: ["education", "recreational", "social", "diy", "charity", "relaxation", "cooking", "music", "busywork"],
      participantsValue: 0,
      accessibilityValue: null, // if 0 is used, component won't register change.
      accessibilityIndex: 0,
      minPriceValue: 0,
      minPriceIndex: 0,
      maxPriceValue: null,
      maxPriceIndex: 0,
      types: [],
      loading: true,
      errored: false,
    };
  },
  methods: {
    setParticipants: function(index) {
      this.participantsValue = index + 1;
    },
    setAccessibility: function(index) {
      // change index from 0 - 4 to double value from 1 - 0 (with 5 steps: 1.0 | 0.8 | 0.6 | 0.4 | 0.2)
      let unroundedValue = 1 - (0.2 * (index + 1)); // this calculation sometimes gives rounding errors
      let roundedValue = Math.ceil((unroundedValue * 10)); // Fix rounding error with Math.ceil() as full integer
      this.accessibilityValue = (roundedValue / 10); // transform it back to decimal number and store it.
      // store index to determine icon color
      this.accessibilityIndex = index + 1;
    },
//FIXME --> When trying to refactor the 2 methods below, I got no-unused-vars ESLINT error. haven't found solution yet.
    // setPrice: function(index, priceValue, priceIndex) {
    //   let unroundedValue = 0.2 * (index + 1);
    //   let roundedValue = Math.floor((unroundedValue * 10)); // use math.floor() because this value is not reversed.
    //   priceValue = (roundedValue / 10);
    //   priceIndex = index + 1;
    // },
    setMinPrice: function(index) {
      let unroundedValue = 0.2 * (index + 1);
      let roundedValue = Math.floor((unroundedValue * 10)); // use math.floor() because this value is not reversed.
      this.minPriceValue = (roundedValue / 10);
      this.minPriceIndex = index + 1;
    },
    setMaxPrice: function(index) {
      let unroundedValue = 0.2 * (index + 1);
      let roundedValue = Math.floor((unroundedValue * 10));
      this.maxPriceValue = (roundedValue / 10);
      this.maxPriceIndex = index + 1;
    },
    checkTypes: function(dataArray, inputArray) {
      let success = dataArray.every((val) => inputArray.includes(val));
      return success;
    }, 
    ratingIconChanger: function(newVal, array, iconMint, iconGrey) {
      for (let i = 0; i < newVal; i++) {
        array[i] = iconMint;
      }
      for (let j = (newVal); j < 5; j++) {
        array[j] = iconGrey;
      }
    },
    priceIndexChanger: function(newVal, array, iconMint, iconGrey) {
      this.ratingIconChanger(newVal, array, iconMint, iconGrey);

      // create connection/dependency of minPrice to maxPrice
      if((this.maxPriceValue < this.minPriceValue) && (this.maxPriceValue !== null)){
        this.maxPriceValue = this.minPriceValue;
        this.maxPriceIndex = this.minPriceIndex;
      }
    },
    processForm: function() {
      // check if values are not out of bounds for API
      if(
          ((this.participantsValue > 5) || (this.participantsValue < 0))
            ||
          ((this.accessibilityValue > 1) || (this.accessibilityValue < 0))
            ||
          ((this.minPriceValue > 1) || (this.minPriceValue < 0))
            ||
          ((this.maxPriceValue > 1) || (this.maxPriceValue < 0))
            ||
          (this.checkTypes(this.categories, this.types) === false)){

        alert(`Please don't alter the input values!`); // this result should only be possible by manually altering values in browser dev tools.
      }
      else{
        // Send the event and all values to the parent component
        this.$emit('processForm', this.participantsValue, this.accessibilityValue, this.minPriceValue, this.maxPriceValue, this.types);
      }
    },
  },
  watch: {
    // These watchers control the Icon colors on clicks and bind minPrice to maxPrice.
    participantsValue: function(newVal){
      this.ratingIconChanger(newVal, this.peopleIcons, this.mint, this.grey);
    },
    accessibilityIndex: function(newVal){
      this.ratingIconChanger(newVal, this.wheelIcons, this.wheelMint, this.wheelGrey);
    },
    minPriceIndex: function(newVal){
      this.priceIndexChanger(newVal, this.minPriceIcons, this.euroMint, this.euroGrey);
    },
    maxPriceIndex: function(newVal){
      this.priceIndexChanger(newVal, this.maxPriceIcons, this.euroMint, this.euroGrey);
    },
  }
};
</script>




<style scoped>

button {
  background-color: #3cf1aa;
  border: solid 3px #a4a4a4;
  padding: 15px;
  color: black;
  font-size: xx-large;
  font-weight: bold;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

button:hover {
  background-color: #a7ffdc;
}

/* remove default black outline when clicking on button */
button:active {
  outline: none;
}

.container-form {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
  max-height: 38rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
}

.inside-form-container {
  border: solid 3px #a4a4a4;
  grid-row: span 10;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(10, 1fr);
  row-gap: 5px;
  column-gap: 5px;
  margin-top: -1rem;
}





/* participants & accessibility & price & type START */
.participants-area {
  background-color: #eeeeee;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 2;
  height: 5rem;
  margin: -0.2rem -1.5rem;
}

.accessibility-area {
  background-color: #eeeeee;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 4;
  height: 5rem;
  margin: -0.2rem -1.5rem;
}

.price-area {
  background-color: #eeeeee;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 6;
  height: 6rem;
  margin: -0.2rem -1.5rem;
}

.type-area {
  background-color: #eeeeee;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 8;
  height: 10rem;
  margin: -0.2rem -1.5rem;
}

.participants-label, .accessibility-label, .price-label, .type-label {
  text-align: left;
  font-size: small;
  padding: 0.5rem;
}

.minPrice-area, .left-type-area {
  display: block;
  float: left;
}

.maxPrice-area, .right-type-area {
  display: block;
  float: right;
}

.left-type-area, .right-type-area {
  width: 10rem;
  padding: 0 0.6rem;
  font-size: x-small;
}

.type-list>li {
  margin: 0.3rem 0;
}

.type-list{
  text-align: left;
  margin-left: 0.3rem;
}

.minPrice-label, .maxPrice-label{
  text-align: left;
  font-size: x-small;
  padding: 0.3rem 0.8rem;
  text-decoration: underline;
}

.participants-list, .accessibility-list, .minPrice-list, .maxPrice-list {
  display: flex;
  padding: 0.2rem 0.5rem;
}

.participants-input, .accessibility-input, .minPrice-input, .maxPrice-input {
  display: none;
}

.participants-img:hover, .accessibility-img:hover, .minPrice-img:hover, .maxPrice-img:hover {
  cursor: pointer;
  background-color: #a7ffdc;
  border-radius: 0 13px 0 13px;
}

.participants-img, .accessibility-img, .minPrice-img, .maxPrice-img {
  height: 2rem;
  width: 2rem;
}
/* participants & accessibility & price END  */




/* adjust for small screens */
@media only screen and (max-width: 510px) {
  .price-area{
    height: 11rem;
  }
  .type-area{
    height: 16rem;
  }
  .accessibility-area{
    height: 5.5rem;
  }
  .maxPrice-area, .right-type-area{
    float: left;
  }
  .container-form{
    max-height: 50rem;
  }
}





/* CUSTOM CHECKMARK START */
/* Customize the label (the container) */
.checkmark-container{
  display: block;
  position: relative;
  padding-left: 28px;
  margin-bottom: 10px;
  padding-top: 4px;
  cursor: pointer;
  font-size: x-small;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkmark-container input{
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #d5d5d5;
}

/* On mouse-over, add a grey background color */
.checkmark-container:hover input ~ .checkmark {
  background-color: #a7ffdc;
}

.checkmark-container:hover {
  text-decoration: underline;
}

/* When the checkbox is checked, add a blue background */
.checkmark-container input:checked ~ .checkmark {
  background-color: #3cf1aa;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkmark-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkmark-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 6px 5px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* CUSTOM CHECKMARK END */

</style>
