'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const list = [
      'ACTION',
      'GRANT',
      'RESOURCE',
      'ROLE',
      'USERACC',
      'PROFILE',
      'PROJECTTYPE',
      'ENTITYTYPE',
      'ENTITY',
      'PROJECT',
      'PROJECTALLOC',
      'TIMESHEETSTATE',
      'TIMESHEETENTRY',
      'TIMESHEETCONFIG',
      'FILE',
      'CALENDAR',
      'VACATION',
      'ACCESS'
    ]
    return queryInterface.bulkInsert('Resource',
      list.map(p => {
        return {
          text: p,
          creationDate: new Date(),
          updatedOn: new Date()
        }
      })
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
