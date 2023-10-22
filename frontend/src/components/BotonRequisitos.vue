<template>
  <div class="color">
    <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="registrar">
              <div class="mb-3">
                <label for="recipient-id-emergencia" class="col-form-label">ID de Emergencia:</label>
                <div class="form-control" id="recipient-id-emergencia">{{ idEmergencia }}</div>
              </div>
              <div class="mb-3">
                <label for="recipient-edad" class="col-form-label">Edad:</label>
                <input type="number" class="form-control" id="recipient-edad" v-model = "edad">
              </div>
              <div class="mb-3">
                <label for="recipient-Altura" class="col-form-label">Altura:</label>
                <input type="number" class="form-control" id="recipient-Altura" v-model = "altura">
              </div>
              <div class="mb-3">
                <label for="recipient-Peso" class="col-form-label">Peso:</label>
                <input type="number" class="form-control" id="recipient-Peso" v-model = "peso">
              </div>
              <div class="mb-3">
                <label for="recipient-Experiencia" class="col-form-label">Experiencia:</label>
                <select class="form-select" id="recipient-Experiencia" v-model = "experiencia" >
                  <option value="novato">Novato</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="experimentado">Experimentado</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" >Send message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BotonPostular',
  components: {
  },
  data: function(){
    return {
      edad: 0,
      altura: 0,
      peso: 0,
      experiencia: "novato",
    }
  },
  props: {
    idEmergencia: Number, // Define una propiedad idEmergencia
  },
  mounted() {
  },
  methods:{
    registrar(){
      /*
      let json = {
        "edad": this.edad,
        "altura": this.altura,
        "peso": this.peso,
        "experiencia": this.experiencia,
      };
      * */
    }
  }
}
</script>

<style scoped>

.color{
  color: black;
}

</style>