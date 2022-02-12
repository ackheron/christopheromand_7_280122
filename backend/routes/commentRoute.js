/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du controller likeControllers et sa logique métier
const commentControllers = require("../controllers/commentControllers");

/************************************** ROUTERS  ******************************************/

router.post("/:id/comment", auth, multer, commentControllers.createComment);
router.delete("/:id/comment/:id", auth, commentControllers.deleteComment);
router.put("/:id/comment/:id", auth, commentControllers.updatePost);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
