/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Déclaration du composant Signup
import Signup from "../components/Signup.vue";

// Déclaration des composants Posts
import AllPosts from "../components/posts/AllPosts.vue";
import NewPost from "../components/posts/NewPost.vue";
import OnePost from "../components/posts/OnePost.vue";
import UpdatePost from "../components/posts/UpdatePost.vue";

Vue.use(VueRouter);

/************************************** ROUTERS  ******************************************/

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/posts/create",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/posts/:id",
    name: "OnePost",
    component: OnePost,
  },
  {
    path: "/posts/update/:id",
    name: "UpdatePost",
    component: UpdatePost,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
