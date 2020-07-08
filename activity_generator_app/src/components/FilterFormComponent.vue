<template>
  <form class="container-form" id="filter-input-form" @submit.prevent="processForm">
    <div class="form-title">Please aswer these questions.</div>
    
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

    </div>
    
    <button type="submit" class="submit-button">Find activity</button>
  
  </form>
</template>



<script>
import grey from "@/assets/emoji_people-black-18dp_grey.svg";
import mint from "@/assets/emoji_people-black-18dp_mint.svg";

export default {
  name: "FilterFormComponent",
  data: function() {
    return {
      peopleIcons: [mint, grey, grey, grey, grey],
      grey: grey,
      mint: mint,
      participantsValue: 1,
    };
  },
  methods: {
    setParticipants: function(index) {
      this.participantsValue = index + 1;
    },
    processForm: function() {
      if((this.participantsValue > 5) || (this.participantsValue < 1)){
        alert(`Please don't alter the input values!`); // this result should only be possible by manually altering values in browser
      }
      else{
        this.$emit('processForm');
      }
    },
  },
  watch: {
    participantsValue: function(newVal){
      for (let i = 0; i < newVal; i++) {
        this.peopleIcons[i] = this.mint;
      }
      for (let j = (newVal); j < 5; j++) {
        this.peopleIcons[j] = this.grey;
      }
      console.log(this.participantsValue + " <-- parti val");
    }
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
  max-height: 25rem;
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
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  row-gap: 5px;
  column-gap: 5px;
}

.participants-area {
  background-color: #eeeeee;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 2;
  height: 5rem;
  margin: -0.2rem -1.5rem;
}

.participants-label {
  text-align: left;
  font-size: small;
  padding: 0.5rem;
}

.participants-list {
  display: flex;
  padding: 0.2rem 0.5rem;
}

.participants-input{
  display: none;
}

.participants-img:hover {
  cursor: pointer;
  background-color: #a7ffdc;
  border-radius: 0 13px 0 13px;
}

.participants-img {
  height: 2rem;
  width: 2rem;
}
</style>
