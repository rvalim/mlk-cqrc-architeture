import request from 'request-promise'
    
const options = {
    method: 'GET',
    uri: `http://${process.env.AUTH_URL}/auth`,
    json: true
}

export async function hasRole(userId: number, roleId: number): Promise<boolean> {
    return request.get(
        {
            ...options,
            qs: { id: userId }
        }
    ).then(result => result && result[0].roleId == roleId)
}
