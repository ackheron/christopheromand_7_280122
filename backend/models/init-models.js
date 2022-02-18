var DataTypes = require("sequelize").DataTypes;
var _Comments = require("./comment");
var _Dislikes = require("./dislike");
var _Likes = require("./like");
var _Messages = require("./message");
var _Users = require("./user");

function initModels(sequelize) {
  var Comments = _Comments(sequelize, DataTypes);
  var Dislikes = _Dislikes(sequelize, DataTypes);
  var Likes = _Likes(sequelize, DataTypes);
  var Messages = _Messages(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Comments.belongsTo(Messages, { as: "Message", foreignKey: "MessageId" });
  Messages.hasMany(Comments, { as: "Comments", foreignKey: "MessageId" });
  Dislikes.belongsTo(Messages, { as: "Message", foreignKey: "MessageId" });
  Messages.hasMany(Dislikes, { as: "Dislikes", foreignKey: "MessageId" });
  Likes.belongsTo(Messages, { as: "Message", foreignKey: "MessageId" });
  Messages.hasMany(Likes, { as: "Likes", foreignKey: "MessageId" });
  Comments.belongsTo(Users, { as: "User", foreignKey: "UserId" });
  Users.hasMany(Comments, { as: "Comments", foreignKey: "UserId" });
  Dislikes.belongsTo(Users, { as: "User", foreignKey: "UserId" });
  Users.hasMany(Dislikes, { as: "Dislikes", foreignKey: "UserId" });
  Likes.belongsTo(Users, { as: "User", foreignKey: "UserId" });
  Users.hasMany(Likes, { as: "Likes", foreignKey: "UserId" });
  Messages.belongsTo(Users, { as: "User", foreignKey: "UserId" });
  Users.hasMany(Messages, { as: "Messages", foreignKey: "UserId" });

  return {
    Comments,
    Dislikes,
    Likes,
    Messages,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
