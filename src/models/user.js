"use strict";
const { Model } = require("sequelize");
//npm validator package
const { isEmail, isStrongPassword, isMobilePhone } = require("validator");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [10],
        },
      },
      email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        // validate: {
        //   isEmail: {
        //     args: true,
        //     msg: "Invalid email format",
        //   },
        // },
        validate: {
          isEmail: {
            args: true,
            msg: "email validation failed",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isStrongPassword(value) {
        //     if (!validator.isStrongPassword(value)) {
        //       throw new Error(
        //         "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."
        //       );
        //     }
        //   },
        // },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
