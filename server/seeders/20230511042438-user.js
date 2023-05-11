'use strict';
const usersData = require('../Data/user.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', usersData, {});
  }
};
