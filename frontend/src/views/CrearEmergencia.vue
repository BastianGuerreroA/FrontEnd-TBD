<template>
  <div class="about cuerpo">
    <Navbar />
    <div class="container">
      <form class="left">
        <div class="form-group">
          <br />
          <label for="inputAsunto">Asunto</label>
          <input type="text" class="form-control" id="inputAsunto" v-model="form.asunto" />
        </div>
        <div class="form-group">
          <br />
          <label for="inputDescripcion">Descripción</label>
          <input type="text" class="form-control" id="inputDescripcion" v-model="form.descripcion" />
        </div>
        <div class="form-group">
          <br />
          <label for="inputDireccion">Dirección</label>
          <input type="text" class="form-control" id="inputDireccion" v-model="form.direccion" />
        </div>
        <div class="form-group">
          <br />
          <label for="inputFecha">Fecha</label>
          <input type="date" class="form-control" id="inputFecha" v-model="form.fecha" />
        </div>
        <div class="form-group">
          <br />
          <label for="inputInstitucion">Institución</label>
          <select class="form-control" id="inputInstitucion" v-model="form.id_institucion">
            <option value="" disabled>Selecciona una institución</option>
            <option v-for="institucion in instituciones" :key="institucion.idInstitucion" :value="institucion.idInstitucion">{{ institucion.nombre }}</option>
          </select>
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
        "id_emergencia": "",
        "asunto": "",
        "descripcion": "",
        "direccion": "",
        "fecha": "",
        "activa": "",
        "id_institucion": "",
      },
      instituciones: [],
    }
  },
  created() {
    axios.get("http://localhost:8091/api/institucion", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
        .then(response => {
          this.instituciones = response.data;
        })
        .catch(error => {
          console.error("Error al obtener la lista de instituciones:", error);
        });


  },
  methods: {
    crear() {
      let json = {
        "asunto": this.form.asunto,
        "descripcion": this.form.descripcion,
        "direccion": this.form.direccion,
        "fecha": this.form.fecha,
        "activa": true,
        "id_institucion": this.form.id_institucion,
      };
      axios.post("http://localhost:8091/api/emergencia/crear", json, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error("Error al crear la emergencia:", error);
          });
      this.$router.push("/coordinador/" + localStorage.getItem("id") + "/requerimientosEmergencia")

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
