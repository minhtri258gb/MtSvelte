<script>
	import { Math } from 'mathjax-svelte';
	
  </script>
  
  <div class="left">
	<h2 class="title">Music player</h2>
	<Math t={`E = {mc^2}`} />
	
  </div>
  <div class="right">
  </div>
  
  <style>
	.left {
	  width: 25%;
	  height: 100vh;
	  float: left;
	  background-color: #373738;
	}
	.right {
	  width: 75%;
	  height: 100vh;
	  float: left;
	}
	.title {
	  text-align: center;
	}
  </style>