<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid fondo">
      <a class="navbar-brand">GdV</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" v-on:click="editar(idUser)">Editar perfil</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="javascrip:void(0);" v-on:click="cerrarSesion();">Cerrar sesión</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page"><router-link :to="devuelta">Home</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page"><router-link :to="crearEmergencia">Crear emergencia</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page"><router-link :to="crearHabilidad">Crear Habilidad</router-link></a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "AppNavbar",
  components: {
  },
  data: function () {
    return {
      devuelta: "",
      crearEmergencia: "",
      crearHabilidad: "",
      idUser: null,
      correro: "",
    }
  },
  mounted() {
    this.idUser = localStorage.getItem("id");
    this.devuelta = "/coordinador/" + localStorage.getItem("id");
    this.crearEmergencia = "/coordinador/" + localStorage.getItem("id") + "/crearEmergencia";
    this.crearHabilidad = "/coordinador/" + localStorage.getItem("id") + "/crearHabilidad";
  },
  methods:{
    cerrarSesion(){
      localStorage.clear();
      this.$router.push("/")
    },
    editar(id){
      this.$router.push("/coordinador/"+ id +"/editar")
    }
  }

}

</script>

<style scoped>
</style>