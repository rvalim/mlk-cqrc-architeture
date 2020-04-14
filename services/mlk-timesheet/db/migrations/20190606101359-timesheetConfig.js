'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('TimesheetConfig', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    closedStateId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'TimesheetState',
        key: 'id'
      },
    },
    creationDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedOn: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletionDate: {
      type: Sequelize.DATE
    },
  });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('TimesheetConfig');
  }
};
