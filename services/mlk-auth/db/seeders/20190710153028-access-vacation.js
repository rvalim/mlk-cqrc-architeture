'use strict';
//import model from '../../src/models'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const list = [
      'VACATIONTYPE',
      'VACATIONSTATE',
      'VACATIONCONFIG',
    ]

    await queryInterface.bulkInsert('Resource',
      list.map(p => {
        return {
          text: p,
          creationDate: new Date(),
          updatedOn: new Date()
        }
      })
      , { returning: true });

    const actions = await queryInterface.sequelize.query(
      'SELECT id, text FROM "Action" ', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      })

    const resources = await queryInterface.sequelize.query(
      'SELECT id, text FROM "Resource" ', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      })

    const verbs = {
      ['post'] : 'create:any',
      ['get'] : 'read:any',
      ['put']: 'update:any',
      ['delete'] : 'delete:any',
    }

    let routes = [
      { route: 'vacationtype', resource: 'VACATIONTYPE' },
      { route: 'vacationstate', resource: 'VACATIONSTATE' },
      { route: 'vacationconfig', resource: 'VACATIONCONFIG' }
    ]

    const formatAccess = (route, verb, resource) => {
      return {
        route: `/${route}`,
        method: verb,
        actionId: actions.filter(p => p.text === verbs[verb])[0].id,
        resourceId: resources.filter(p => p.text === resource)[0].id,
        creationDate: new Date(),
        updatedOn: new Date()
      }
    }

    var toBeInserted =[]

    routes.map(r =>{
      Object.keys(verbs).map(v => toBeInserted.push(formatAccess(r.route, v, r.resource)))
    })

    await queryInterface.bulkInsert('Access',
      toBeInserted
      , {});

    const grants = await queryInterface.sequelize.query(
      'SELECT ROL.id "roleId", ACT.id "actionId", RES.id "resourceId", \'*\' "attrs" ' +
      ' ,current_timestamp "creationDate", current_timestamp "updatedOn" ' +
      ' FROM "Role" ROL, "Action" ACT, "Resource" RES' +
      ' WHERE ROL.text = \'ADMIN\'' +
      ' AND RES.text in (\'VACATIONTYPE\',\'VACATIONSTATE\',\'VACATIONCONFIG\') ' +
      ' ORDER BY ROL.id, ACT.id, RES.id;'
      , {
        type: queryInterface.sequelize.QueryTypes.SELECT
      })

      return queryInterface.bulkInsert('Grant',
      grants
      , {});
  },

  down: (queryInterface, Sequelize) => {
   //return queryInterface.bulkDelete('Access', null, {});
  }
};