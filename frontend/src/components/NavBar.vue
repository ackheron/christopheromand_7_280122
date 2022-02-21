<template>
  <v-app-bar app color="deep-orange darken-3" dark>
    <h1>
      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none white--text">
          <v-img
            src="../assets/icon-left-font-monochrome-white.png"
            max-height="150"
            max-width="100"
            alt="HOME"
          ></v-img>
          <v-tooltip><span>test</span></v-tooltip>
        </router-link>
      </v-toolbar-title>
    </h1>

    <v-spacer></v-spacer>

    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          to="/posts"
          icon
          v-bind="attrs"
          v-on="on"
          aria-label="Aller à la page de tous les posts"
        >
          <v-icon>
            mdi-home-circle
          </v-icon>
        </v-btn>
      </template>
      <span>Afficher Tous les messages</span>
    </v-tooltip>

    <!-- <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          to="/posts/create"
          icon
          v-bind="attrs"
          v-on="on"
          aria-label="Poster un message"
        >
          <v-icon>
            mdi-note-plus
          </v-icon>
        </v-btn>
      </template>
      <span>Poster un message</span>
    </v-tooltip> -->

    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="myAccount"
          icon
          v-bind="attrs"
          v-on="on"
          aria-label="Aller à la page de mon compte"
        >
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <span>Mon profil</span>
    </v-tooltip>

    <v-tooltip v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="logout"
          icon
          v-bind="attrs"
          v-on="on"
          aria-label="Se déconnecter"
        >
          <v-icon>
            mdi-location-exit
          </v-icon>
        </v-btn>
      </template>
      <span>Déconnexion</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapState(["isLogged"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout"), this.$router.push("/");
    },
    myAccount() {
      if (this.$route.path == `/account/${this.$store.state.userId}`) {
        window.location.reload();
      } else {
        this.$router.push(`/account/${this.$store.state.userId}`);
      }
    },
  },
};
</script>
