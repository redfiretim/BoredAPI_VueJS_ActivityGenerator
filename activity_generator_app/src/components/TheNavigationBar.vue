<template>
  <div>
    
    <div class="header">
      <!-- Home Button area -->
      <router-link to="/">
        <h2>Activity Generator</h2>
        <h5>VueJS - Axios - Bored API</h5>
      </router-link>
    </div>

    <div class="navigation-bar">
      <ul>
        <li>
          <router-link to="/activitygenerator">
            <button>Generate activity</button>
          </router-link>
        </li>
        <li>
          <router-link to="/activityfilter">
            <button>Help me find an activity</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>




<script>
export default {
  name: "TheNavigationBar"
};
</script>




<style scoped>
.header {
  background-color: #3cf1aa;
  color: black;
  padding: 1rem;
}

h5 {
  font-weight: normal;
  padding-top: 0.6rem;
}

.navigation-bar {
  display: flex;
  justify-content: left;
  background-color: #d5d5d5;
  padding: 0.3rem;
}

li {
  display: inline-block;
  padding: 0.3rem 0.5rem;
}

button {
  background-color: #e6e6e6;
  border: solid 3px #a4a4a4;
  padding: 3px 8px;
  color: black;
  font-size: small;
}

button:hover {
  background-color: #a7ffdc;
}

/* remove default black outline when clicking on button */
button:active {
  outline: none;
}

/* change default Vue active link style */
.router-link-exact-active > button {
  background-color: #a7ffdc;
  outline: none;
}

/* change default Vue active link style */
a.router-link-active {
  text-decoration: none;
  color: black;
}
</style>