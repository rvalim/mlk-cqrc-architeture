import Queue  from 'bull'
import * as vacation from './worker/vacation'
import * as bonusDays from './worker/bonusDay'

const QUEUE_NAME = process.env.BULL_QUEUE
const REDIS_AUTH = {
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_URL,
    }
} 

export function bullInit() {
    const queue = new Queue(QUEUE_NAME, REDIS_AUTH);

    //Adding process
    queue.process(vacation.jobName(), vacation.worker)
    queue.process(bonusDays.jobName(), bonusDays.worker)
}  
