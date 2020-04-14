import request from 'request-promise'

const options = {
    method: 'GET',
    uri: `http://${process.env.PROFILE_URL}/profile`,
    json: true
}

export async function getManagerIdByUserId(userId: number): Promise<number> {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/${userId}`,
            qs: { id: userId }
        }
    )
    .then(result => {
        return result ? result.userManagerId : null
    })
    .catch(e => console.log(e))
}


export async function getVacationDays(userId: number): Promise<number> {
    return request.get(
        {
            ...options,
            uri: `${options.uri}/${userId}`
        }
    )
    .then(result => {
        return result.vacationDaysLeft;
    })
}