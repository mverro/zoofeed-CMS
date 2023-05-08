'use strict';
const usersData = require('../Data/classType.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('classTypes', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('classTypes', null, {});
  }
};
