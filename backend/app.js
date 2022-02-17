// Après l'installation du framework Express avec la ligne de commande "npm install express" on l'importe
const express = require("express");

// Creation de l'application app avec la méthode express()
const app = express();

const cors = require("cors");
// importation de morgan "http request logger"
const morgan = require("morgan");

// log des request et des response
app.use(morgan("dev"));

// importation du module path qui fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
const path = require("path");

const helmet = require("helmet");

/*********************** Déclarations et importation des routes  ****************************/

// const routesDesLikes = require("./routes/likeRoute");
const routesDesPosts = require("./routes/postRoute");
const routesDesComments = require("./routes/commentRoute");
const routesDesUsers = require("./routes/userRoute");

/*********************** Cross Origin Resource Sharing ****************************/

// Le CORS est un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles. Dans notre cas, nous avons deux origines : localhost:3000 pour la backend et localhost:8081 pour le frontend , et nous souhaiterions qu'elles puissent communiquer entre elles. Pour cela, nous devons ajouter des headers à notre objet  response

// app.use((req, res, next) => {
//   // Header qui permet à d'accéder à notre API depuis n'importe quelle origine ('*')
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Ajout des headers suivant aux requête envoyées vers notre API
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );

//   // Envoyer les requêtes avec les méthodes (GET, POST, PUT ...)
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });
app.use(cors());
/******************************************************************************** */

const db = require("./models");

//Connexion à la base de données
db.sequelize
  .authenticate()
  .then(() => {
    console.log("La connection à la base de données mariaDB a réussie !");
  })
  .catch((error) => {
    console.log(
      "Echec la connection à la base de données mariaDB a échouée ! : ",
      error
    );
  });

//transformer le corps de la requête hTTP en objet javascript utilisable accessible par l'intermédiaire de red.body
app.use(express.json());

// Gestion static qui permet les requêtes des images du répertoire /images indiqué au module Path
app.use("/images", express.static(path.join(__dirname, "images")));

//Route générale "./routes/userRoute" pour l'authentification et création utilisateur
app.use("/api/auth", routesDesUsers);

//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
app.use("/api/posts", routesDesPosts);

//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
app.use("/api/post", routesDesComments);

//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
// app.use("/api/post", routesDesLikes);

// exportation de app.js pour que les autres fichiers puissent y accéder
module.exports = app;
