import { JobOptions } from "bull";

export const formatRepeatable = (frequency: string): JobOptions => {
    return { repeat: { cron: `${frequency}` }  }
} 

export const frequencies ={
    monthly: '0 1 1 * *',
    annually: '0 1 1 1 *',
    daily: '0 1 * * *',
    ten_minutes: '*/10 * * * *',
    five_minutes: '*/5 * * * *',
    every_minute: '*/1 * * * *'
} 