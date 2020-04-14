'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('File', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fileName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING
    },
    mimetype: {
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
   return queryInterface.dropTable('File');
  }
};
