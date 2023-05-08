"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      food.belongsToMany(models.animal, { through: models.animalFood });
      food.belongsToMany(models.cart, { through: models.cartFood });
    }
  }
  food.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "food",
    }
  );
  return food;
};
