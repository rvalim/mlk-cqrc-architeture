'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      skype: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      active: { type: Sequelize.BOOLEAN },
      overtimeAllowed: { type: Sequelize.BOOLEAN },
      chargeable: { type: Sequelize.BOOLEAN },
      profitable: { type: Sequelize.BOOLEAN },
      description: { type: Sequelize.STRING },
      costCentre: { type: Sequelize.STRING },
      endDate: { type: Sequelize.DATE },
      entityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Entity',
          key: 'id'
        },
      },
      projectTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProjectType',
          key: 'id'
        },
      },
      projectManagerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profile',
          key: 'id'
        },
      },
      projectOwnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profile',
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
    return queryInterface.dropTable('Project');
  }
};
