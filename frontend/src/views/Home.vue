<template>
  <v-container align="center" class="mx-auto mt-5 blue-grey darken-4">
    <!-- <v-img class="mb-5" contain height="300" src="../assets/icon.svg"></v-img>
    <v-row align="center" justify="center">
      <v-btn class="white accent-2 mb-5" elevation="2" plain small to="/signup">
        Créer un compte</v-btn
      >
    </v-row> -->

    <Login />
  </v-container>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
