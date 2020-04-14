'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const list = ['ADMIN', 'USER']
    return queryInterface.bulkInsert('Role', 
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
