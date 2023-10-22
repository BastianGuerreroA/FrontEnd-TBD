<template>
  <div class="home">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montserrat:ital,wght@0,400;1,700&family=Pacifico&display=swap" rel="stylesheet">
    </head>
    <header>
      <img src="@/assets/LogoPrincipal.png" alt="LogoPrincipal" class="logo">
      <h1>Gestión de voluntariados</h1>
    </header>
    <br>
    <LoginUser/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from "@/components/LoginUser.vue";

export default {
  name: 'HomeView',
  components: {
    LoginUser
  },
  mounted() {
    if(localStorage.getItem("id") != null){
      this.$router.push("/home/"+localStorage.getItem("id"));
    }
  }
}
</script>


<style scoped>

.logo{
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
}

header{
  background-color: #364552;
  color: white;
  padding: 2rem 1rem;

}

header h1{
  font-size: 3rem;
  text-align: center;
  font-family: 'Pacifico', cursive;
  text-align: center;
}
</style>
```