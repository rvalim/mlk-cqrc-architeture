'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Vacation', 'userId', {
        allowNull: false,
        type: 'INTEGER USING CAST("userId" as INTEGER)'
      });
  },
  down: (queryInterface, Sequelize) => {
  }
};