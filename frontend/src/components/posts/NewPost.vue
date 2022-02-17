<template>
  <v-container>
    <v-card class="pa-2 mt-7">
      <v-card-title>Écrire un nouveau message</v-card-title>
      <v-form
        ref="form"
        enctype="multipart/form-data"
        @submit.prevent="newPost"
      >
        <div class="mt-5">
          <v-textarea
            filled
            v-model="content"
            label="Mon message"
            type="text"
            :rules="contentRules"
          ></v-textarea>
        </div>

        <div class="d-flex flex-column">
          <label for="file" class="mb-5"
            ><v-icon color="green darken-2" hover>mdi-camera-plus</v-icon>
            Ajouter une image</label
          >
          <input
            type="file"
            ref="file"
            name="file"
            id="file"
            class="image"
            @change="selectFile"
          />
        </div>

        <div>
          <label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
          <img contain height="100" v-if="imgPreview" :src="imgPreview" />
        </div>

        <div align="center" class="mt-10">
          <v-btn
            align="center"
            color="black white--text"
            type="submit"
            value="submit"
            dark
            >Poster</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";

export default {
  name: "newPost",
  components: {},

  data() {
    return {
      title: "",
      content: "",
      file: "",
      imgPreview: "",
      contentRules: [
        (v) => (v && v.length >= 3) || "Veuillez ajouter un message.",
      ],
    };
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.imgPreview = URL.createObjectURL(this.file);
    },

    newPost() {
      const fd = new FormData();
      fd.append("content", this.content);
      fd.append("image", this.file);

      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/api/post/create", fd, {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          })
          .then(() => {
            this.$store.dispatch("setSnackbar", {
              text: "Votre message a été posté",
            });
            this.$router.push({
              name: "allPosts",
            });
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              text: "Veuillez réessayer.",
            });
          });
      }
    },
  },
};
</script>
