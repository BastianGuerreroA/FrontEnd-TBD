<template>
  <div class="about cuerpo">
    <Navbar/>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center">Mapa de emergencias</h1>
          <Lmap/>
        </div>
      </div>
    </div>


    <Footer/>

  </div>

</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Lmap from "@/components/Lmap.vue";

export default {
  name: 'AboutView',
  components: {
    Navbar,
    Footer,
    Lmap
  },
  data: function(){
    return {
      idUser: null,
      listaEmergencias: null,
      correo: "",
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

