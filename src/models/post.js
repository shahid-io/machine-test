"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, //to make by default public ( true : public, false: private)
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
