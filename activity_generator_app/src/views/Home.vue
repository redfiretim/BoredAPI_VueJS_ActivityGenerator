<template>
  <div class="home-component">
	<div class="buttons-container">
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
  name: "Home",

};
</script>




<style scoped>

.home-component{
	display: grid;
	grid-template-columns: auto auto auto;
	grid-template-rows: auto auto auto;
	justify-content: center;
	padding-top: 20vh;
}

.buttons-container{
	grid-column: 2;
	grid-row: 2;
	width: fit-content;
}

li {
    padding: 0.5rem;
}

button{
    background-color: #3CF1AA;
    border: solid 3px #A4A4A4;
    padding: 20px;
    color: black;
    font-size: xx-large;
	font-weight: bold;
}

button:hover{
    background-color: #A7FFDC;
}

/* remove default black outline when clicking on button */
button:active{
    outline: none;
}


/* MOBILE */
@media only screen and (max-width: 400px) {
	.home-component{
		padding-top: 10vh;
	}

	button{
		font-size: x-large;
	}
}
/* end of MOBILE */

</style>
