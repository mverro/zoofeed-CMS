'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ticket.belongsToMany(models.cart, { through: models.cartTicket });
      ticket.belongsTo(models.ticketType)
    }
  }
  ticket.init({
    ticketTypeId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function (ticket, options) {
        ticket.status = false;
      },
    },
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};