'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userTicket.belongsTo(models.user);
      userTicket.belongsTo(models.ticketType)
    }
  }
  userTicket.init({
    userId: DataTypes.INTEGER,
    ticketTypeId: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: function (userTicket, options) {
        userTicket.status = false;
      },
    },
    sequelize,
    modelName: 'userTicket',
  });
  return userTicket;
};