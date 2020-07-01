<template>
  <p>{{activityData}}</p>
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
</style>
