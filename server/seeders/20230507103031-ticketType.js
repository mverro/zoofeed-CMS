'use strict';
const usersData = require('../Data/ticketType.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ticketTypes', usersData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ticketTypes', usersData, {});

 
  }
};
