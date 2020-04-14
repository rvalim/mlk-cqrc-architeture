'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const roleId = 1

    return queryInterface.bulkInsert('VacationState',
      [
        {
          key: 'Approved',
          text: 'Define vacations approved',
          roleId,
          nextStateId: null,
          allowEdit: false,
          creationDate: new Date(),
          updatedOn: new Date()
        }
      ], { returning: true })
      .then(result => {
        const approvedId = result[0].id

        return queryInterface.bulkInsert('VacationState',
          [
            {
              key: 'Pending',
              text: 'Define a solicitation waiting for approvals',
              nextStateId: approvedId,
              allowEdit: false,
              creationDate: new Date(),
              updatedOn: new Date()
            }
          ], { returning: true })
          .catch(e => console.log(e))

      })
      .then(result => {
        const pendId = result[0].id

        return queryInterface.bulkInsert('VacationState',
          [
            {
              key: 'Reproved',
              text: 'Define vacations reproved',
              roleId,
              nextStateId: pendId,
              allowEdit: false,
              creationDate: new Date(),
              updatedOn: new Date()
            },
            {
              key: 'Cancelled',
              text: 'Vacations that was cancelled by the user',
              nextStateId: null,
              allowEdit: false,
              creationDate: new Date(),
              updatedOn: new Date()
            }
          ], { returning: true })
      })
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
