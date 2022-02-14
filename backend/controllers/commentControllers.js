/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/
const db = require("../models");

/************************************** LOGIQUE MÉTIER  ******************************************/

exports.createComment = (req, res) => {
  db.User.findOne({
    attributes: ["id", "username", "email"],
    where: { id: req.userId },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur inconnu !" });
      }

      db.Message.findOne({
        where: { id: req.params.id },
      })
        .then((message) => {
          if (!message) {
            return res.status(401).json({ error: "Message inconnu !" });
          }

          db.Comment.create({
            content: req.body.content,
            MessageId: req.params.id,
            UserId: user.id,
          })
            .then((comment) => {
              return res
                .status(201)
                .json({ comment, message: "Commentaire créé !" });
            })
            .catch((error) => {
              console.log("0", error);
              return res.status(400).json({ error: "Pas de création" });
            });
        })
        .catch((error) => {
          res.status(400).json({ error: "Problème ici !" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Impossible !" });
    });
};

exports.deleteComment = (req, res) => {
  db.Comment.findOne({
    where: { id: req.params.id },
  })
    .then((commentFound) => {
      if (commentFound) {
        db.User.findOne({
          attributes: ["isAdmin"],
          where: { id: req.userId },
        })
          .then((userIsAdmin) => {
            // Si l'utilisateur est le créateur OU admin dans la db, on supprime le commentaire
            if (
              req.userId == commentFound.UserId ||
              userIsAdmin.dataValues.isAdmin == true
            ) {
              db.Comment.destroy({
                where: { id: req.params.id },
              })
                .then(() =>
                  res.status(201).json({ message: "Commentaire supprimé" })
                )
                .catch((error) => res.status(404).json({ error }));
            } else {
              // Si l'utilisateur n'est pas le créateur ni admin
              // Status 403 : non autorisé
              res.status(403).json({
                error: "Vous n'êtes pas autorisé à supprimer le commentaire",
              });
            }
          })
          .catch((error) =>
            res.status(500).json({
              error: "Impossible de communiquer avec la base de données",
            })
          );
      } else {
        res.status(404).json({ error: "Commentaire non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Impossible de supprimer le commentaire" })
    );
};

exports.updateComment = (req, res) => {
  const id = req.params.id;
  const data = req.file
    ? {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
      };

  db.Comment.findByPk(id).then((message) => {
    const filename = message.attachment
      ? {
          name: message.attachment.split("3000/")[1],
        }
      : {
          name: message.attachment,
        };
    fs.unlink(`images/${filename.name}`, () => {
      db.Message.update(data, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Le commentaire a été mis à jour.",
            });
          } else {
            res.send({
              message: "Erreur lors de la mise à jour du commentaire",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Impossible de mettre à jour ce commentaire",
          });
        });
    });
  });
};
