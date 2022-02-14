/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du middleware password pour le contrôle mot de passe utilisateur
const password = require("../middleware/password");

// Déclaration et importation du middleware email pour le contrôle de la validité de l'adresse mail
const mail = require("../middleware/email");

// Déclaration et importation du middleware auth qui protège les routes sélectionnées et vérifiera que l'utilisateur est authentifié par token avant d'autoriser l'envoi de ses requêtes.
const auth = require("../middleware/auth");

// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const multer = require("../middleware/multer-config");

// Déclaration et importation du controller userControllers
const userControllers = require("../controllers/userControllers");

/************************************** ROUTERS  ******************************************/

// Routes post pour l'enregistrement d'un nouvel utilisateur, (endpoint) /signup
router.post("/signup", mail, password, userControllers.signup);

// Routes post pour la connection d'un utilisateur, (endpoint) /login
router.post("/login", userControllers.login);

// Routes get pour la l'affichage d'un profil, (endpoint) / profile/:id
router.get("/profile/:id", auth, userControllers.getUser);

// Routes put pour la mise à jour d'un profil, (endpoint) / profile:/id
router.put("/profile/:id", auth, multer, userControllers.updateUser);

// Routes delete pour la suppression d'un profil, (endpoint) / profile/:id
router.delete("/profile/:id", auth, userControllers.deleteUser);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
