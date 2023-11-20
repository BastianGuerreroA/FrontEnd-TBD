<template>
  <div class="about cuerpo">
    <Navbar />
    <div class="container">
      <form class="left">
        <div class="form-group">
          <br />
          <label for="inputHabilidad">Ingrese habilidad</label>
          <input type="text" class="form-control" id="inputHabilidad" v-model="form.habilidad" />
        </div>

        <br />
        <button type="submit" class="btn btn-primary" @click="crear">Crear</button>
        <br />
        <button type="button" class="btn btn-danger" @click="devuelta" style="margin-top: 20px">Cancelar</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/NavbarCoordinador.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: 'CrearEmergencia',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      idUser: null,
      form: {
        "habilidad": ""
      },
    }
  },
  methods: {
    crear() {
      let json = {
        "habilidad": this.form.habilidad,

      };
      axios.post("http://localhost:8091/api/habilidades/create", json, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error("Error al crear la habilidad:", error);
          });
    },
    devuelta() {
      this.$router.push("/coordinador/" + localStorage.getItem("id"));
    }
  }
}
</script>

<style scoped>
.left {
  text-align: left;
}

.cuerpo {
  color: white;
}
</style>
