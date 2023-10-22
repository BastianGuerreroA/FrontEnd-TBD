<template>
  <div class="about cuerpo">
    <Navbar/>
    <br>
    <div>
      <h3>Bienvenido!: {{correo}}</h3>
    </div>
    <br><br>
    <div class="container">
      <h4>Emergencias Activas(La tabla toma todas !!!)</h4>
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
          <td><BotonRequisitos :idEmergencia="emergencia.id_emergencia"/></td>
        </tr>
        </tbody>
      </table>
    </div>
    <Footer/>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import BotonRequisitos from "@/components/BotonRequisitos.vue";
import axios from "axios";


export default {
  name: 'AboutView',
  components: {
    Navbar,
    Footer,
    BotonRequisitos
  },
  data: function(){
    return {
      idUser: null,
      listaEmergencias: null,
      correo: "",
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

    this.getAll();

    axios.get("http://localhost:8090/api/usuario/" + this.idUser)
        .then(data =>{
          this.correo = data.data.email;
        })

  },
  methods:{
    getAll(){
      let direccion= "http://localhost:8090/api/emergencia";
      axios.get(direccion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
          .then(data =>{
            this.listaEmergencias = data.data;
          })
    }
  }
}
</script>

<style scoped>

.cuerpo{
  color : white;
}

</style>
```

