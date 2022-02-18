const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Dislikes",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      MessageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Messages",
          key: "id",
        },
      },
      like: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      dislike: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Dislikes",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "UserId",
          using: "BTREE",
          fields: [{ name: "UserId" }],
        },
        {
          name: "MessageId",
          using: "BTREE",
          fields: [{ name: "MessageId" }],
        },
      ],
    }
  );
};
