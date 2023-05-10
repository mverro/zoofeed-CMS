'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.belongsTo(models.user);
      payment.belongsTo(models.order)
    }
  }
  payment.init({
    userId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    method: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};