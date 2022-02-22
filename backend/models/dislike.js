"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Dislike.belongsTo(models.Message);
      models.Dislike.belongsTo(models.User);
    }
  }
  Dislike.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      MessageId: {
        type: DataTypes.INTEGER,
      },
      // like: DataTypes.INTEGER,
      // dislike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dislike",
    }
  );
  return Dislike;
};
