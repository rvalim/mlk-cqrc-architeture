'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Profile', 
      'vacationDaysLeft',
      Sequelize.INTEGER)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Profile', 
      'vacationDaysLeft')
  }
};