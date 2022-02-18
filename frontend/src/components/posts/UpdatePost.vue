<template>
  <v-container>
    <v-card class="pa-10 mt-5">
      <v-form
        ref="form"
        enctype="multipart/form-data"
        @submit.prevent="updateMsg"
        v-model="valid"
      >
        <h3 class="mb-5" align="center">Modifier votre message</h3>
        <div>
          <input
            type="file"
            ref="file"
            name="file"
            id="file"
            class="inputfile"
            @change="selectFile"
          />
          <label for="file"
            ><v-icon color="green darken-2" hover>mdi-camera-plus</v-icon>
            Ajouter une image</label
          >
        </div>

        <div class="my-5">
          <v-textarea
            filled
            v-model="content"
            label="Mon message"
            type="text"
            :rules="contentRules"
          ></v-textarea>
        </div>
        <div class="space">
          <label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
          <img contain height="100" v-if="imgPreview" :src="imgPreview" />
        </div>

        <div>
          <v-btn
            text
            color="green accent-5"
            type="submit"
            value="submit"
            :disabled="!valid"
            >Poster</v-btn
          >
          <router-link :to="`/posts/`">
            <v-btn text color="red accent-4">Annuler</v-btn>
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import { mapState } from "vuex";

export default {
  name: "UpdateMessage",
  components: {},
  data() {
    return {
      valid: false,
      title: "",
      content: "",
      file: "",
      imgPreview: "",
    };
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.imgPreview = URL.createObjectURL(this.file);
    },
    updateMsg() {
      const fd = new FormData();
      fd.append("title", this.title);
      fd.append("content", this.content);
      fd.append("image", this.file);

      if (this.$refs.form.validate()) {
        axios
          .put(
            "http://localhost:3000/api/posts/update/" + this.$route.params.id,
            fd,
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then(() => {
            this.$store.dispatch("setSnackbar", {
              text: "Votre message a été modifié.",
            });
            this.$router.push({
              name: "AllPosts",
            });
          });
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: "Une erreur c'est produite, veuillez réessayer.",
        });
      }
    },
  },
  computed: {
    ...mapState(["isAdmin", "userId"]),
  },
};
</script>
