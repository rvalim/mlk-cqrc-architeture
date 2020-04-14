'use strict';
//import model from '../../src/models'

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      { route: 'role', resource: 'ROLE' },
      { route: 'calendar', resource: 'CALENDAR' },
      { route: 'vacation', resource: 'VACATION' },
      { route: 'access', resource: 'ACCESS' },
      { route: 'resource', resource: 'RESOURCE' },
      { route: 'grant', resource: 'GRANT' },
      { route: 'action', resource: 'ACTION' },
      { route: 'projecttype', resource: 'PROJECTTYPE' },
      { route: 'entitytype', resource: 'ENTITYTYPE' },
      { route: 'entity', resource: 'ENTITY' },
      { route: 'project', resource: 'PROJECT' },
      { route: 'projectalloc', resource: 'PROJECTALLOC' },
      { route: 'timesheetstate', resource: 'TIMESHEETSTATE' },
      { route: 'timesheetentry', resource: 'TIMESHEETENTRY' },
      { route: 'timesheetconfig', resource: 'TIMESHEETCONFIG' },]

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

    toBeInserted.push(formatAccess('auth', 'post', 'USERACC'))
    toBeInserted.push(formatAccess('auth', 'get', 'USERACC'))
    toBeInserted.push(formatAccess('profile', 'get', 'PROFILE'))
    toBeInserted.push(formatAccess('profile', 'put', 'PROFILE'))
    toBeInserted.push(formatAccess('timesheetentry/transition', 'post', 'TIMESHEETENTRY'))
    toBeInserted.push(formatAccess('timesheetentry/owner', 'get', 'TIMESHEETENTRY'))

    return queryInterface.bulkInsert('Access',
      toBeInserted
      , {});
  },

  down: (queryInterface, Sequelize) => {
   //return queryInterface.bulkDelete('Access', null, {});
  }
};