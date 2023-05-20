"use strict";
const { encryptPwd } = require("../helper/encrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.animal, { through: models.animalUser });
      user.belongsTo(models.role);
      user.hasMany(models.cart);
      user.hasMany(models.payment);
      user.hasMany(models.userTicket);
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name cant be empty",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Age cant be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email cant be empty",
          },
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encryptPwd(user.password);
          user.imageUrl =
            "images/portrait-placeholder.png";
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
