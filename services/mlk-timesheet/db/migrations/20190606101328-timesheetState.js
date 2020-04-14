'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('TimesheetState', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    text: {
      allowNull: false,
      type: Sequelize.STRING
    },
    nextStateId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'TimesheetState',
        key: 'id'
      },
    },
    allowEdit: {
      allowNull: false,
      type: Sequelize.BOOLEAN
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
   return queryInterface.dropTable('TimesheetState');
  }
};
