'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('TimesheetEntry', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING
    },
    timesheetStateId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'TimesheetState',
        key: 'id'
      },
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    hours: {
      allowNull: false,
      type: Sequelize.INTEGER
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
   return queryInterface.dropTable('TimesheetEntry');
  }
};
