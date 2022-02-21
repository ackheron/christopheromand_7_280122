<template>
  <v-app class="blue-grey darken-4">
    <v-container justify-content="center" align="center">
      <!-- test fab button -->
      <v-tooltip fixed right bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            medium
            color="deep-orange darken-3"
            fixed
            right
            bottom
            v-bind="attrs"
            v-on="on"
            to="/posts/create"
          >
            <v-icon dark>mdi-pen-plus</v-icon>
          </v-btn>
        </template>
        <span>Poster un message</span>
      </v-tooltip>

      <v-flex>
        <v-card
          v-for="(message, index) in messageList"
          :key="index"
          flat
          hover
          :to="{ name: 'OnePost', params: { id: message.id } }"
          class="blue-grey darken-4 mx-auto rounded-xs"
          elevation="5"
          min-width="30vw"
          max-width="80vw"
        >
          <v-card class="my-10 mx-auto blue-grey darken-4" align="center">
            <v-list-item class="grey" align="left" hover>
              <v-list-item-avatar color="grey darken-3">
                <v-img :src="message.User.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">{{
                  message.User.username
                }}</v-list-item-title>
                <v-list-item-title class="text-caption">{{
                  message.createdAt | formatDate
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-row>
              <v-col>
                <v-card-text
                  class="text-start white--text font-weight-medium"
                  >{{ message.content }}</v-card-text
                >
                <v-img
                  contain
                  max-height="500"
                  :src="message.attachment"
                ></v-img>
              </v-col>
            </v-row>

            <v-card-actions
              align="center"
              class="grey darken-4 pt-0 pb-0 mt-15"
            >
              <!-- Implantation de l'icône commentaire -->
              <v-col class="pt-0 pb-0">
                <v-icon
                  class="mr-1 white--text"
                  size="1.5rem"
                  aria-label="Nombre de commentaire"
                >
                  mdi-message-reply-outline</v-icon
                >
                <span class="white--text">{{ message.Comments.length }}</span>
              </v-col>

              <!-- Implantation de l'icône like -->
              <v-col class="pt-0 pb-0">
                <v-icon
                  class="mr-1 white--text"
                  size="1.5rem"
                  aria-label="Nombre de likes sur ce message"
                >
                  mdi-thumb-up-outline
                </v-icon>
                <span class="white--text">{{ message.Likes.length }}</span>

                <!-- Implantation de l'icône dislike -->
                <v-icon
                  class="mr-1 ml-3 white--text"
                  size="1.5rem"
                  aria-label="Nombre de dislikes sur ce message"
                >
                  mdi-thumb-down-outline
                </v-icon>
                <span class="white--text">{{ message.Dislikes.length }}</span>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import dayjs from "dayjs";

export default {
  name: "AllPosts",
  components: {},
  data: () => {
    return {
      user: {},
      messageList: [],
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return dayjs(String(value)).format("DD-MMM-YYYY à HH:mm");
      }
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: `Bearer ${$store.state.token}`,
        },
      })
      .then((response) => {
        this.messageList = response.data;
        console.log(this.messageList);
      })

      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
