'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BullLog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bullId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bull',
          key: 'id'
        },
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      log: {
        allowNull: false,
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
