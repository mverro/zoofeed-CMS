"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.user);
      cart.belongsToMany(models.food, { through: models.cartFood });
      cart.belongsToMany(models.ticket, { through: models.cartTicket });
      cart.belongsTo(models.order);
    }
  }
  cart.init(
    {
      userId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      orderId : DataTypes.INTEGER,
      status : DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: function (cart, options) {
          cart.orderId = 0;
          cart.status = false;
        },
      },
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
