<template>
  <div id="app">
    <TheNavigationBar/>
    <router-view />
  </div>
</template>



<script>
import TheNavigationBar from './components/TheNavigationBar';


export default {
  name: 'App',
  components: {
    TheNavigationBar,
  }
}

</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 0px;
}

</style>
