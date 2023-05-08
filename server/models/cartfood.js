"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cartFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartFood.belongsTo(models.cart);
      cartFood.belongsTo(models.food);
    }
  }
  cartFood.init(
    {
      cartId: DataTypes.INTEGER,
      foodId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cartFood",
    }
  );
  return cartFood;
};
