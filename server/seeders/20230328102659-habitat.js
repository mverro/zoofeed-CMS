'use strict';
const usersData = require('../Data/habitat.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('habitats', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('habitats', null, {});
  }
  
};
