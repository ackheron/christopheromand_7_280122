<template>
  <v-app class="grey darken-4">
    <v-container justify-content="center" align="center">
      <v-flex>
        <v-card
          v-for="(message, index) in messageList"
          :key="index"
          flat
          hover
          :to="{ name: 'OnePost', params: { id: message.id } }"
          class="grey darken-4"
        >
          <v-card
            class="my-10 mx-auto"
            align="center"
            min-width="30vw"
            max-width="80vw"
          >
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
                <v-card-text class="text-start">{{
                  message.content
                }}</v-card-text>
                <v-img
                  contain
                  max-height="500"
                  :src="message.attachment"
                ></v-img>
              </v-col>
            </v-row>

            <v-card-actions
              align="center"
              class="grey lighten-4 pt-0 pb-0 mt-15"
            >
              <!-- Implantation de l'icône commentaire -->
              <v-col class="pt-0 pb-0">
                <v-icon
                  class="mr-1 black--text"
                  size="1.5rem"
                  aria-label="Commenter ce message"
                >
                  mdi-message-text</v-icon
                >
                <span>{{ message.Comments.length }}</span>
              </v-col>

              <!-- Implantation des icônes like / dislike -->
              <v-col class="pt-0 pb-0">
                <v-icon
                  class="mr-1"
                  size="1.5rem"
                  color="green"
                  aria-label="Aimer ce message"
                >
                  mdi-thumb-up
                </v-icon>
                <span>{{ message.Likes.length }}</span>

                <v-icon
                  class="mr-1 ml-3"
                  size="1.5rem"
                  color="red"
                  aria-label="Désapprouver ce message"
                >
                  mdi-thumb-down
                </v-icon>
                <span>{{ message.Likes.length }}</span>
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
      })

      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
