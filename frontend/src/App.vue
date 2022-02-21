<template>
  <v-app>
    <NavBar />
    <v-main class="blue-grey darken-4">
      <router-view />
    </v-main>
    <SnackBar />
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import SnackBar from "@/components/SnackBar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    NavBar,
    SnackBar,
    Footer,
  },
};
</script>
