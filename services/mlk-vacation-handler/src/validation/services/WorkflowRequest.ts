import request from 'request-promise'

const options = {
    uri: `http://${process.env.VACATION_URL}/vacation/workflow`,
    json: true
}

export async function approve({ vacationIds, actualStateId, comment, userId }) {
    return request.post(
        {
            ...options,
            uri: `${options.uri}/approve`,
            body: { vacationIds, actualStateId, comment, userId }
        }
    )
}

export async function reprove({ vacationIds, actualStateId, comment, userId }) {
    return request.post(
        {
            ...options,
            uri: `${options.uri}/reprove`,
            body: { vacationIds, actualStateId, comment, userId }
        }
    )
}

export async function cancel({ vacationIds, comment, userId }) {
    return request.post(
        {
            ...options,
            uri: `${options.uri}/cancel`,
            body: { vacationIds, comment, userId }
        }
    )
}