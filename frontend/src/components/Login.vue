<template>
  <v-card width="400" class="mx-auto mt-5 rounded-xl" elevation="10">
    <v-card-title>Connexion</v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="userInfo.email"
          label="Email"
          prepend-icon="mdi-at"
        />
        <v-text-field
          v-model="userInfo.password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="black" dark @click="login()">
        Connexion
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", this.userInfo)
        .then((response) => {
          console.log("Login OK! ", response);
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setAdmin", response.data.isAdmin);
          this.$store.dispatch("setUser", response.data.userId);
          this.$store.dispatch("setUsername", response.data.username);
          this.$store.dispatch("setSnackbar", {
            text: `Content de vous revoir sur Groupomania, ${response.data.username} !`,
          });
          this.$router.push("/messages");
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: `Identifiants incorrects !`,
          });
        });
    },
  },
};
</script>
