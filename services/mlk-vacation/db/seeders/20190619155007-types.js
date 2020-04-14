'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VacationType', 
      [
        {
          key: 'Default',
          text: 'Set the default type for vacations',
          numDays: 2,
          creationDate: new Date(),
          updatedOn: new Date()
        },
        {
          key: 'BonusDay',
          text: 'The bonus days owned by the functionary',
          numDays: 2,
          creationDate: new Date(),
          updatedOn: new Date()
        }
      ]
    , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
