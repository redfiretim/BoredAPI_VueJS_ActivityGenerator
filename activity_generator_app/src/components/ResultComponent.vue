<template>
  <div class="container-result">
    <div class="activity-title">{{activityData.activity}}</div>
    <div class="result-border">

    </div>
  </div>
</template>




<script>
export default {
  name: "ResultComponent",
  props: ["output", "errored"],
  data: function() {
    return {
      activityData: {},
      error: Boolean
    };
  },
  mounted: function(){
      this.activityData = this.output
      this.error = this.errored
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
  grid-template-columns: repeat(10, 1fr);
  height: 100%;
}

.activity-title{
  font-size: 1.5rem;
  font-weight: bold;
  grid-column: span 10;
  grid-row: 1fr;
  justify-self: left;
}

.result-border{
  border: solid 3px #a4a4a4;
  grid-row: span 10;
  grid-column: span 10;
}

</style>
