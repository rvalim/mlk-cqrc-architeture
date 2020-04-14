'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VacationState', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      key:{
        allowNull: false,
        type: Sequelize.STRING(15),
        unique: true
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nextStateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'VacationState',
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
