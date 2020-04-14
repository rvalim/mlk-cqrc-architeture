'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Access', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      route: {
        type: Sequelize.STRING
      },
      method: {
        type: Sequelize.STRING
      },
      actionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Action',
          key: 'id'
        },
      },
      resourceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Resource',
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
   return queryInterface.dropTable('Access');
  }
};
