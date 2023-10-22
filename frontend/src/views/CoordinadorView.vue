<template>
  <div class="about">
    <Navbar/>
    <br><br>
    <div class="container">
      <table class="table table-hover table-dark">
        <thead>
        <tr>
          <th scope="col">Asunto</th>
          <th scope="col">Descripción</th>
          <th scope="col">Dirección</th>
          <th scope="col">Fecha</th>
          <th scope="col">Estado</th>
          <th scope="col">Institución</th>
          <th scope="col">Acción</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="emergencia in listaEmergencias" :key="emergencia.id_emergencia">
          <th scope="row">{{emergencia.asunto}}</th>
          <td>{{emergencia.descripcion}}</td>
          <td>{{emergencia.direccion}}</td>
          <td>{{emergencia.fecha}}</td>
          <td>{{emergencia.activa}}</td>
          <td>{{emergencia.id_institucion}}</td>
          <td> <button type="button" class="btn btn btn-outline-danger" @click="eliminarEmergencia(emergencia.id_emergencia)">Eliminar</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <Footer/>

  </div>
</template>

<script>
import Navbar from "@/components/NavbarCoordinador.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: 'AboutView',
  components: {
    Navbar,
    Footer
  },
  data: function(){
    return {
      idUser: null,
      listaEmergencias: null,
    }
  },
  mounted() {
    if(localStorage.getItem("id") != null){
      if(localStorage.getItem("id") == this.$route.params.id){
        this.idUser = this.$route.params.id;
      }
      else {
        this.$router.push("/home/"+localStorage.getItem("id"));
      }
    }
    else {
      this.$router.push("/");
    }


    let direccion= "http://localhost:8090/api/emergencia";
    axios.get(direccion, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
        .then(data =>{
      this.listaEmergencias = data.data;
    });

  },
  methods: {
    eliminarEmergencia(id) {
      if (confirm("¿Estás seguro de que deseas eliminar esta emergencia?")) {
        axios.delete(`http://localhost:8090/api/emergencia/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
            .then(() => {
              // Recargar la lista de emergencias después de eliminar
              this.cargarEmergencias();
            })
            .catch(error => {
              console.error("Error al eliminar la emergencia:", error);
            });
      }
    },
    cargarEmergencias() {
      let direccion = "http://localhost:8090/api/emergencia";
      axios.get(direccion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
          .then(data => {
            this.listaEmergencias = data.data;
          });
    },
  },
};
</script>

<style scoped>
</style>
```

