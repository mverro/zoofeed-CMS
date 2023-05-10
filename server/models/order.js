"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.hasOne(models.payment);
      order.hasMany(models.cart);
    }
  }
  order.init(
    {
      total: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeCreate: function (order, options) {
          order.total = 0;
        },
      },
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
