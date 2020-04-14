import Queue  from 'bull';
import { frequencies, formatRepeatable } from '../bull/frequency';
import { Bull } from '../models/Bull'; 

const QUEUE_NAME = process.env.BULL_QUEUE
const REDIS_AUTH = {
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_URL,
    }
} 

const queue = new Queue(QUEUE_NAME, REDIS_AUTH);

export const formatJobId = jobId => jobId.toString().split(':')[1];

export async function addJob(userId:number, jobName: string, data?: object) {
    const result = await queue.add(
        jobName,
        data,
        formatRepeatable(frequencies.five_minutes),
    )

    const bull = await Bull.create({
        userId, 
        jobName, 
        jobId: result.opts.jobId, 
        data: JSON.stringify(result.data), 
        config: result.opts.repeat['cron']
    })

    return bull;
}

export async function getJobs(types: string[] = ['delayed']) {
    return queue.getJobs(types).then(results => {
        const newResults = results.map(result => {
            return {
                id: result.id,
                name: result.name,
                data: result.data,
                opts: result.opts
            }
        })

        return newResults;
    });
}

export async function updateJob(jobId: string, data: object, clearOldData?: boolean) {
    // 'delayed e waiting'
    const fetchedJobs = (await queue.getJobs(['delayed', 'waiting']))
    
    const job = fetchedJobs.find(j => formatJobId(j.id) == jobId);

    if (clearOldData)
        return job.update(data);

    return job.update({data, ...job.data});
}