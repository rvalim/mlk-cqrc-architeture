import Queue  from 'bull'
import { defineEvents } from './events'

const QUEUE_NAME = process.env.BULL_QUEUE
const REDIS_AUTH = {
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_URL,
    }
} 

export async function bullInit() { 
    const queue = new Queue(QUEUE_NAME, REDIS_AUTH);
    
    //Adding events
    defineEvents(queue);
}  


