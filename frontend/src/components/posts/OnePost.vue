<template>
  <v-container
    class="d-flex flex-column mx-auto my-10"
    justify-content="center"
    align="center"
  >
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          align="center"
          min-width="30vw"
          max-width="80vw"
        >
          <!-- Avatar et photos de l'utilisateur du post-->

          <v-list-item class="grey" align="left" hover>
            <router-link :to="`/account/${message.User.id}`">
              <v-list-item-avatar outlined color="grey darken-3">
                <v-img :src="message.User.avatar" alt="photo de profil"></v-img>
              </v-list-item-avatar>
            </router-link>

            <!-- Nom de l'utilisateur et date du post -->

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{
                message.User.username
              }}</v-list-item-title>
              <v-list-item-title class="text-caption">{{
                message.updatedAt | formatDate
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Contenu du post et de l'image si existante -->

          <v-row>
            <v-col>
              <v-card-title>{{ message.title }}</v-card-title>
              <v-card-text class="text-start">{{
                message.content
              }}</v-card-text>
              <v-img contain max-height="600" :src="message.attachment"></v-img>
            </v-col>
          </v-row>

          <v-card-actions align="center">
            <v-col>
              <!-- Modifier le post si utilisateur propriétaire -->

              <v-tooltip top v-if="message.User.id === userId">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mr-5" v-bind="attrs" v-on="on" text small>
                    <router-link :to="`/posts/update/${message.id}`">
                      <v-icon color="black" size="1.5rem">mdi-pen-plus</v-icon>
                    </router-link>
                  </v-btn>
                </template>
                <span>Modifier mon message</span>
              </v-tooltip>

              <!-- Supprimer le post si propriétaire ou administrateur-->

              <v-tooltip
                top
                v-if="message.User.id === userId || isAdmin === true"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click.stop="dialog = true"
                    v-bind="attrs"
                    v-on="on"
                    text
                    color="black"
                    small
                  >
                    <v-icon size="1.5rem">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>Supprimer</span>

                <!-- Boite de dialogue confirmation suppression du post -->

                <v-dialog v-model="dialog" max-width="600" persistent>
                  <v-card>
                    <v-card-title>
                      Suppression du message.
                    </v-card-title>
                    <v-card-text
                      >Veuillez confirmer la suppression du message, cette
                      action supprimera définitivement ce message de la base de
                      données</v-card-text
                    >
                    <v-card-actions @click="dialog = false">
                      <v-spacer></v-spacer>

                      <v-btn color="deep-orange darken-3" text>
                        Annuler
                      </v-btn>

                      <v-btn
                        color="deep-orange darken-3"
                        text
                        @click="deleteMessage"
                      >
                        Supprimer le message
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-tooltip>
            </v-col>

            <!-- Gestion des likes du post -->
            <v-col>
              <v-tooltip top v-if="!isLiked">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="addLike"
                    aria-label="Aimer ce message"
                  >
                    <v-icon size="1.5rem" color="green">
                      mdi-thumb-up-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>J'aime</span>
              </v-tooltip>
              <v-tooltip top v-else-if="isLiked">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="removeLike"
                    aria-label="Ne plus aimer ce message"
                  >
                    <v-icon size="1.5rem" color="green">
                      mdi-thumb-up
                    </v-icon>
                  </v-btn>
                </template>
                <span>Je n'aime plus</span>
              </v-tooltip>
              <span>{{ Likes.length }}</span>
            </v-col>

            <!-- Gestion des dislikes du post -->

            <v-col>
              <v-tooltip top v-if="!isDisliked">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="addDislike"
                    aria-label="Désapprouvé ce message"
                  >
                    <v-icon size="1.5rem" color="red">
                      mdi-thumb-down-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Je n'aime pas</span>
              </v-tooltip>
              <v-tooltip top v-else-if="isDisliked">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="removeDislike"
                    aria-label="Ne plus désapprouver ce message"
                  >
                    <v-icon size="1.5rem" color="red">
                      mdi-thumb-down
                    </v-icon>
                  </v-btn>
                </template>
                <span>Je n'aime plus</span>
              </v-tooltip>
              <span>{{ Dislikes.length }}</span>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-------------------------------------------
                          PARTIE AFFICHAGE DES COMMENTAIRES
                 ---------------------------------------------->

    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto my-5"
          min-width="350"
          max-width="60vw"
          v-for="comment in message.Comments"
          :key="comment.id"
        >
          <!-- Avatar et photos de l'utilisateur qui commente-->

          <v-list-item class="grey">
            <router-link :to="`/account/${comment.User.id}`">
              <v-list-item-avatar outlined color="grey darken-3">
                <v-img
                  x-small
                  :src="comment.User.avatar"
                  alt="photo du compte qui commente"
                ></v-img>
              </v-list-item-avatar>
            </router-link>

            <v-card-text
              ><span class="font-weight-medium text-decoration-underline">{{
                comment.User.username
              }}</span>
              a commenté :</v-card-text
            >
          </v-list-item>

          <!-- Contenu du commentaire -->

          <v-card-text class="black--text">{{ comment.content }}</v-card-text>

          <v-list-item>
            <!-- Date du commentaire -->

            <v-card-text class="end text-caption"
              >le {{ comment.createdAt | formatDate }}</v-card-text
            >

            <!-- Bouton suppression du commentaire si propriétaire ou administrateur -->

            <v-tooltip
              right
              top
              v-if="comment.User.id == userId || isAdmin == true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click.stop="dialog = true"
                  v-bind="attrs"
                  v-on="on"
                  text
                  color="black"
                  small
                  aria-label="Supprimer ce commentaire"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>

              <!-- Boite de dialogue confirmation suppression du commentaire-->

              <v-dialog v-model="dialog" max-width="500">
                <v-card>
                  <v-card-title>
                    Supprimer votre commentaire ?
                  </v-card-title>

                  <v-card-actions @click="dialog = false">
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text>
                      Annuler
                    </v-btn>

                    <v-btn
                      color="green darken-3"
                      text
                      @click="deleteComment(comment.id)"
                    >
                      Supprimer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-tooltip>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <!-------------------------------------------
                          PARTIE DES AJOUT D'UN COMMENTAIRE
                 ---------------------------------------------->

    <v-col cols="12">
      <v-card class="mx-auto">
        <v-container>
          <v-card flat>
            <div>
              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="commentSubmit()"
              >
                <v-textarea
                  id="postCom"
                  outlined
                  v-model="comment"
                  type="text"
                  placeholder="Ajouter un commentaire à ce message..."
                  required
                ></v-textarea>
                <div align="center">
                  <v-btn
                    type="submit"
                    small
                    value="submit"
                    color="cyan darken-2"
                    dark
                    :disabled="!valid"
                    >Poster</v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-card>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
  name: "OnePost",
  components: {},

  data() {
    return {
      user: {},
      message: {
        User: {
          id: "",
          username: "",
          avatar: "",
        },
        Comments: [],
      },
      comment: "",
      Likes: [],
      Dislikes: [],
      isLiked: 0,
      isDisliked: 0,
      dialog: false,
      valid: false,
    };
  },
  created() {
    this.getLikes();
    this.getDislikes();
    axios
      .get("http://localhost:3000/api/posts/" + this.$route.params.id, {
        headers: {
          Authorization: `Bearer ${$store.state.token}`,
        },
      })
      .then((response) => {
        this.message = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    deleteMessage() {
      this.dialog = false;
      axios
        .delete(
          "http://localhost:3000/api/posts/delete/" + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            text: "Votre message a été supprimé.",
          });
          this.$router.push({
            name: "AllPosts",
          });
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Impossible de supprimer le message.",
          });
        });
    },
    commentSubmit() {
      if (this.$refs.form.validate()) {
        axios
          .post(
            "http://localhost:3000/api/post/" +
              this.$route.params.id +
              "/comment/",
            { content: this.comment },
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then(() => {
            this.$store.dispatch("setSnackbar", {
              text: "Commentaire ajouté.",
            });
            window.location.reload();
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              text: "Impossible d'ajouter votre commentaire.",
            });
          });
      }
    },
    deleteComment(id) {
      axios
        .delete(
          "http://localhost:3000/api/post/" +
            +this.$route.params.id +
            "/comment/" +
            id,
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setSnackbar", {
            text: "Commentaire supprimé.",
          });
          window.location.reload();
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Impossible de supprimer votre commentaire.",
          });
        });
    },

    getLikes() {
      axios
        .get(
          "http://localhost:3000/api/post/" + +this.$route.params.id + "/like",
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.Likes = response.data;

          for (let i = 0; i < this.Likes.length; i++) {
            if (this.Likes[i].UserId == $store.state.userId) {
              this.isLiked++;
              break;
            }
          }
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Erreur de chargement. Veuillez réessayer.",
          });
        });
    },
    addLike() {
      if (this.isLiked == 0) {
        const data = {
          UserId: $store.state.userId,
          MessageId: this.$route.params.id,
        };
        axios
          .post(
            "http://localhost:3000/api/post/" +
              +this.$route.params.id +
              "/like",
            data,
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.like = response.data;
            this.$store.dispatch("setSnackbar", {
              text: "Like ajouté !",
            });
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: "Veuillez réessayer.",
        });
      }
    },
    removeLike() {
      if (this.isLiked == 1) {
        axios
          .delete(
            "http://localhost:3000/api/post/" +
              +this.$route.params.id +
              "/like",
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.like = response.data;
            this.$store.dispatch("setSnackbar", {
              text: "Like supprimé.",
            });
            this.$router.go();
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              color: "error",
              text: "Veuillez réessayer.",
            });
          });
      }
    },

    getDislikes() {
      axios
        .get(
          "http://localhost:3000/api/post/" +
            +this.$route.params.id +
            "/dislike",
          {
            headers: {
              Authorization: `Bearer ${$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.Dislikes = response.data;

          for (let i = 0; i < this.Likes.length; i++) {
            if (this.Dislikes[i].UserId == $store.state.userId) {
              this.isDisliked++;
              break;
            }
          }
        })
        .catch(() => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Erreur de chargement. Veuillez réessayer.",
          });
        });
    },
    addDislike() {
      if (this.isDisliked == 0) {
        const data = {
          UserId: $store.state.userId,
          MessageId: this.$route.params.id,
        };
        axios
          .post(
            "http://localhost:3000/api/post/" +
              +this.$route.params.id +
              "/dislike",
            data,
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.like = response.data;
            this.$store.dispatch("setSnackbar", {
              text: "Like ajouté !",
            });
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: "Veuillez réessayer.",
        });
      }
    },
    removeDislike() {
      if (this.isDisliked == 1) {
        axios
          .delete(
            "http://localhost:3000/api/post/" +
              +this.$route.params.id +
              "/dislike",
            {
              headers: {
                Authorization: `Bearer ${$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.like = response.data;
            this.$store.dispatch("setSnackbar", {
              text: "Like supprimé.",
            });
            this.$router.go();
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

  filters: {
    formatDate: function(value) {
      if (value) {
        return dayjs(String(value)).format("DD-MMM-YYYY à HH:mm");
      }
    },
  },
  computed: {
    ...mapState(["isAdmin", "userId"]),
  },
};
</script>
