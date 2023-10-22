<template>
  <div id="app">
    <head>
    </head>
    <body>
       <router-view/>
    </body>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a8b6c4;
}

body{
  margin: 0;
  background-color: rgb(41, 40, 40);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #677d94;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup>
</script>