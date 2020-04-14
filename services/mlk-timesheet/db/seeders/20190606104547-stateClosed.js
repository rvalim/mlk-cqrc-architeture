'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TimesheetState', 
      [
        {
          text: 'Closed',
          nextStateId: null,
          allowEdit: false,
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
