'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const closedId = (await queryInterface.sequelize.query(
      'SELECT id FROM "TimesheetState" WHERE text = :status',
      {
        replacements: { status: 'Closed' },
        type: queryInterface.sequelize.QueryTypes.SELECT
      }))[0].id


    return queryInterface.bulkInsert('TimesheetState',
      [
        {
          text: 'Pending Approval',
          nextStateId: closedId,
          allowEdit: true,
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
