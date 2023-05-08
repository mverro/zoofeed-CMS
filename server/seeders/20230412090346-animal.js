'use strict';
const usersData = require('../Data/animals.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('animals', usersData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animals', null, {});
  }
};
