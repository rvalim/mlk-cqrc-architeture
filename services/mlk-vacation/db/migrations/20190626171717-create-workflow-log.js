'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VacationWorflowLog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vacationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Vacation',
          key: 'id'
        },
      },
      userId:{
        allowNull: false,
        type: Sequelize.INTEGER,
      } ,
      stateId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'VacationState',
          key: 'id'
        },
      },
      action: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },      
      creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
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
