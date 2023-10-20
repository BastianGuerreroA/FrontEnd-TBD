<template>
  <div class="about">
    <Navbar/>
    <Footer/>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
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
      idUser: null
    }
  },
  mounted() {
    this.idUser = this.$route.params.idUser;
    axios.get("http://localhost:8080/usuario/"+ this.idUser)
        .then(response => {
          console.log(response.data);
        })
  }
}
</script>

<style scoped>
</style>
```

