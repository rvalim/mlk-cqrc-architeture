
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('Holiday', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    date: {
   type: Sequelize.DATE
    },
    country: {
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
   return queryInterface.dropTable('Holiday');
  }
};