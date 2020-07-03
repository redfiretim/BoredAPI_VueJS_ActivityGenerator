<template>
  <div class="container-result">
    <div class="activity-title">{{activityData.activity}}</div>
    <div class="inside-result-container">
      <div class="activity-label">{{activityData.type}}</div>
      <div class="participants-label">Participants:</div>
      <ul class="participants_icons">
        <!-- array index used, because no other unique way to identify -->
        <li v-for="(person, index) in peopleIcons" :key="index" :class="index + 'icon'">
          <img :src="person" />
        </li>
      </ul>
      <div class="accessibility-label">Accessibility:</div>
      <div class="access-bar-container">
        <div class="access-bar-inner" :style="{ width: accessPerc + '%'}"></div>
      </div>
      <div class="price-label">Price:</div>
      <div class="price-bar-container">
        <div class="price-bar-inner" :style="{ width: pricePerc + '%'}"></div>
      </div>
    </div>
  </div>
</template>




<script>
import grey from "@/assets/emoji_people-black-18dp_grey.svg";
import mint from "@/assets/emoji_people-black-18dp_mint.svg";

export default {
  name: "ResultComponent",
  props: ["output", "errored"],
  data: function() {
    return {
      activityData: {},
      error: Boolean,
      peopleIcons: [grey, grey, grey, grey, grey],
      grey: grey,
      mint: mint,
      accessPerc: null,
      pricePerc: null
    };
  },
  mounted: function() {
    this.activityData = this.output;
    this.error = this.errored;
    
    //changes person icon into active mint color according to numer of participants
    for (let i = 0; i < this.activityData.participants; i++) {
      this.peopleIcons[i] = this.mint;
    }

    //changes accessibility data into percentage for css width usage
    this.accessPerc = (this.activityData.accessibility * 100);

    //changes price data into percentage for css width usage
    this.pricePerc = (this.activityData.price * 100);
  },
};
</script>




<style scoped>
.container-result {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
  max-height: 18rem;
}

.activity-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
}

.inside-result-container {
  border: solid 3px #a4a4a4;
  grid-row: span 10;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  row-gap: 5px;
  column-gap: 5px;
}

.activity-label {
  background-color: #3cf1aa;
  grid-column-start: 7;
  grid-column-end: 11;
  padding: 5px;
}

.participants-label {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row: 2;
  text-align: left;
  padding: 5px 0;
}

/* removes parent container as constraint and places list items on grid */
.participants_icons{
  display: contents;
}

/* places list items on correct grid location */
.participants_icons>li:first-child{
  grid-column: 2;
}
.participants_icons>li:nth-child(2){
  grid-column: 3;
}
.participants_icons>li:nth-child(3){
  grid-column: 4;
}
.participants_icons>li:nth-child(4){
  grid-column: 5;
}
.participants_icons>li:nth-child(5){
  grid-column: 6;
}

li{
  grid-row: 3;
}

.accessibility-label{
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row: 4;
  text-align: left;
  padding: 15px 0 0 0;
}

.access-bar-container{
  background-color: #e6e6e6;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 5;
  margin: 0.3rem 0;
}

.access-bar-inner{
  background-color: #3cf1aa;
  height: 100%;
  min-height: 1rem;
}

.price-label{
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row: 6;
  text-align: left;
  padding: 15px 0 0 0;
}

.price-bar-container{
  background-color: #e6e6e6;
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row: 7;
  margin: 0.3rem 0;
}

.price-bar-inner{
  background-color: #3cf1aa;
  min-height: 1rem;
  height: 100%;
}
</style>
