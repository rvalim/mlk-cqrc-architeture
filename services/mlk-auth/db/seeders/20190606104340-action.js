'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const list = ['create:any', 'read:any', 'update:any', 'delete:any']
    return queryInterface.bulkInsert('Action', 
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
