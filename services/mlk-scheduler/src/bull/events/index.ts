import { Queue } from "bull";
import { eventNames } from "cluster";
import { BullLog } from "../../models/BullLog";

function log(...args){
    console.log(...args)
} 

export function defineEvents(queue: Queue): void {
    queue
        .on('global:error', function (error) {
            log('error')
        })
        .on('global:failed', function (jobId, err) {
            log('failed', jobId, err)
        })
        .on('global:active', function(jobId, jobPromise){
            log('completed', jobId)
        })
        .on('global:completed', function (jobId, result) {
            log('completed', jobId, result)
        })
}