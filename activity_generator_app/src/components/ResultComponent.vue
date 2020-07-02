<template>
  <div class="container-result">
    <div class="activity-title">{{activityData.activity}}</div>
    <div class="inside-result-container">
      <div class="activity-label">{{activityData.type}}</div>
      <div class="participants-label">Participants:</div>
      <img :src="grey" />
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
      peopleIcons: [this.grey, this.grey, this.grey, this.grey, this.grey],
      grey: grey,
      mint: mint,
    };
  },
  mounted: function(){
      this.activityData = this.output
      this.error = this.errored

      if(this.activityData.participants !== 0){
        this.peopleIcons = () => {
          for( let i=0; i<this.activityData.participants; i++){
            this.peopleIcons = this.peopleIcons.splice(i,1, this.mint)
          }
        }
      }
  },
  watch: {
    output: function(newVal, oldVal) {
        this.activityData = newVal
        console.log('Prop changed: ', newVal, ' | was: ', oldVal);
    },
    errored: function(newVal) {
        this.error = newVal
    }
  }
};
</script>




<style scoped>

.container-result{
  display: grid;
  grid-template-rows: repeat(11, 1fr);
  height: 100%;
}

.activity-title{
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
}

.inside-result-container{
  border: solid 3px #a4a4a4;
  grid-row: span 10;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  row-gap: 5px;
  column-gap: 5px;

}

.activity-label{
  background-color: #3cf1aa;
  grid-column-start: 7;
  grid-column-end: 11;
  padding: 5px;
}

.participants-label{
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row: 2;
  text-align: left;
  padding: 5px 0;
}

</style>
