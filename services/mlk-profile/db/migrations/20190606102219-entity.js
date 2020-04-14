'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Entity', {
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
      entityTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'EntityType',
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
    return queryInterface.dropTable('Entity');
  }
};
