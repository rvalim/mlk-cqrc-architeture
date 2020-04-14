'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectAlloc', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Project',
          key: 'id'
        },
      },
      profileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Profile',
          key: 'id'
        },
      },
      startDate: { type: Sequelize.DATE },
      endDate: { type: Sequelize.DATE },
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
    return queryInterface.dropTable('ProjectAlloc');
  }
};
