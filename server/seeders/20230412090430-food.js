'use strict';
const usersData = require('../Data/food.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('food', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('food', null, {});
     
  }
};
