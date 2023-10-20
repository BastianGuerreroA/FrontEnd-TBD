<template>
  <div class="about">
    <Navbar/>
    <Footer/>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

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
    this.idUser = this.$route.params.id;
        console.log(this.idUser);
  }
}
</script>

<style scoped>
</style>
```

