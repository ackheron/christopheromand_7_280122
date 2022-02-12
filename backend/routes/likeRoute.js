/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du controller likeControllers et sa logique métier
const likeControllers = require("../controllers/likeControllers");

/************************************** ROUTERS  ******************************************/

router.post("/:id/like", auth, likeControllers.addLike);
router.post("/:id/dislike", auth, likeControllers.addDislike);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
