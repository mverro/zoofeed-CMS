'use strict';
const usersData = require('../Data/tickets.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tickets', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tickets', usersData, {});
  }
};
