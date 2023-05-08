'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      animal.belongsTo(models.classType);
      animal.belongsTo(models.habitat);
      animal.belongsToMany(models.food, { through: models.animalFood });
      animal.belongsToMany(models.user, { through: models.animalUser });

    }
  }
  animal.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    classTypeId: DataTypes.INTEGER,
    habitatId: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate:function(animal,options){
        animal.like = 0
      }
    },
    sequelize,
    modelName: 'animal',
  });
  return animal;
};