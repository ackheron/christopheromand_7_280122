/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/
const db = require("../models");

// Ajouter un like

exports.addLike = (req, res) => {
  const like = {
    MessageId: req.body.MessageId,
    UserId: req.userId,
  };
  db.Like.create(like)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erreur like impossible sur ce message.",
      });
    });
};

// Récupérer les likes d'un message
exports.getLike = (req, res) => {
  db.Like.findAll({ where: { MessageId: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un like
exports.deleteLike = (req, res) => {
  db.Like.findOne({ where: { UserId: req.userId, MessageId: req.params.id } })
    .then((like) => {
      like
        .destroy()
        .then(() => res.status(200).json({ message: "Le like a été annulé !" }))
        .catch((error) => {
          console.log("2", error);
          res.status(404).json({ error });
        });
    })

    .catch((error) => {
      console.log("1", error);
      res.status(500).json({ error });
    });
};

/***************************************************************************** */

// Ajouter un dislike

exports.addDislike = (req, res) => {
  const dislike = {
    MessageId: req.body.MessageId,
    UserId: req.userId,
  };
  db.Dislike.create(dislike)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || " Erreur dislike impossible sur ce message.",
      });
    });
};

// Récupérer les likes d'un message
exports.getDislike = (req, res) => {
  db.Dislike.findAll({ where: { MessageId: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un dislike
exports.deleteDislike = (req, res) => {
  db.Dislike.findOne({
    where: { UserId: req.userId, MessageId: req.params.id },
  })
    .then((dislike) => {
      dislike
        .destroy()
        .then(() =>
          res.status(200).json({ message: "Le dislike a été annulé !" })
        )
        .catch((error) => {
          console.log("2", error);
          res.status(404).json({ error });
        });
    })

    .catch((error) => {
      console.log("1", error);
      res.status(500).json({ error });
    });
};
