<template>
    <div>
        <div class="header">
            <router-link to="/">
                <h1>Activity Generator</h1>
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
  name: 'TheNavigationBar',
}
</script>




<style scoped>
.header{
  background-color: #3CF1AA;
  color:black;
  padding: 1rem;
}

h5 {
    font-weight: normal;
    padding-top: 0.6rem;
}

.navigation-bar{
    display: flex;
    justify-content:left;
    background-color: #D5D5D5;
    padding: 0.3rem;
}

li {
    display: inline-block;
    padding: 0.3rem 0.5rem;
}

button{
    background-color: #E6E6E6;
    border: solid 3px #A4A4A4;
    padding: 3px 8px;
    color: black;
    font-size: small;
}

button:hover{
    background-color: #A7FFDC;
}

/* remove default black outline when clicking on button */
button:active{
    outline: none;
}


/* change default Vue active link style */
.router-link-exact-active > button{
    background-color: #3CF1AA;
    outline: none;
}

/* change default Vue active link style */
a.router-link-active{
    text-decoration: none;
    color: black;
}
</style>