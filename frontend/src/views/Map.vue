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
  },
  mounted() {
    this.idUser = localStorage.getItem("id");
    this.correo = localStorage.getItem("correo");

    if(localStorage.getItem("id") != null){
      if(localStorage.getItem("id") == this.$route.params.id){
        this.idUser = this.$route.params.id;
      }
      else {
        this.$router.push("/coordinador/" + localStorage.getItem("id") + "/map");
      }
    }
    else {
      this.$router.push("/");
    }
  },
}
</script>

<style scoped>

.cuerpo{
  color : white;
}

</style>
```

