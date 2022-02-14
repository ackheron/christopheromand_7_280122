/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du controller likeControllers et sa logique métier
const commentControllers = require("../controllers/commentControllers");

// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const multer = require("../middleware/multer-config");

// Déclaration et importation du middleware auth qui protège les routes sélectionnées et vérifiera que l'utilisateur est authentifié par token avant d'autoriser l'envoi de ses requêtes.
const auth = require("../middleware/auth");
/************************************** ROUTERS  ******************************************/

router.post("/:id/comment", auth, multer, commentControllers.createComment);
router.delete("/:id/comment/:id", auth, commentControllers.deleteComment);
router.put("/:id/comment/:id", auth, commentControllers.updateComment);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
