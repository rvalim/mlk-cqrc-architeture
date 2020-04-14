'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Grant', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Role',
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
      actionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Action',
          key: 'id'
        },
      },
      attrs: {
        type: Sequelize.STRING
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
   return queryInterface.dropTable('Grant');
  }
};
