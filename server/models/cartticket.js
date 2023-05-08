'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartTicket.belongsTo(models.cart);
      cartTicket.belongsTo(models.ticket);
    }
  }
  cartTicket.init({
    cartId: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cartTicket',
  });
  return cartTicket;
};