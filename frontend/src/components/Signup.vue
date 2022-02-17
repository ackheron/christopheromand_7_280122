<template>
  <v-container>
    <v-card width="400" class="mx-auto mt-5 rounded-xl">
      <v-img class="mb-5" contain height="300" src="../assets/icon.png"></v-img>
      <v-card-title class="mx-auto mt-5 text-xs-center "
        >Créer une nouveau compte</v-card-title
      >
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="userInfo.username"
            label="Username"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="userInfo.email"
            label="Email"
            type="email"
            prepend-icon="mdi-account-circle"
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
        <v-btn color="dark" dark @click="submitForm"> S'inscrire</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/api/auth/signup", this.userInfo)
          .then((response) => {
            console.log("Register OK! ", response);
            this.$store.dispatch("setSnackbar", {
              showing: true,
              text: `Votre compte a bien été créé !`,
            });
            this.$router.push("/");
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              showing: true,
              text: `L'adresse email est déjà prise`,
            });
          });
      }
    },
  },
};
</script>
