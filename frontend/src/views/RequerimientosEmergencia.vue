<template>
  <div class="about cuerpo">
    <Navbar />
    <div class="container">

      <form class="left">
        <div class="form-group">
          <br />
          <label for="inputHabilidad">Habilidad</label>
          <select class="form-control" id="inputHabilidad" v-model="form.id_habilidad">
            <option value="" disabled>Selecciona una habilidad</option>
            <option v-for="habilidad in habilidades" :key="habilidad.id_habilidad" :value="habilidad.id_habilidad">{{ habilidad.habilidad }}</option>
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
  name: 'RequerimientoEmergencia',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      idUser: null,
      form: {
        "id_habilidad": "",
        "id_emergencia": "",
      },
      habilidades: [],
    }
  },
  created() {
    axios.get("http://localhost:8090/api/habilidades/listar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
        .then(response => {
          this.habilidades = response.data;
        })
        .catch(error => {
          console.error("Error al obtener la lista de habilidades:", error);
        });

    axios.get("http://localhost:8090/api/emergencia/last", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
        .then(response => {
          const lastEmergencia = response.data;
          this.form.id_emergencia = lastEmergencia.id_emergencia;
        })
        .catch(error => {
          console.error("Error al obtener la lista de emergencias:", error);
        });



    },
  methods: {
    crear() {
      let json = {
        "id_emergencia": this.form.id_emergencia,
        "id_habilidad": this.form.id_habilidad,
      };

      axios.post("http://localhost:8090/api/eme_habilidades", json, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error("Error al crear la eme_habilidades:", error);
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
