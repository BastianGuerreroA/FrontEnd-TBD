<template>
  <div class="about cuerpo">
    <Navbar/>
    <div class = "container">
      <form class="left">
        <div class="form-group">
          <br>
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model = "form.email">
        </div>
        <div class="form-group">
          <br>
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model = "form.password">
        </div>
        <br>
        <button type="submit" class="btn btn-primary" v-on:click="actualizar()">Actualizar</button>
        <br>
        <button type="button" class="btn btn-danger" v-on:click="devuelta()" style="margin-top: 20px">Cancelar</button>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: 'EditarUser',
  components: {
    Navbar,
    Footer
  },
  data: function(){
    return {
      idUser: null,
      form:{
        "id" : "",
        "email" : "",
        "password": "",
        "rol": "",
      }
    }
  },
  mounted: function (){
    this.idUser = this.$route.params.id;
    axios.get("http://localhost:8090/api/usuario/" + this.idUser)
        .then(data =>{
          this.form.email = data.data.email;
          this.form.password = data.data.password;
          this.form.id = data.data.id;
          this.form.rol = data.data.rol;
        })

  },
  methods:{
    actualizar(){
      axios.put("http://localhost:8090/api/usuario/actualizar" , this.form)
          .then(data =>{
            console.log(data);
          })
    },
    devuelta(){
      this.$router.push("/home/"+ localStorage.getItem("id"));
    }
  }
}
</script>

<style scoped>
.left{
  text-align:left;
}

.cuerpo{
  color : white;
}
</style>
```

