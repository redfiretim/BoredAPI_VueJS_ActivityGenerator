<template>
  <div class="container-form">
    <div class="form-title">Please aswer these questions.</div>
    <div class="inside-form-container">
        
    </div>
  </div>
</template>



<script>
import grey from "@/assets/emoji_people-black-18dp_grey.svg";
import mint from "@/assets/emoji_people-black-18dp_mint.svg";

export default {
  name: "FilterFormComponent",
  data: function() {
    return {
      peopleIcons: [grey, grey, grey, grey, grey],
      grey: grey,
      mint: mint
    };
  }
};
</script>




<style scoped>
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
</style>
