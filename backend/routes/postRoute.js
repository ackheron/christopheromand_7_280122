/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du middleware auth qui protège les routes sélectionnées et vérifiera que l'utilisateur est authentifié par token avant d'autoriser l'envoi des requêtes.
const auth = require("../middleware/auth");

// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const multer = require("../middleware/multer-config");

// Déclaration et importation du controller postControllers et sa logique métier
const postControllers = require("../controllers/postControllers");

/************************************** ROUTERS  ******************************************/

router.post("/create", auth, multer, postControllers.createPost);
router.get("/", auth, postControllers.getAllPosts);
router.get("/:id", auth, postControllers.getOnePost);
router.put("/update/:id", auth, multer, postControllers.updatePost);
router.delete("/delete/:id", auth, postControllers.deletePost);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
