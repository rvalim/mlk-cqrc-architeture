'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const grants = await queryInterface.sequelize.query(
      'SELECT ROL.id "roleId", ACT.id "actionId", RES.id "resourceId", \'*\' "attrs" ' +
      ' ,current_timestamp "creationDate", current_timestamp "updatedOn" ' +
      ' FROM "Role" ROL, "Action" ACT, "Resource" RES' +
      ' WHERE ROL.text = \'ADMIN\'' +
      ' ORDER BY ROL.id, ACT.id, RES.id;'
      , {
        type: queryInterface.sequelize.QueryTypes.SELECT
      })

      return queryInterface.bulkInsert('Grant',
      grants
      , {});
  },

  down: (queryInterface, Sequelize) => {
    //return queryInterface.bulkDelete('Grant', null, {});
  }
};