
import { VacationState } from "../../models/VacationState";
import { Vacation } from "../../models/Vacation";
import { Op, literal } from "sequelize";
import { VacationWorflowLog } from "../../models/VacationWorflowLog";
import { date } from "joi";

async function getState(args: object): Promise<any> {
  const state = await VacationState.findOne({ where: args })
    .then(entries => entries.dataValues)

  if (state)
    return state

  throw new Error(`State with parameters '${JSON.stringify(args)}' not found`)
}

export function getStateByKey(key: string): Promise<VacationState> {
  return getState({ key })
}

export function getStateById(id: number): Promise<VacationState> {
  return getState({ id })
}

export async function getVacationByDate(dates: Date[], userId: number) {
  return await Vacation.findAll(
    {
      where: {
        userId,
        date: { [Op.in]: dates }
      }
    }
  )
}

export async function setWorkflow(
  newStateId: number,
  action: string,
  { vacationIds,
    actualStateId,
    comment,
    userId }
) {

  if (newStateId === null) {
    throw new Error(`The actual vacation's state, it's a final state, and cannot be approved/removed.`);
  }

  if (actualStateId === newStateId) {
    throw new Error('Actual and new State cannot be the same');
  }

  //Update state of vacations
  //State se tornou condicao para evitar saltos de workflow nao permitidos
  return await Vacation.update({
    stateId: newStateId,
    deletionDate: (action === 'C' ? Date.now() : null)
  },
    {
      where: {
        id: { [Op.in]: vacationIds },
        stateId: action === 'C' ? { [Op.not]: 4 } : actualStateId
      },
      returning: true
    })
    .then(async result => {
      console.log('RESULT', result)
      const [qtde, rows] = result

      if (qtde > 0){
        const log = { 
          vacationIds: rows.map(p => p.id), 
          stateId: newStateId,
          comment, 
          userId, 
        }
  
        addWorkflowLog(action, log)
      } 

      return { qtde } 
    })
}

export async function addWorkflowLog(
  action: string, 
  { vacationIds,
    stateId,
    comment,
    userId }
) {

  const records = vacationIds
    .map(p => {
      return {
        vacationId: p,
        stateId,
        action,
        comment,
        userId
      }
    })

  //Insert workflow log
  VacationWorflowLog.bulkCreate(records)
}

