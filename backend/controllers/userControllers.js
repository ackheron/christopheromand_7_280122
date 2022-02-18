/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

const bcrypt = require("bcrypt"); // Déclaration et importation du package bcrypt pour le hash du mot de passe dans la base de donnée
const db = require("../models/"); //modèle de la base de donnée schéma utilisateurs
const jwt = require("jsonwebtoken"); // Déclaration et importation du package jsonwebtoken, le token d'authentification
const cryptojs = require("crypto-js"); //Déclaration et importation du package crypto-js pour chiffrer déchiffrer l'email dans la base de donnée
const fs = require("fs"); //Package pour accéder et interagir avec le système de fichiers

//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv").config;

/************************************** LOGIQUE MÉTIER  ******************************************/

exports.signup = (req, res) => {
  //chiffrer l'email dans la base de donnée
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  db.User.findOne({
    where: { email: emailCryptoJs },
  })
    .then((userFound) => {
      if (!userFound) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          db.User.create({
            email: emailCryptoJs,
            username: req.body.username,
            avatar: "",
            bio: "Profil à compléter...",
            password: hash,
            isAdmin: 0,
          })
            .then((user) => {
              res.status(201).json({
                message: "Nouveau profil accepté et crée !",
                id: user.id,
              });
            })
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(409).json({
          error: "Cette adresse mail existe déjà, nouveau profil refusé",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  db.User.findOne({ where: { email: emailCryptoJs } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé ! " });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            username: user.username,
            token: jwt.sign(
              {
                userId: user.id,
              },
              process.env.JWT_KEY_TOKEN,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUser = (req, res) => {
  db.User.findOne({
    attributes: ["username", "email", "bio", "avatar", "isAdmin", "id"],
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...req.body,
        avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  db.User.update(
    { ...userObject, id: req.params.id },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ ...userObject }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.avatar.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        db.User.destroy({ where: { id: req.params.id } })
          .then(res.status(200).json({ message: "profil supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
