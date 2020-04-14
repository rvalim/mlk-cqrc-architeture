import request from 'request-promise'
import { Vacation } from '../../models/Vacation';

const options = {
    uri: `http://${process.env.VACATION_URL}`,
    json: true
}

function toDictionary(values, ...args) {
    const dict = {}

    values.map(p => {
        if (args.length > 0) {
            const obj = {}
            args.map(q => obj[q] = p[q])
            dict[p.key] = obj
        }
        else
            dict[p.key] = p.id
    })

    return dict
}

export async function getConfigByKey(key: string): Promise<object[]> {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacationconfig`,
            qs: { key }
        }
    )
        .then(results => toDictionary(results))
}

export async function getStateList(): Promise<object[]> {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacationstate`
        }
    )
        .then(results => toDictionary(results, 'id', 'roleId'))
}

export async function getStateById(id: number): Promise<object> {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacationstate`,
            qs: { id }
        }
    )
}

export async function getTypeList(getDays?: boolean) {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacationtype`
        }
    )
        .then(results => {
            if (!getDays)
                return toDictionary(results);
                
            const numDaysObj = results.map(cur => {
                return {
                    id: cur.id,
                    key: cur.key,
                    numDays: cur.numDays
                }
            })

            return numDaysObj;
        })
}

export async function getVacationsByUser(id: number): Promise<object[]>{
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacation`,
            qs: { id }
        }
    )
}

export async function getAllVacationsByUserId(userId: number, receiveState?: boolean) {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacation/all/${userId}`,
        }
    ).then(result => {
        if (!receiveState) 
            return result.rows;

        return result.rows.map(v => {
            return v.stateId;
        })
    })
}

export async function getUserIdByVacations(vacationIds: number[]): Promise<number[]> {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/vacation/usersByVacationId`,
            qs: { ids: vacationIds }
        }
    )
}

export async function create(model: any) {
    return request.post(
        {
            ...options,
            uri: `${options.uri}/vacation`,
            body: model
        }
    )
}

