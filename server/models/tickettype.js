"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticketType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ticketType.hasOne(models.ticket);
      ticketType.hasMany(models.userTicket);
    }
  }
  ticketType.init(
    {
      category: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ticketType",
    }
  );
  return ticketType;
};
